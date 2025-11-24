-- Migration: Mark all sections complete for users who completed modules under old system
-- This ensures completed modules show in new report card and users can access next modules
-- Sets time_spent_seconds = 0 to indicate section-level time is N/A (only module time available)

-- Helper function to determine which sections a module needs based on lesson data
-- This is a simplified version - adjust section lists based on your actual module types
CREATE OR REPLACE FUNCTION get_sections_for_module(p_module_key TEXT)
RETURNS TEXT[] AS $$
DECLARE
  sections TEXT[];
BEGIN
  -- Default: Standard vocabulary module sections (core 4, non-premium)
  -- Pronunciation and Conversation are premium/optional - don't mark as complete
  sections := ARRAY[
    'vocabulary-intro',
    'flash-cards',
    'speed-match',
    'writing'
  ];
  
  -- Note: In production, you'd query your lessons data to determine module type
  -- For now, we'll use pattern matching on module_key or hardcode special cases
  
  -- Unit exams (pattern: contains 'exam' or 'unit-X-exam')
  IF p_module_key LIKE '%exam%' OR p_module_key LIKE '%unit-%' THEN
    sections := ARRAY['exam-questions'];
    RETURN sections;
  END IF;
  
  -- Fill-in-blank modules (pattern: contains 'practice' or known keys)
  IF p_module_key LIKE '%practice%' OR p_module_key LIKE '%fill%' THEN
    sections := ARRAY['practice-exercises'];
    RETURN sections;
  END IF;
  
  -- Help modules (pattern: contains 'help')
  IF p_module_key LIKE '%help%' THEN
    sections := ARRAY['interactive-help'];
    RETURN sections;
  END IF;
  
  -- Reading comprehension (pattern: contains 'reading')
  IF p_module_key LIKE '%reading%' THEN
    sections := ARRAY['reading-passage'];
    RETURN sections;
  END IF;
  
  -- Phonics reference (pattern: contains 'phonics' or 'reference')
  IF p_module_key LIKE '%phonics%' OR p_module_key LIKE '%reference%' THEN
    sections := ARRAY['reference-content'];
    RETURN sections;
  END IF;
  
  -- Return standard sections for everything else
  RETURN sections;
END;
$$ LANGUAGE plpgsql;

-- Main migration: Create section_progress entries for completed modules
DO $$
DECLARE
  completed_module RECORD;
  current_section TEXT;
  sections TEXT[];
  existing_section RECORD;
  default_accuracy INTEGER := 85; -- Default passing score for migrated data
BEGIN
  RAISE NOTICE 'Starting migration of completed modules to section progress...';
  
  -- Loop through all completed modules
  FOR completed_module IN 
    SELECT 
      mp.user_id,
      mp.module_key,
      mp.completed_at,
      mp.exam_score,
      mp.time_spent_seconds
    FROM module_progress mp
    WHERE mp.completed_at IS NOT NULL
    ORDER BY mp.user_id, mp.completed_at
  LOOP
    -- Get sections needed for this module
    sections := get_sections_for_module(completed_module.module_key);
    
    RAISE NOTICE 'Processing module % for user %, sections: %', 
      completed_module.module_key, 
      completed_module.user_id, 
      array_length(sections, 1);
    
    -- Create section_progress entry for each section
    FOREACH current_section IN ARRAY sections
    LOOP
      -- Check if section already exists (don't overwrite)
      SELECT * INTO existing_section
      FROM section_progress sp
      WHERE sp.user_id = completed_module.user_id
        AND sp.module_key = completed_module.module_key
        AND sp.section_id = current_section;
      
      IF existing_section.id IS NULL THEN
        -- Section doesn't exist, create it
        INSERT INTO section_progress (
          user_id,
          module_key,
          section_id,
          time_spent_seconds,
          completed_at,
          last_activity_at,
          progress_data
        ) VALUES (
          completed_module.user_id,
          completed_module.module_key,
          current_section,
          0, -- Time = 0 indicates N/A (only module-level time available)
          completed_module.completed_at,
          completed_module.completed_at,
          jsonb_build_object(
            'migrated', true,
            'accuracy', COALESCE(completed_module.exam_score, default_accuracy),
            'migrated_from_module_progress', true,
            'note', 'Section-level data not available - migrated from old system'
          )
        );
        
        RAISE NOTICE '  Created section: % (time=0, accuracy=%)', 
          current_section, 
          COALESCE(completed_module.exam_score, default_accuracy);
      ELSE
        RAISE NOTICE '  Skipped section: % (already exists)', current_section;
      END IF;
    END LOOP;
  END LOOP;
  
  RAISE NOTICE 'Migration complete!';
END $$;

-- Drop helper function (no longer needed after migration)
DROP FUNCTION IF EXISTS get_sections_for_module(TEXT);

-- Add comment for documentation
COMMENT ON TABLE section_progress IS 'Tracks user progress through module sections. Entries with time_spent_seconds=0 and progress_data.migrated=true are from old system migration where section-level data was not available.';

