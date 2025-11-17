-- Add engagement_slide column to word_of_the_day table
-- For AI-generated Instagram engagement slides

ALTER TABLE word_of_the_day 
ADD COLUMN engagement_slide JSONB;

-- Add comment to document the field
COMMENT ON COLUMN word_of_the_day.engagement_slide IS 'AI-selected Instagram engagement slide: quiz, challenge, opinion, mnemonic, or mistake with type-specific content';


