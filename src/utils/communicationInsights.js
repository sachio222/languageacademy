/**
 * Communication Insights Utility
 * Pure functions to calculate email triggers and opportunities for student engagement
 */

import { lessons } from '../lessons/lessonData';

/**
 * Calculate all communication insights for a student
 * @param {object} studentData - Report card data from useReportCardData
 * @returns {object} Communication insights with triggers and templates
 */
export const calculateCommunicationInsights = (studentData) => {
  if (!studentData) {
    return {
      engagementStatus: null,
      reviewOpportunities: [],
      milestones: [],
      reEngagementTriggers: [],
      encouragementOpportunities: [],
      suggestedActions: [],
      emailTemplates: {}
    };
  }
  
  const { profile, heroStats, progress, raw } = studentData;
  
  // Calculate all triggers
  const engagementStatus = calculateEngagementStatus(profile);
  const reviewOpportunities = findReviewOpportunities(raw.modules, raw.units);
  const milestones = detectMilestones(heroStats, progress, profile);
  const reEngagementTriggers = identifyReEngagementNeeds(profile, raw.modules);
  const encouragementOpportunities = findEncouragementOpportunities(heroStats, profile, raw.exercises);
  
  // Generate suggested actions
  const suggestedActions = generateSuggestedActions({
    engagementStatus,
    reviewOpportunities,
    milestones,
    reEngagementTriggers,
    encouragementOpportunities
  });
  
  // Generate email templates
  const emailTemplates = generateEmailTemplates(profile, {
    engagementStatus,
    reviewOpportunities,
    milestones,
    reEngagementTriggers,
    encouragementOpportunities
  });
  
  return {
    engagementStatus,
    reviewOpportunities,
    milestones,
    reEngagementTriggers,
    encouragementOpportunities,
    suggestedActions,
    emailTemplates
  };
};

/**
 * Calculate engagement status
 */
const calculateEngagementStatus = (profile) => {
  if (!profile?.last_active_at) {
    return {
      status: 'inactive',
      daysSinceActive: null,
      streakStatus: 'none',
      message: 'Never logged in'
    };
  }
  
  const now = new Date();
  const lastActive = new Date(profile.last_active_at);
  const daysSinceActive = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
  
  let status, message;
  if (daysSinceActive === 0) {
    status = 'active';
    message = 'Active today';
  } else if (daysSinceActive <= 2) {
    status = 'recent';
    message = `Active ${daysSinceActive} day${daysSinceActive > 1 ? 's' : ''} ago`;
  } else if (daysSinceActive <= 7) {
    status = 'at-risk';
    message = `Inactive for ${daysSinceActive} days`;
  } else {
    status = 'inactive';
    message = `Inactive for ${daysSinceActive} days`;
  }
  
  const streakDays = profile.streak_days || 0;
  const streakStatus = streakDays > 0 ? 'active' : 'broken';
  
  return {
    status,
    daysSinceActive,
    streakStatus,
    streakDays,
    message
  };
};

/**
 * Find review opportunities (modules/units completed 7+ days ago)
 */
const findReviewOpportunities = (modules, units) => {
  const opportunities = [];
  const now = new Date();
  
  // Check completed units
  units.forEach(unit => {
    if (unit.completed_at) {
      const completedDate = new Date(unit.completed_at);
      const daysSince = Math.floor((now - completedDate) / (1000 * 60 * 60 * 24));
      
      if (daysSince >= 7 && daysSince <= 30) {
        opportunities.push({
          type: 'unit',
          id: unit.unit_id,
          name: unit.unit_name,
          daysSinceCompleted: daysSince,
          message: `Review ${unit.unit_name} (completed ${daysSince} days ago)`
        });
      }
    }
  });
  
  // Check completed modules
  modules.forEach(module => {
    if (module.completed_at) {
      const completedDate = new Date(module.completed_at);
      const daysSince = Math.floor((now - completedDate) / (1000 * 60 * 60 * 24));
      
      if (daysSince >= 14 && daysSince <= 60) {
        const lesson = lessons.find(l => l.moduleKey === module.module_id);
        if (lesson) {
          opportunities.push({
            type: 'module',
            id: module.module_id,
            name: lesson.title,
            daysSinceCompleted: daysSince,
            message: `Review ${lesson.title} (completed ${daysSince} days ago)`
          });
        }
      }
    }
  });
  
  return opportunities;
};

/**
 * Detect milestone achievements
 */
