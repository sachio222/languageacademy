// Test script to send a Word of the Day email
// Usage: node test-wotd-email.js

import { createClient } from '@supabase/supabase-js';
import { emailTemplates } from './src/utils/emailTemplates.js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('   Need: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sendTestWOTD() {
  console.log('📧 Preparing to send test WOTD email...\n');

  // Stub data for testing
  const testData = {
    word: 'aller',
    pronunciation: 'a.le',
    optionA: 'to go',      // correct answer
    optionB: 'to have',
    optionC: 'to want',
    optionD: 'to make',
    wordId: 'aller-fr',
    partOfSpeech: 'verb',
    difficultyLabel: 'A2 Level'
  };

  // Generate the email HTML using our template
  const { subject, html } = emailTemplates.wordOfTheDay(
    testData.word,
    testData.pronunciation,
    testData.optionA,
    testData.optionB,
    testData.optionC,
    testData.optionD,
    testData.wordId,
    testData.partOfSpeech,
    testData.difficultyLabel
  );

  console.log('📝 Email details:');
  console.log('   To: brainpowerux@gmail.com');
  console.log('   Subject:', subject);
  console.log('   Word:', testData.word);
  console.log('\n🚀 Sending email via Supabase edge function...\n');

  try {
    const { data, error } = await supabase.functions.invoke('send-resend-email', {
      body: {
        to: 'brainpowerux@gmail.com',
        subject: subject,
        html: html,
        email_type: 'word_of_day',
        metadata: {
          word: testData.word,
          word_id: testData.wordId,
          test: true,
          sent_from: 'test-wotd-email.js'
        }
      }
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      console.error('   Details:', JSON.stringify(error, null, 2));
      process.exit(1);
    }

    console.log('✅ Email sent successfully!');
    console.log('   Response:', JSON.stringify(data, null, 2));
    console.log('\n📬 Check brainpowerux@gmail.com for the email');
    console.log('   (Check spam folder if not in inbox)\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    console.error('   Stack:', err.stack);
    process.exit(1);
  }
}

// Run the test
sendTestWOTD();

