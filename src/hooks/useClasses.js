/**
 * useClasses Hook
 * Manages teacher classes - optional enterprise feature
 */

import { useState, useEffect, useCallback } from "react";
import { useSupabaseClient } from "./useSupabaseClient";
import { useAuth } from "./useAuth";
import { logger } from "../utils/logger";

export const useClasses = () => {
  const supabaseClient = useSupabaseClient();
  const { supabaseUser, profile } = useAuth();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isTeacher =
    profile?.role === "teacher" ||
    profile?.role === "school_admin" ||
    profile?.role === "super_admin";

  // Fetch classes teacher has access to
  const fetchClasses = useCallback(async () => {
    if (!supabaseUser || !isTeacher) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get classes from teacher_class_dashboard (grouped by class)
      const { data, error: queryError } = await supabaseClient
        .from("teacher_class_dashboard")
        .select(
          "class_id, class_name, term, subject, period, school_id, join_code, teacher_role, is_archived"
        )
        .eq("teacher_id", supabaseUser.id)
        .eq("is_archived", false);

      if (queryError) throw queryError;

      // Group by class_id to get unique classes with student count
      const classMap = {};
      (data || []).forEach((row) => {
        if (!classMap[row.class_id]) {
          classMap[row.class_id] = {
            id: row.class_id,
            name: row.class_name,
            term: row.term,
            subject: row.subject,
            period: row.period,
            school_id: row.school_id,
            join_code: row.join_code,
            teacher_role: row.teacher_role,
            student_count: 0,
          };
        }
        classMap[row.class_id].student_count++;
      });

      setClasses(Object.values(classMap));
    } catch (err) {
      logger.error("Error fetching classes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [supabaseClient, supabaseUser, isTeacher]);

  // Create new class
  const createClass = useCallback(
    async (classData) => {
      if (!supabaseUser) throw new Error("Not authenticated");

      try {
        // Generate join code
        const { data: joinCode, error: codeError } = await supabaseClient.rpc(
          "generate_join_code"
        );

        if (codeError) throw codeError;

        // Create class
        const { data, error } = await supabaseClient
          .from("classes")
          .insert({
            ...classData,
            created_by: supabaseUser.id,
            join_code: joinCode,
          })
          .select()
          .single();

        if (error) throw error;

        // Refresh classes list
        await fetchClasses();

        return data;
      } catch (err) {
        logger.error("Error creating class:", err);
        throw err;
      }
    },
    [supabaseClient, supabaseUser, fetchClasses]
  );

  // Enroll student by join code
  const joinClass = useCallback(
    async (joinCode) => {
      if (!supabaseUser) throw new Error("Not authenticated");

      try {
        // Find class by join code
        const { data: classData, error: classError } = await supabaseClient
          .from("classes")
          .select("id, name")
          .eq("join_code", joinCode.toUpperCase())
          .single();

        if (classError) throw new Error("Invalid join code");

        // Enroll student
        const { error: enrollError } = await supabaseClient
          .from("class_enrollments")
          .insert({
            class_id: classData.id,
            student_id: supabaseUser.id,
            status: "active",
          });

        if (enrollError) {
          if (enrollError.code === "23505") {
            throw new Error("Already enrolled in this class");
          }
          throw enrollError;
        }

        return classData;
      } catch (err) {
        logger.error("Error joining class:", err);
        throw err;
      }
    },
    [supabaseClient, supabaseUser]
  );

  // Get student's classes (for students)
  const fetchStudentClasses = useCallback(async () => {
    if (!supabaseUser) return [];

    try {
      const { data, error } = await supabaseClient
        .from("class_enrollments")
        .select(
          "class_id, classes(name, term, subject, teacher:created_by(first_name, last_name))"
        )
        .eq("student_id", supabaseUser.id)
        .eq("status", "active");

      if (error) throw error;

      return data || [];
    } catch (err) {
      logger.error("Error fetching student classes:", err);
      return [];
    }
  }, [supabaseClient, supabaseUser]);

  // Load classes on mount
  useEffect(() => {
    if (isTeacher) {
      fetchClasses();
    } else {
      setLoading(false);
    }
  }, [isTeacher, fetchClasses]);

  return {
    classes,
    loading,
    error,
    isTeacher,
    createClass,
    joinClass,
    fetchStudentClasses,
    refetch: fetchClasses,
  };
};