const detectMilestones = (heroStats, progress, profile) => {
  const milestones = [];
  const now = new Date();
  
  // Check for recent unit completions (within 24 hours)
  if (progress.completedUnitsCount === 1) {
    milestones.push({
      type: 'first_unit',
      achievement: 'First unit completed!',
      message: 'Congratulations on completing your first unit!'
    });
  }
  
  // Words learned milestones
  const wordsLearned = heroStats.wordsLearned;
  if (wordsLearned >= 25 && wordsLearned < 50) {
    milestones.push({
      type: 'words_25',
      achievement: '25+ words learned',
      message: `Amazing! You've learned ${wordsLearned} French words!`
    });
  } else if (wordsLearned >= 50 && wordsLearned < 100) {
    milestones.push({
      type: 'words_50',
      achievement: '50+ words learned',
      message: `Incredible progress! ${wordsLearned} words and counting!`
    });
  } else if (wordsLearned >= 100) {
    milestones.push({
      type: 'words_100',
      achievement: '100+ words learned',
      message: `You're becoming fluent! ${wordsLearned} words mastered!`
    });
  }
  
  // Module completion milestones
  const modulesCompleted = progress.completedModulesCount;
  if (modulesCompleted >= 10 && modulesCompleted < 20) {
    milestones.push({
      type: 'modules_10',
      achievement: '10+ modules completed',
      message: `Great dedication! ${modulesCompleted} modules completed!`
    });
  } else if (modulesCompleted >= 20) {
    milestones.push({
      type: 'modules_20',
      achievement: '20+ modules completed',
      message: `Outstanding progress! ${modulesCompleted} modules done!`
    });
  }
  
  // Streak milestones
  const streakDays = heroStats.streakDays;
  if (streakDays >= 5 && streakDays < 10) {
    milestones.push({
      type: 'streak_5',
      achievement: '5-day streak',
      message: `Amazing streak! ${streakDays} days in a row!`
    });
  } else if (streakDays >= 10 && streakDays < 30) {
    milestones.push({
      type: 'streak_10',
      achievement: '10+ day streak',
      message: `Incredible dedication! ${streakDays}-day streak!`
    });
  } else if (streakDays >= 30) {
    milestones.push({
      type: 'streak_30',
      achievement: '30+ day streak',
      message: `You're unstoppable! ${streakDays}-day streak!`
    });
  }
  
  return milestones;
};

/**
 * Identify re-engagement triggers
 */
const identifyReEngagementNeeds = (profile, modules) => {
  const triggers = [];
  const daysSinceActive = profile.last_active_at
    ? Math.floor((new Date() - new Date(profile.last_active_at)) / (1000 * 60 * 60 * 24))
    : null;
  
  // Find last completed module
  const lastModule = modules
    .filter(m => m.completed_at)
    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))[0];
  
  const lastLesson = lastModule ? lessons.find(l => l.moduleKey === lastModule.module_id) : null;
  
  // Inactive 3 days
  if (daysSinceActive >= 3 && daysSinceActive < 7) {
    triggers.push({
      type: 'inactive_3days',
      daysSinceActive,
      lastLesson: lastLesson?.title,
      message: `Inactive for ${daysSinceActive} days`,
      suggestion: 'Quick 5-minute review to maintain momentum'
    });
  }
  
  // Inactive 7 days
  if (daysSinceActive >= 7 && daysSinceActive < 14) {
    const completionRate = Math.round((modules.filter(m => m.completed_at).length / lessons.length) * 100);
    triggers.push({
      type: 'inactive_7days',
      daysSinceActive,
      lastLesson: lastLesson?.title,
      completionRate,
      message: `Inactive for ${daysSinceActive} days`,
      suggestion: 'Welcome back! Resume your learning journey'
    });
  }
  
  // Inactive 14+ days
  if (daysSinceActive >= 14) {
    triggers.push({
      type: 'inactive_14plus',
      daysSinceActive,
      lastLesson: lastLesson?.title,
      message: `Inactive for ${daysSinceActive} days`,
      suggestion: 'We miss you! Let\'s get back on track'
    });
  }
  
  // Broken streak
  if (profile.streak_days === 0 && daysSinceActive > 1) {
    triggers.push({
      type: 'broken_streak',
      daysSinceActive,
      message: 'Streak broken',
      suggestion: 'Start a new streak today!'
    });
  }
  
  return triggers;
};

/**
 * Find encouragement opportunities
 */
const findEncouragementOpportunities = (heroStats, profile, exercises) => {
  const opportunities = [];
  
  // Long streak
  if (heroStats.streakDays >= 5) {
    opportunities.push({
      type: 'long_streak',
      streakDays: heroStats.streakDays,
      message: `${heroStats.streakDays}-day streak! Keep it up!`
    });
  }
  
  // High accuracy
  if (heroStats.accuracy >= 90 && exercises.length >= 20) {
    opportunities.push({
      type: 'high_accuracy',
      accuracy: heroStats.accuracy,
      message: `${heroStats.accuracy}% accuracy - excellent work!`
    });
  }
  
  // Consistent daily study
  const daysSinceActive = profile.last_active_at
    ? Math.floor((new Date() - new Date(profile.last_active_at)) / (1000 * 60 * 60 * 24))
    : null;
  
  if (daysSinceActive === 0 && heroStats.streakDays >= 3) {
    opportunities.push({
      type: 'consistent_study',
      message: 'You\'re developing a great learning habit!'
    });
  }
  
  return opportunities;
};

/**
 * Generate suggested actions
 */
