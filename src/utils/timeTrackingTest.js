/**
 * Time Tracking Verification Utility
 * Use this to test that module/unit time tracking is working properly
 */

import { logger } from './logger';

/**
 * Test time tracking consistency
 * @param {object} reportData - Data from useReportCardData
 */
export const verifyTimeTracking = (reportData) => {
  if (!reportData) {
    logger.warn('No report data provided for time tracking verification');
    return;
  }

  const { heroStats, progress, raw } = reportData;
  
  // Total study time from profile
  const totalStudyTime = heroStats.totalStudyTime;
  
  // Sum of all module times
  const moduleTimeSum = raw.modules.reduce((sum, module) => {
    return sum + (module.time_spent_seconds || 0);
  }, 0);
  
  // Sum of all unit times
  const unitTimeSum = raw.units.reduce((sum, unit) => {
    return sum + (unit.time_spent_seconds || 0);
  }, 0);
  
  logger.log('=== Time Tracking Verification ===');
  logger.log(`Total Study Time (profile): ${totalStudyTime}s (${formatDuration(totalStudyTime)})`);
  logger.log(`Sum of Module Times: ${moduleTimeSum}s (${formatDuration(moduleTimeSum)})`);
  logger.log(`Sum of Unit Times: ${unitTimeSum}s (${formatDuration(unitTimeSum)})`);
  
  // Check consistency
  const moduleTimeDiff = Math.abs(totalStudyTime - moduleTimeSum);
  const unitTimeDiff = Math.abs(totalStudyTime - unitTimeSum);
  
  logger.log(`\nConsistency Check:`);
  logger.log(`Total vs Module Sum Difference: ${moduleTimeDiff}s`);
  logger.log(`Total vs Unit Sum Difference: ${unitTimeDiff}s`);
  
  // Warnings for large discrepancies (allow for small differences due to timing)
  if (moduleTimeDiff > 60) { // More than 1 minute difference
    logger.warn(`⚠️ Large discrepancy between total study time and module time sum: ${moduleTimeDiff}s`);
  } else {
    logger.log(`✅ Module time tracking appears consistent (difference: ${moduleTimeDiff}s)`);
  }
  
  if (unitTimeDiff > 60) {
    logger.warn(`⚠️ Large discrepancy between total study time and unit time sum: ${unitTimeDiff}s`);
  } else {
    logger.log(`✅ Unit time tracking appears consistent (difference: ${unitTimeDiff}s)`);
  }
  
  // Show module breakdown
  logger.log(`\nModule Time Breakdown:`);
  raw.modules.forEach(module => {
    const time = module.time_spent_seconds || 0;
    if (time > 0) {
      logger.log(`  Module ${module.module_id}: ${time}s (${formatDuration(time)})`);
    }
  });
  
  // Show unit breakdown
  logger.log(`\nUnit Time Breakdown:`);
  raw.units.forEach(unit => {
    const time = unit.time_spent_seconds || 0;
    if (time > 0) {
      logger.log(`  Unit ${unit.unit_id}: ${time}s (${formatDuration(time)})`);
    }
  });
  
  logger.log('=== End Verification ===');
};

/**
 * Format duration for display
 */
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
