/**
 * Analyze Module Sections
 * Identifies which sections each module should have based on lesson data
 * Useful for understanding the migration and debugging
 */

import { lessons } from '../src/lessons/lessonData.js';

// Standard vocabulary module sections
const STANDARD_SECTIONS = [
  'vocabulary-intro',
  'flash-cards',
  'speed-match',
  'writing',
  'pronunciation'
];

// Map module types to their sections
const MODULE_TYPE_SECTIONS = {
  isFillInTheBlank: ['practice-exercises'],
  isUnitExam: ['exam-questions'],
  isHelpModule: ['interactive-help'],
  isReadingComprehension: ['reading-passage'],
  isPhonicsReference: ['reference-content']
};

/**
 * Determine which sections a module should have based on its lesson data
 */
function getSectionsForModule(lesson) {
  if (!lesson) return [];

  // Check for special module types
  for (const [moduleType, sections] of Object.entries(MODULE_TYPE_SECTIONS)) {
    if (lesson[moduleType]) {
      return sections;
    }
  }

  // Default: standard vocabulary module
  return STANDARD_SECTIONS;
}

/**
 * Analyze all modules and their required sections
 */
function analyzeModules() {
  console.log('Analyzing modules and their required sections...\n');
  
  const modulesByType = {
    standard: [],
    fillInBlank: [],
    unitExam: [],
    help: [],
    reading: [],
    phonics: []
  };

  lessons.forEach(lesson => {
    const sections = getSectionsForModule(lesson);
    const moduleInfo = {
      id: lesson.id,
      moduleKey: lesson.moduleKey,
      title: lesson.title,
      sections
    };

    // Categorize
    if (lesson.isFillInTheBlank) {
      modulesByType.fillInBlank.push(moduleInfo);
    } else if (lesson.isUnitExam) {
      modulesByType.unitExam.push(moduleInfo);
    } else if (lesson.isHelpModule) {
      modulesByType.help.push(moduleInfo);
    } else if (lesson.isReadingComprehension) {
      modulesByType.reading.push(moduleInfo);
    } else if (lesson.isPhonicsReference) {
      modulesByType.phonics.push(moduleInfo);
    } else {
      modulesByType.standard.push(moduleInfo);
    }
  });

  // Report
  console.log('=== MODULE TYPE BREAKDOWN ===\n');
  
  console.log(`Standard Vocabulary Modules: ${modulesByType.standard.length}`);
  console.log(`  Sections: ${STANDARD_SECTIONS.join(', ')}\n`);
  
  console.log(`Fill-in-Blank Modules: ${modulesByType.fillInBlank.length}`);
  if (modulesByType.fillInBlank.length > 0) {
    console.log(`  Examples: ${modulesByType.fillInBlank.slice(0, 3).map(m => m.title).join(', ')}`);
  }
  console.log(`  Sections: practice-exercises\n`);
  
  console.log(`Unit Exam Modules: ${modulesByType.unitExam.length}`);
  if (modulesByType.unitExam.length > 0) {
    console.log(`  Examples: ${modulesByType.unitExam.slice(0, 3).map(m => m.title).join(', ')}`);
  }
  console.log(`  Sections: exam-questions\n`);
  
  console.log(`Help Modules: ${modulesByType.help.length}`);
  if (modulesByType.help.length > 0) {
    console.log(`  Examples: ${modulesByType.help.slice(0, 3).map(m => m.title).join(', ')}`);
  }
  console.log(`  Sections: interactive-help\n`);
  
  console.log(`Reading Comprehension Modules: ${modulesByType.reading.length}`);
  if (modulesByType.reading.length > 0) {
    console.log(`  Examples: ${modulesByType.reading.slice(0, 3).map(m => m.title).join(', ')}`);
  }
  console.log(`  Sections: reading-passage\n`);
  
  console.log(`Phonics Reference Modules: ${modulesByType.phonics.length}`);
  if (modulesByType.phonics.length > 0) {
    console.log(`  Examples: ${modulesByType.phonics.slice(0, 3).map(m => m.title).join(', ')}`);
  }
  console.log(`  Sections: reference-content\n`);

  // Generate SQL mapping for migration (more accurate than pattern matching)
  console.log('\n=== SQL CASE STATEMENT FOR MIGRATION ===\n');
  console.log('-- Use this in your migration for accurate section mapping:');
  console.log('CASE');
  
  // Unit exams
  if (modulesByType.unitExam.length > 0) {
    console.log('  -- Unit Exams');
    modulesByType.unitExam.forEach(m => {
      console.log(`  WHEN p_module_key = '${m.moduleKey}' THEN ARRAY['exam-questions']`);
    });
  }
  
  // Fill in blank
  if (modulesByType.fillInBlank.length > 0) {
    console.log('  -- Fill-in-Blank');
    modulesByType.fillInBlank.forEach(m => {
      console.log(`  WHEN p_module_key = '${m.moduleKey}' THEN ARRAY['practice-exercises']`);
    });
  }
  
  // Help modules
  if (modulesByType.help.length > 0) {
    console.log('  -- Help Modules');
    modulesByType.help.forEach(m => {
      console.log(`  WHEN p_module_key = '${m.moduleKey}' THEN ARRAY['interactive-help']`);
    });
  }
  
  // Reading
  if (modulesByType.reading.length > 0) {
    console.log('  -- Reading Comprehension');
    modulesByType.reading.forEach(m => {
      console.log(`  WHEN p_module_key = '${m.moduleKey}' THEN ARRAY['reading-passage']`);
    });
  }
  
  // Phonics
  if (modulesByType.phonics.length > 0) {
    console.log('  -- Phonics Reference');
    modulesByType.phonics.forEach(m => {
      console.log(`  WHEN p_module_key = '${m.moduleKey}' THEN ARRAY['reference-content']`);
    });
  }
  
  console.log(`  -- Standard Vocabulary (default)`);
  console.log(`  ELSE ARRAY['vocabulary-intro', 'flash-cards', 'speed-match', 'writing', 'pronunciation']`);
  console.log('END;');

  return modulesByType;
}

// Run analysis
analyzeModules();

