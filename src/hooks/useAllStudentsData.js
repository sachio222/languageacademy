import { useState, useEffect, useCallback } from "react";
import { TABLES } from "../lib/supabase";
import { useAdmin } from "./useAdmin";
import { useSupabaseClient } from "./useSupabaseClient";
import { logger } from "../utils/logger";

/**
 * Hook for fetching all students data (admin only)
 * Provides server-side filtered/sorted student list with accurate stats
 *
 * @returns {object} Students data with pagination and filters
 */
export const useAllStudentsData = () => {
  const { isAdmin } = useAdmin();
  const supabaseClient = useSupabaseClient();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overviewStats, setOverviewStats] = useState({
    totalStudents: 0,
    avgModulesPerStudent: 0,
    avgStudyTime: 0,
    totalModules: 0,
    activeCount: 0,
    atRiskCount: 0,
    inactiveCount: 0,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 50,
    total: 0,
    totalFiltered: 0,
  });

  const [filters, setFilters] = useState({
    searchQuery: "",
    statusFilter: "all",
    sortField: "created_at",
    sortDirection: "desc",
  });

  // Fetch overview stats (always from entire database, not paginated)
  const fetchOverviewStats = useCallback(async () => {
    if (!isAdmin || !supabaseClient) return;

    try {
      // Get total student count
      const { count: totalCount } = await supabaseClient
        .from(TABLES.USER_PROFILES)
        .select("*", { count: "exact", head: true });

      // Get all profiles for stats calculation (we need last_active_at)
      const { data: allProfiles } = await supabaseClient
        .from(TABLES.USER_PROFILES)
        .select("id, last_active_at, total_study_time_seconds");

      // Get aggregate module stats
      const { data: moduleStats } = await supabaseClient
        .from(TABLES.MODULE_PROGRESS)
        .select("user_id, completed_at")
        .not("completed_at", "is", null);

      // Calculate engagement counts
      const engagementCounts = { active: 0, atRisk: 0, inactive: 0 };
      (allProfiles || []).forEach((profile) => {
        const status = calculateEngagementStatus(profile.last_active_at);
        if (status === "active" || status === "recent")
          engagementCounts.active++;
        else if (status === "at-risk") engagementCounts.atRisk++;
        else engagementCounts.inactive++;
      });

      const totalModules = (moduleStats || []).length;
      const totalStudyTime = (allProfiles || []).reduce(
        (sum, p) => sum + (p.total_study_time_seconds || 0),
        0
      );

      setOverviewStats({
        totalStudents: totalCount || 0,
        avgModulesPerStudent:
          totalCount > 0
            ? Math.round((totalModules / totalCount) * 100) / 100
            : 0,
        avgStudyTime:
          totalCount > 0 ? Math.round(totalStudyTime / totalCount) : 0,
        totalModules,
        activeCount: engagementCounts.active,
        atRiskCount: engagementCounts.atRisk,
        inactiveCount: engagementCounts.inactive,
      });
    } catch (err) {
      logger.error("Error fetching overview stats:", err);
    }
  }, [isAdmin, supabaseClient]);

  // Fetch students with server-side filtering
  const fetchStudents = useCallback(
    async (page = 1, currentFilters = filters) => {
      if (!isAdmin || !supabaseClient) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Build base query
        let query = supabaseClient
          .from(TABLES.USER_PROFILES)
          .select("*", { count: "exact" });

        // Apply search filter (server-side)
        if (currentFilters.searchQuery) {
          const search = currentFilters.searchQuery.toLowerCase();
          query = query.or(
            `first_name.ilike.%${search}%,last_name.ilike.%${search}%,preferred_name.ilike.%${search}%,email.ilike.%${search}%`
          );
        }

        // Apply sorting
        const ascending = currentFilters.sortDirection === "asc";
        switch (currentFilters.sortField) {
          case "name":
            query = query.order("first_name", { ascending, nullsFirst: false });
            break;
          case "email":
            query = query.order("email", { ascending, nullsFirst: false });
            break;
          case "last_active":
            query = query.order("last_active_at", {
              ascending,
              nullsFirst: false,
            });
            break;
          default:
            query = query.order("created_at", { ascending, nullsFirst: false });
        }

        // Calculate pagination
        const from = (page - 1) * pagination.perPage;
        const to = from + pagination.perPage - 1;

        // Execute query with pagination
        const {
          data: profiles,
          error: profilesError,
          count,
        } = await query.range(from, to);

        if (profilesError) throw profilesError;

        // Fetch summary stats for each student (optimized batch query)
        const userIds = (profiles || []).map((p) => p.id);
        const studentsWithStats = await fetchStudentsBatch(profiles, userIds);

        // Client-side status filter (can't easily do in SQL)
        let filteredStudents = studentsWithStats;
        if (currentFilters.statusFilter !== "all") {
          filteredStudents = studentsWithStats.filter((s) => {
            if (currentFilters.statusFilter === "active") {
              return (
                s.stats.engagementStatus === "active" ||
                s.stats.engagementStatus === "recent"
              );
            }
            return s.stats.engagementStatus === currentFilters.statusFilter;
          });
        }

        // Client-side sort for fields that need stats
        if (
          ["streak", "modules", "accuracy", "total_time", "status"].includes(
            currentFilters.sortField
          )
        ) {
          filteredStudents.sort((a, b) => {
            let aVal, bVal;
            switch (currentFilters.sortField) {
              case "streak":
                aVal = a.streak_days || 0;
                bVal = b.streak_days || 0;
                break;
              case "modules":
                aVal = a.stats.modulesCompleted || 0;
                bVal = b.stats.modulesCompleted || 0;
                break;
              case "accuracy":
                aVal = a.stats.accuracy || 0;
                bVal = b.stats.accuracy || 0;
                break;
              case "total_time":
                aVal = a.total_study_time_seconds || 0;
                bVal = b.total_study_time_seconds || 0;
                break;
              case "status":
                const statusOrder = {
                  active: 0,
                  recent: 1,
                  "at-risk": 2,
                  inactive: 3,
                };
                aVal = statusOrder[a.stats.engagementStatus] ?? 4;
                bVal = statusOrder[b.stats.engagementStatus] ?? 4;
                break;
            }
            return currentFilters.sortDirection === "asc"
              ? aVal > bVal
                ? 1
                : -1
              : aVal < bVal
              ? 1
              : -1;
          });
        }

        setStudents(filteredStudents);
        setPagination((prev) => ({
          ...prev,
          currentPage: page,
          total: count || 0,
          totalFiltered: filteredStudents.length,
        }));
      } catch (err) {
        logger.error("Error fetching students data:", err);
        setError(err.message || "Failed to load students");
      } finally {
        setLoading(false);
      }
    },
    [isAdmin, supabaseClient, pagination.perPage]
  );

  // Fetch summary stats for batch of students (optimized to avoid N+1)
  const fetchStudentsBatch = async (profiles, userIds) => {
    if (!profiles || profiles.length === 0) return [];

    try {
      // Fetch all stats in parallel with batched queries
      const [modulesResult, exercisesResult] = await Promise.all([
        supabaseClient
          .from(TABLES.MODULE_PROGRESS)
          .select("user_id, completed_at")
          .in("user_id", userIds)
          .not("completed_at", "is", null),

        supabaseClient
          .from(TABLES.EXERCISE_COMPLETIONS)
          .select("user_id, is_correct")
          .in("user_id", userIds),
      ]);

      // Group by user_id for efficient lookup
      const modulesByUser = {};
      const exercisesByUser = {};

      (modulesResult.data || []).forEach((m) => {
        if (!modulesByUser[m.user_id]) modulesByUser[m.user_id] = [];
        modulesByUser[m.user_id].push(m);
      });

      (exercisesResult.data || []).forEach((e) => {
        if (!exercisesByUser[e.user_id]) exercisesByUser[e.user_id] = [];
        exercisesByUser[e.user_id].push(e);
      });

      // Build student objects with stats
      return profiles.map((profile) => {
        const modules = modulesByUser[profile.id] || [];
        const exercises = exercisesByUser[profile.id] || [];

        const correct = exercises.filter((e) => e.is_correct).length;
        const total = exercises.length;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

        return {
          ...profile,
          stats: {
            modulesCompleted: modules.length,
            accuracy,
            totalExercises: total,
            engagementStatus: calculateEngagementStatus(profile.last_active_at),
          },
        };
      });
    } catch (err) {
      logger.error("Error fetching batch student stats:", err);
      return profiles.map((profile) => ({
        ...profile,
        stats: {
          modulesCompleted: 0,
          accuracy: 0,
          totalExercises: 0,
          engagementStatus: "unknown",
        },
      }));
    }
  };

  // Calculate engagement status based on last active date
  const calculateEngagementStatus = (lastActiveAt) => {
    if (!lastActiveAt) return "inactive";

    const now = new Date();
    const lastActive = new Date(lastActiveAt);
    const hoursSinceActive = (now - lastActive) / (1000 * 60 * 60);

    if (hoursSinceActive < 24) return "active";
    if (hoursSinceActive < 24 * 3) return "recent";
    if (hoursSinceActive < 24 * 7) return "at-risk";
    return "inactive";
  };

  // Load initial data
  useEffect(() => {
    if (isAdmin && supabaseClient) {
      fetchOverviewStats();
      fetchStudents(1);
    }
  }, [isAdmin, supabaseClient]);

  // Real-time subscription for last_active_at updates
  useEffect(() => {
    if (!isAdmin || !supabaseClient) return;

    const subscription = supabaseClient
      .channel("user_profiles_updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: TABLES.USER_PROFILES,
        },
        (payload) => {
          // Update student in list
          setStudents((prev) =>
            prev.map((student) =>
              student.id === payload.new.id
                ? {
                    ...student,
                    ...payload.new,
                    stats: {
                      ...student.stats,
                      engagementStatus: calculateEngagementStatus(
                        payload.new.last_active_at
                      ),
                    },
                  }
                : student
            )
          );
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [isAdmin, supabaseClient]);

  // Apply filters (resets to page 1)
  const applyFilters = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      fetchStudents(1, newFilters);
    },
    [fetchStudents]
  );

  // Pagination controls
  const goToPage = useCallback(
    (page) => {
      fetchStudents(page, filters);
    },
    [fetchStudents, filters]
  );

  const nextPage = useCallback(() => {
    const totalPages = Math.ceil(pagination.total / pagination.perPage);
    if (pagination.currentPage < totalPages) {
      goToPage(pagination.currentPage + 1);
    }
  }, [pagination, goToPage]);

  const prevPage = useCallback(() => {
    if (pagination.currentPage > 1) {
      goToPage(pagination.currentPage - 1);
    }
  }, [pagination, goToPage]);

  // Fetch ALL matching students (for bulk operations)
  const fetchAllMatching = useCallback(
    async (forFilters = filters) => {
      if (!isAdmin || !supabaseClient) return [];

      try {
        let query = supabaseClient
          .from(TABLES.USER_PROFILES)
          .select("id, email, first_name, last_name, preferred_name");

        // Apply same search filter
        if (forFilters.searchQuery) {
          const search = forFilters.searchQuery.toLowerCase();
          query = query.or(
            `first_name.ilike.%${search}%,last_name.ilike.%${search}%,preferred_name.ilike.%${search}%,email.ilike.%${search}%`
          );
        }

        const { data: profiles } = await query;

        // Apply status filter if needed
        if (forFilters.statusFilter !== "all") {
          const filtered = (profiles || []).filter((p) => {
            const status = calculateEngagementStatus(p.last_active_at);
            if (forFilters.statusFilter === "active") {
              return status === "active" || status === "recent";
            }
            return status === forFilters.statusFilter;
          });
          return filtered;
        }

        return profiles || [];
      } catch (err) {
        logger.error("Error fetching all matching students:", err);
        return [];
      }
    },
    [isAdmin, supabaseClient, filters]
  );

  return {
    students,
    loading,
    error,
    overviewStats,
    filters,
    pagination: {
      ...pagination,
      totalPages: Math.ceil(pagination.total / pagination.perPage),
      hasNext:
        pagination.currentPage <
        Math.ceil(pagination.total / pagination.perPage),
      hasPrev: pagination.currentPage > 1,
    },
    applyFilters,
    refetch: () => fetchStudents(pagination.currentPage, filters),
    goToPage,
    nextPage,
    prevPage,
    fetchAllMatching,
  };
};
