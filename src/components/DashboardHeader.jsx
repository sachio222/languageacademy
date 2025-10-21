import { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useAuth } from '../hooks/useAuth';
import { lessons } from '../lessons/lessonData';
import { Flame, CheckCircle, Clock, BookOpen, BookMarked } from 'lucide-react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId } from '../utils/progressSync';
import '../styles/DashboardHeader.css';

function DashboardHeader({ completedExercises, onLessonSelect, onShowReferenceModules, onShowVocabularyDashboard }) {
  const { supabaseClient, supabaseUser } = useAuth();
  const analytics = useAnalytics();
  const { moduleProgress } = useSupabaseProgress();
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    totalLessons: lessons.length,
    totalStudyTime: 0,
    lastActiveAt: null,
    wordsLearned: 0,
    streakDays: 0
  });
  const [loading, setLoading] = useState(true);

  // Helper to get exercise count for different module types
  const getExerciseCount = (lesson) => {
    if (lesson.isFillInTheBlank && lesson.sentences) {
      return lesson.sentences.length;
    }
    if (lesson.isUnitExam && lesson.exerciseConfig?.items) {
      return lesson.exerciseConfig.items.length;
    }
    if (lesson.isHelpModule) {
      // Help modules are considered "1 exercise" for completion purposes
      return 1;
    }
    return lesson.exercises?.length || 0;
  };

  // Helper to get completed exercise count
  const getCompletedCount = (lesson) => {
    // For fill-in-blank, exams, and help modules, check module_progress table
    if (lesson.isFillInTheBlank || lesson.isUnitExam || lesson.isHelpModule) {
      const modId = extractModuleId(lesson);
      const modProgress = moduleProgress?.[modId];
      // If module is marked complete, return total count
      return modProgress?.completed_at ? getExerciseCount(lesson) : 0;
    }
    // Normal modules: count individual exercises
    return lesson.exercises?.filter(ex => completedExercises.has(ex.id)).length || 0;
  };

  // Find next lesson to continue
  const getNextLesson = () => {
    // Find first incomplete lesson
    for (const lesson of lessons) {
      const total = getExerciseCount(lesson);
      if (total === 0) continue;

      const completed = getCompletedCount(lesson);

      if (completed < total) {
        return {
          lesson,
          isStarted: completed > 0
        };
      }
    }

    // All lessons completed
    return null;
  };

  // Load user stats
  useEffect(() => {
    const loadStats = async () => {
      if (!supabaseUser || !supabaseClient) {
        setLoading(false);
        return;
      }

      try {
        // Get user profile for study time, last active, and streak
        const { data: profile, error: profileError } = await supabaseClient
          .from('user_profiles')
          .select('total_study_time_seconds, last_active_at, streak_days')
          .eq('id', supabaseUser.id)
          .single();

        if (profileError) throw profileError;

        // Count completed lessons
        const lessonsCompleted = lessons.filter(lesson => {
          const total = getExerciseCount(lesson);
          if (total === 0) return false;
          const completed = getCompletedCount(lesson);
          return completed === total;
        }).length;

        const totalLessons = lessons.length;

        // Count unique words learned from completed lessons
        const completedLessons = lessons.filter(lesson => {
          const total = getExerciseCount(lesson);
          if (total === 0) return false;
          const completed = getCompletedCount(lesson);
          return completed === total;
        });

        const uniqueWords = new Set();
        completedLessons.forEach(lesson => {
          if (lesson.vocabularyReference) {
            lesson.vocabularyReference.forEach(vocab => {
              uniqueWords.add(vocab.french);
            });
          }
        });

        setStats({
          lessonsCompleted,
          totalLessons,
          totalStudyTime: profile?.total_study_time_seconds || 0,
          lastActiveAt: profile?.last_active_at,
          wordsLearned: uniqueWords.size,
          streakDays: profile?.streak_days || 0
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [supabaseUser, supabaseClient, completedExercises]);

  // Format time duration
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  // Format time since last study
  const formatTimeSince = (dateString) => {
    if (!dateString) return 'Never';

    const lastActive = new Date(dateString);
    const now = new Date();
    const diffMs = now - lastActive;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  };

  const nextLessonInfo = getNextLesson();
  const progressPercentage = Math.round((stats.lessonsCompleted / stats.totalLessons) * 100);
  const isStreakActive = stats.streakDays > 0;

  // Get unit info for the next lesson
  const getUnitForLesson = (lessonId) => {
    const unitStructure = [
      { id: 1, title: 'Unit 1', lessonRange: [1, 11], icon: '🎯' },
      { id: 2, title: 'Unit 2', lessonRange: [12, 24], icon: '🗣️' },
      { id: 3, title: 'Unit 3', lessonRange: [25, 39], icon: '⏱️' },
      { id: 4, title: 'Unit 4', lessonRange: [40, 52], icon: '💬' },
      { id: 5, title: 'Unit 5', lessonRange: [53, 64], icon: '🎨' },
      { id: 6, title: 'Unit 6', lessonRange: [65, 78], icon: '🚀' },
      { id: 7, title: 'Unit 7', lessonRange: [79, 92], icon: '🌍' },
      { id: 8, title: 'Unit 8', lessonRange: [93, 107], icon: '💡' },
      { id: 9, title: 'Unit 9', lessonRange: [108, 123], icon: '🎭' },
      { id: 10, title: 'Unit 10', lessonRange: [124, 138], icon: '🏆' }
    ];

    return unitStructure.find(unit => {
      const [start, end] = unit.lessonRange;
      return lessonId >= start && lessonId <= end;
    });
  };

  const nextUnitInfo = nextLessonInfo ? getUnitForLesson(nextLessonInfo.lesson.id) : null;

  // Calculate exercises completed in current lesson
  const getExerciseProgress = (lesson) => {
    if (!lesson) return { completed: 0, total: 0 };
    const total = getExerciseCount(lesson);
    const completed = getCompletedCount(lesson);
    return { completed, total };
  };

  const exerciseProgress = nextLessonInfo ? getExerciseProgress(nextLessonInfo.lesson) : null;

  if (loading) {
    return (
      <div className="dashboard-header">
        <div className="dashboard-loading">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-header">
      <div className="dashboard-layout">
        {/* Left Side: Next Lesson Info */}
        <div className="dashboard-left">
          {nextLessonInfo ? (
            <button
              className="next-lesson-card"
              onClick={() => onLessonSelect(nextLessonInfo.lesson.id)}
            >
              <div className="lesson-badge">
                {nextLessonInfo.isStarted ? 'Continue' : 'Next Lesson'}
              </div>
              <div className="lesson-title">{nextLessonInfo.lesson.title}</div>
              {nextUnitInfo && (
                <div className="lesson-unit">
                  <span className="unit-icon">{nextUnitInfo.icon}</span>
                  <span className="unit-name">{nextUnitInfo.title}</span>
                </div>
              )}
              {nextLessonInfo.lesson.description && (
                <div className="lesson-description">{nextLessonInfo.lesson.description}</div>
              )}
              {exerciseProgress && exerciseProgress.total > 0 && (
                <div className="lesson-progress-info">
                  <div className="lesson-progress-bar">
                    <div
                      className="lesson-progress-fill"
                      style={{ width: `${(exerciseProgress.completed / exerciseProgress.total) * 100}%` }}
                    />
                  </div>
                  <div className="lesson-progress-text">
                    {exerciseProgress.completed}/{exerciseProgress.total} exercises
                  </div>
                </div>
              )}
            </button>
          ) : (
            <div className="dashboard-complete-card">
              <div className="complete-icon">🎉</div>
              <div className="complete-text">You've completed all lessons!</div>
            </div>
          )}
        </div>

        {/* Right Side: Stats Grid */}
        <div className="dashboard-right">
          <div className="stats-grid">
            {/* Streak */}
            <div className={`stat-box stat-streak ${isStreakActive ? 'active' : ''}`}>
              <div className="stat-icon-wrapper">
                <Flame size={20} className="stat-icon-flame" strokeWidth={2.5} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{stats.streakDays}</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>

            {/* Progress with Lessons Combined */}
            <div className="stat-box stat-progress">
              <div className="stat-icon-wrapper">
                <CheckCircle size={20} strokeWidth={2} />
              </div>
              <div className="stat-info">
                <div className="stat-value-small">{stats.lessonsCompleted}/{stats.totalLessons}</div>
                <div className="stat-label">Lessons Complete</div>
              </div>
              <div className="progress-circle-container">
                <svg className="progress-circle" width="60" height="60" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="26"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="6"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="26"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - progressPercentage / 100)}`}
                    transform="rotate(-90 30 30)"
                  />
                </svg>
                <div className="progress-circle-text">{progressPercentage}%</div>
              </div>
            </div>

            {/* Study Time */}
            <div className="stat-box">
              <div className="stat-icon-wrapper">
                <Clock size={20} strokeWidth={2} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{formatDuration(stats.totalStudyTime)}</div>
                <div className="stat-label">Study Time</div>
              </div>
            </div>

            {/* Words Learned */}
            <div
              className="stat-box clickable-stat"
              onClick={onShowVocabularyDashboard}
              title="Click to view vocabulary dashboard"
            >
              <div className="stat-icon-wrapper">
                <BookOpen size={20} strokeWidth={2} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{stats.wordsLearned}</div>
                <div className="stat-label">Words Learned</div>
              </div>
            </div>
          </div>

          {/* Reference Link */}
          {onShowReferenceModules && (
            <button className="reference-link" onClick={onShowReferenceModules}>
              <BookMarked size={18} strokeWidth={2} />
              <span>La Référence (alphabet, numbers, days, etc.) </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;

