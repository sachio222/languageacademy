import { useState, useEffect, useCallback } from "react";
import { TABLES } from "../lib/supabase";
import { useAdmin } from "./useAdmin";
import { useSupabaseClient } from "./useSupabaseClient";
import { logger } from "../utils/logger";

/**
 * Hook for fetching all students data (admin only)
 * Uses materialized view for fast, scalable queries
 * All filtering, sorting, and pagination happens database-side
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

  // Fetch overview stats from materialized view (fast aggregation)
  const fetchOverviewStats = useCallback(async () => {
    if (!isAdmin || !supabaseClient) return;

    try {
      // Single query to get all stats from materialized view
      const { data: allStudents, count } = await supabaseClient
        .from("admin_student_dashboard")
        .select(
          "engagement_status, modules_completed, total_study_time_seconds",
          { count: "exact" }
        );

      if (!allStudents) return;

      // Calculate aggregates from pre-calculated data
      const engagementCounts = { active: 0, atRisk: 0, inactive: 0 };
      allStudents.forEach((student) => {
        const status = student.engagement_status;
        if (status === "active" || status === "recent")
          engagementCounts.active++;
        else if (status === "at-risk") engagementCounts.atRisk++;
        else engagementCounts.inactive++;
      });

      const totalModules = allStudents.reduce(
        (sum, s) => sum + (s.modules_completed || 0),
        0
      );
      const totalStudyTime = allStudents.reduce(
        (sum, s) => sum + (s.total_study_time_seconds || 0),
        0
      );

      setOverviewStats({
        totalStudents: count || 0,
        avgModulesPerStudent:
          count > 0 ? Math.round((totalModules / count) * 100) / 100 : 0,
        avgStudyTime: count > 0 ? Math.round(totalStudyTime / count) : 0,
        totalModules,
        activeCount: engagementCounts.active,
        atRiskCount: engagementCounts.atRisk,
        inactiveCount: engagementCounts.inactive,
      });
    } catch (err) {
      logger.error("Error fetching overview stats:", err);
    }
  }, [isAdmin, supabaseClient]);

  // Fetch students from materialized view (all filtering/sorting database-side)
  const fetchStudents = useCallback(
    async (page = 1, currentFilters = filters) => {
      if (!isAdmin || !supabaseClient) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Build query from materialized view
        let query = supabaseClient
          .from("admin_student_dashboard")
          .select("*", { count: "exact" });

        // Apply search filter (server-side using full-text search)
        if (currentFilters.searchQuery) {
          const search = currentFilters.searchQuery.trim();
          query = query.or(
            `first_name.ilike.%${search}%,last_name.ilike.%${search}%,preferred_name.ilike.%${search}%,email.ilike.%${search}%`
          );
        }

        // Apply status filter (server-side - pre-calculated in view)
        if (currentFilters.statusFilter !== "all") {
          if (currentFilters.statusFilter === "active") {
            query = query.in("engagement_status", ["active", "recent"]);
          } else {
            query = query.eq("engagement_status", currentFilters.statusFilter);
          }
        }

        // Apply sorting (all fields available in view)
        const ascending = currentFilters.sortDirection === "asc";
        switch (currentFilters.sortField) {
          case "name":
            query = query.order("first_name", { ascending, nullsFirst: false });
            break;
          case "email":
            query = query.order("email", { ascending, nullsFirst: false });
            break;
          case "streak":
            query = query.order("streak_days", {
              ascending,
              nullsFirst: false,
            });
            break;
          case "modules":
            query = query.order("modules_completed", {
              ascending,
              nullsFirst: false,
            });
            break;
          case "accuracy":
            query = query.order("accuracy", { ascending, nullsFirst: false });
            break;
          case "total_time":
            query = query.order("total_study_time_seconds", {
              ascending,
              nullsFirst: false,
            });
            break;
          case "last_active":
            query = query.order("last_active_at", {
              ascending,
              nullsFirst: false,
            });
            break;
          case "status":
            query = query.order("engagement_status", {
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
          data: studentsData,
          error: queryError,
          count,
        } = await query.range(from, to);

        if (queryError) throw queryError;

        // Transform to match expected format (add stats nested object for compatibility)
        const transformedStudents = (studentsData || []).map((student) => ({
          ...student,
          stats: {
            modulesCompleted: student.modules_completed,
            accuracy: student.accuracy,
            totalExercises: student.total_exercises,
            engagementStatus: student.engagement_status,
          },
        }));

        setStudents(transformedStudents);
        setPagination((prev) => ({
          ...prev,
          currentPage: page,
          total: count || 0,
          totalFiltered: count || 0,
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

  // Helper for engagement status (kept for fetchAllMatching compatibility)
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
  }, [isAdmin, supabaseClient, fetchOverviewStats, fetchStudents]);

  // Note: Real-time subscriptions removed - materialized view refreshes every 5 minutes
  // This provides better performance at scale with acceptable staleness for admin dashboard

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

  // Fetch ALL matching students from materialized view (for bulk operations)
  const fetchAllMatching = useCallback(
    async (forFilters = filters) => {
      if (!isAdmin || !supabaseClient) return [];

      try {
        let query = supabaseClient
          .from("admin_student_dashboard")
          .select(
            "id, email, first_name, last_name, preferred_name, last_active_at"
          );

        // Apply same search filter
        if (forFilters.searchQuery) {
          const search = forFilters.searchQuery.trim();
          query = query.or(
            `first_name.ilike.%${search}%,last_name.ilike.%${search}%,preferred_name.ilike.%${search}%,email.ilike.%${search}%`
          );
        }

        // Apply status filter (server-side using pre-calculated field)
        if (forFilters.statusFilter !== "all") {
          if (forFilters.statusFilter === "active") {
            query = query.in("engagement_status", ["active", "recent"]);
          } else {
            query = query.eq("engagement_status", forFilters.statusFilter);
          }
        }

        const { data: students } = await query;
        return students || [];
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
