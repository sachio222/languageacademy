/**
 * Performance testing and monitoring utilities
 */

import * as originalApi from '../api/wordDataApi';
import * as optimizedApi from '../api/wordDataApiOptimized';

/**
 * Measure execution time of a function
 */
export const measureTime = async (fn, ...args) => {
  const start = performance.now();
  const result = await fn(...args);
  const end = performance.now();
  return {
    result,
    executionTime: end - start
  };
};

/**
 * Compare performance between original and optimized APIs
 */
export const compareApiPerformance = async (testCases = []) => {
  const defaultTestCases = [
    {
      name: 'Search all words',
      fn: (api) => api.searchWords('', { limit: 50 }),
      args: []
    },
    {
      name: 'Search with term',
      fn: (api) => api.searchWords('bonjour', { limit: 10 }),
      args: []
    },
    {
      name: 'Filter by unit',
      fn: (api) => api.getWordsByUnit('unit1', { limit: 20 }),
      args: []
    },
    {
      name: 'Filter by part of speech',
      fn: (api) => api.getWordsByPartOfSpeech('verb', 30),
      args: []
    },
    {
      name: 'Complex search',
      fn: (api) => api.searchWords('être', { 
        partOfSpeech: 'verb', 
        cefrLevel: 'A1', 
        unit: 'unit1',
        limit: 15 
      }),
      args: []
    },
    {
      name: 'Get available units',
      fn: (api) => api.getAvailableUnits(),
      args: []
    },
    {
      name: 'Get word by ID',
      fn: (api) => api.getWordById('être-fr'),
      args: []
    }
  ];

  const tests = testCases.length > 0 ? testCases : defaultTestCases;
  const results = [];

  console.log('🚀 Starting API Performance Comparison...\n');

  for (const test of tests) {
    console.log(`Testing: ${test.name}`);
    
    // Test original API
    const originalResult = await measureTime(test.fn, originalApi);
    
    // Test optimized API
    const optimizedResult = await measureTime(test.fn, optimizedApi);
    
    const improvement = ((originalResult.executionTime - optimizedResult.executionTime) / originalResult.executionTime) * 100;
    
    const testResult = {
      name: test.name,
      original: {
        time: originalResult.executionTime,
        resultCount: Array.isArray(originalResult.result?.words) ? originalResult.result.words.length : 
                    Array.isArray(originalResult.result) ? originalResult.result.length : 1
      },
      optimized: {
        time: optimizedResult.executionTime,
        resultCount: Array.isArray(optimizedResult.result?.words) ? optimizedResult.result.words.length : 
                     Array.isArray(optimizedResult.result) ? optimizedResult.result.length : 1
      },
      improvement: improvement,
      speedup: originalResult.executionTime / optimizedResult.executionTime
    };
    
    results.push(testResult);
    
    console.log(`  Original: ${originalResult.executionTime.toFixed(2)}ms (${testResult.original.resultCount} results)`);
    console.log(`  Optimized: ${optimizedResult.executionTime.toFixed(2)}ms (${testResult.optimized.resultCount} results)`);
    console.log(`  Improvement: ${improvement.toFixed(1)}% (${testResult.speedup.toFixed(1)}x faster)\n`);
  }

  // Calculate overall statistics
  const avgImprovement = results.reduce((sum, r) => sum + r.improvement, 0) / results.length;
  const avgSpeedup = results.reduce((sum, r) => sum + r.speedup, 0) / results.length;
  const maxSpeedup = Math.max(...results.map(r => r.speedup));
  const minSpeedup = Math.min(...results.map(r => r.speedup));

  console.log('📊 Performance Summary:');
  console.log(`  Average Improvement: ${avgImprovement.toFixed(1)}%`);
  console.log(`  Average Speedup: ${avgSpeedup.toFixed(1)}x`);
  console.log(`  Best Speedup: ${maxSpeedup.toFixed(1)}x`);
  console.log(`  Worst Speedup: ${minSpeedup.toFixed(1)}x`);

  return {
    results,
    summary: {
      avgImprovement,
      avgSpeedup,
      maxSpeedup,
      minSpeedup
    }
  };
};

/**
 * Memory usage monitoring
 */
export const measureMemoryUsage = () => {
  if (typeof performance !== 'undefined' && performance.memory) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };
  }
  return null;
};

/**
 * Load testing utility
 */
export const loadTest = async (api, testFunction, iterations = 100) => {
  console.log(`🔄 Running load test with ${iterations} iterations...`);
  
  const times = [];
  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    const { executionTime } = await measureTime(testFunction, api);
    times.push(executionTime);
    
    if (i % 10 === 0) {
      console.log(`  Completed ${i}/${iterations} iterations`);
    }
  }
  
  const totalTime = performance.now() - startTime;
  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  
  console.log(`Load test completed:`);
  console.log(`  Total time: ${totalTime.toFixed(2)}ms`);
  console.log(`  Average time: ${avgTime.toFixed(2)}ms`);
  console.log(`  Min time: ${minTime.toFixed(2)}ms`);
  console.log(`  Max time: ${maxTime.toFixed(2)}ms`);
  console.log(`  Requests/second: ${(iterations / (totalTime / 1000)).toFixed(2)}`);
  
  return {
    totalTime,
    avgTime,
    minTime,
    maxTime,
    times,
    requestsPerSecond: iterations / (totalTime / 1000)
  };
};

/**
 * Cache performance analysis
 */
export const analyzeCachePerformance = async () => {
  console.log('📈 Analyzing cache performance...');
  
  // Clear caches
  if (optimizedApi.clearCache) {
    optimizedApi.clearCache();
  }
  
  // First call (cold cache)
  const coldResult = await measureTime(() => optimizedApi.searchWords('', { limit: 50 }));
  console.log(`Cold cache: ${coldResult.executionTime.toFixed(2)}ms`);
  
  // Second call (warm cache)
  const warmResult = await measureTime(() => optimizedApi.searchWords('', { limit: 50 }));
  console.log(`Warm cache: ${warmResult.executionTime.toFixed(2)}ms`);
  
  const cacheSpeedup = coldResult.executionTime / warmResult.executionTime;
  console.log(`Cache speedup: ${cacheSpeedup.toFixed(1)}x`);
  
  // Get cache stats
  const stats = optimizedApi.getPerformanceStats();
  if (stats) {
    console.log('Cache statistics:', stats);
  }
  
  return {
    coldTime: coldResult.executionTime,
    warmTime: warmResult.executionTime,
    speedup: cacheSpeedup,
    stats
  };
};

/**
 * Run comprehensive performance analysis
 */
export const runPerformanceAnalysis = async () => {
  console.log('🔍 Running comprehensive performance analysis...\n');
  
  // API comparison
  const comparison = await compareApiPerformance();
  
  // Cache analysis
  const cacheAnalysis = await analyzeCachePerformance();
  
  // Memory usage
  const memoryUsage = measureMemoryUsage();
  if (memoryUsage) {
    console.log('\n💾 Memory Usage:');
    console.log(`  Used: ${(memoryUsage.used / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Total: ${(memoryUsage.total / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Limit: ${(memoryUsage.limit / 1024 / 1024).toFixed(2)} MB`);
  }
  
  return {
    comparison,
    cacheAnalysis,
    memoryUsage
  };
};