const generateSuggestedActions = (insights) => {
  const actions = [];
  
  // Re-engagement actions
  if (insights.reEngagementTriggers.length > 0) {
    const trigger = insights.reEngagementTriggers[0];
    actions.push({
      priority: 'high',
      action: 'send_reengagement_email',
      reason: trigger.message,
      template: 're-engagement'
    });
  }
  
  // Review actions
  if (insights.reviewOpportunities.length > 0 && insights.engagementStatus?.status === 'active') {
    actions.push({
      priority: 'medium',
      action: 'send_review_email',
      reason: `${insights.reviewOpportunities.length} module(s) ready for review`,
      template: 'review'
    });
  }
  
  // Milestone actions
  if (insights.milestones.length > 0) {
    actions.push({
      priority: 'medium',
      action: 'send_milestone_email',
      reason: `${insights.milestones.length} milestone(s) achieved`,
      template: 'milestone'
    });
  }
  
  // Encouragement actions
  if (insights.encouragementOpportunities.length > 0) {
    actions.push({
      priority: 'low',
      action: 'send_encouragement_email',
      reason: insights.encouragementOpportunities[0].message,
      template: 'encouragement'
    });
  }
  
  return actions;
};

/**
 * Generate email templates
 */
const generateEmailTemplates = (profile, insights) => {
  const firstName = profile.first_name || profile.preferred_name || 'there';
  
  const templates = {};
  
  // Re-engagement template
  if (insights.reEngagementTriggers.length > 0) {
    const trigger = insights.reEngagementTriggers[0];
    templates.reEngagement = {
      subject: `We miss you, ${firstName}! 🌟`,
      body: `Hi ${firstName},

We noticed you haven't studied in ${trigger.daysSinceActive} days. ${trigger.lastLesson ? `You were making great progress in "${trigger.lastLesson}"!` : 'You were doing great!'}

${trigger.suggestion}

Keep up your amazing work!

Best regards,
Language Academy Team`
    };
  }
  
  // Review template
  if (insights.reviewOpportunities.length > 0) {
    const opportunities = insights.reviewOpportunities.slice(0, 3);
    const list = opportunities.map(opp => `• ${opp.name} (${opp.daysSinceCompleted} days ago)`).join('\n');
    
    templates.review = {
      subject: `Time to review, ${firstName}! 📚`,
      body: `Hi ${firstName},

It's a great time to review what you've learned:

${list}

A quick review will help solidify your knowledge!

Best regards,
Language Academy Team`
    };
  }
  
  // Milestone template
  if (insights.milestones.length > 0) {
    const milestone = insights.milestones[0];
    templates.milestone = {
      subject: `Congratulations, ${firstName}! 🎉`,
      body: `Hi ${firstName},

${milestone.message}

You're making incredible progress in your French learning journey. Keep up the amazing work!

Best regards,
Language Academy Team`
    };
  }
  
  // Encouragement template
  if (insights.encouragementOpportunities.length > 0) {
    const opportunity = insights.encouragementOpportunities[0];
    templates.encouragement = {
      subject: `You're doing amazing, ${firstName}! 💪`,
      body: `Hi ${firstName},

${opportunity.message}

Your dedication to learning French is truly inspiring. Keep it up!

Best regards,
Language Academy Team`
    };
  }
  
  return templates;
};

/**
 * Calculate insights for multiple students (batch processing)
 * @param {array} studentsData - Array of student report card data
 * @returns {object} Aggregated insights across all students
 */
export const calculateBatchInsights = (studentsData) => {
  const batchInsights = {
    totalStudents: studentsData.length,
    byEngagementStatus: {
      active: 0,
      recent: 0,
      'at-risk': 0,
      inactive: 0
    },
    needsReEngagement: [],
    needsReview: [],
    hasMilestones: [],
    needsEncouragement: []
  };
  
  studentsData.forEach(studentData => {
    const insights = calculateCommunicationInsights(studentData);
    
    // Count by engagement status
    if (insights.engagementStatus) {
      batchInsights.byEngagementStatus[insights.engagementStatus.status]++;
    }
    
    // Collect students needing different types of communication
    if (insights.reEngagementTriggers.length > 0) {
      batchInsights.needsReEngagement.push({
        userId: studentData.profile.id,
        email: studentData.profile.email,
        name: studentData.profile.first_name || studentData.profile.preferred_name,
        trigger: insights.reEngagementTriggers[0]
      });
    }
    
    if (insights.reviewOpportunities.length > 0) {
      batchInsights.needsReview.push({
        userId: studentData.profile.id,
        email: studentData.profile.email,
        name: studentData.profile.first_name || studentData.profile.preferred_name,
        opportunities: insights.reviewOpportunities
      });
    }
    
    if (insights.milestones.length > 0) {
      batchInsights.hasMilestones.push({
        userId: studentData.profile.id,
        email: studentData.profile.email,
        name: studentData.profile.first_name || studentData.profile.preferred_name,
        milestones: insights.milestones
      });
    }
    
    if (insights.encouragementOpportunities.length > 0) {
      batchInsights.needsEncouragement.push({
        userId: studentData.profile.id,
        email: studentData.profile.email,
        name: studentData.profile.first_name || studentData.profile.preferred_name,
        opportunities: insights.encouragementOpportunities
      });
    }
  });
  
  return batchInsights;
};

