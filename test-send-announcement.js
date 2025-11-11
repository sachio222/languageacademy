/**
 * Test Script: Send WOTD Announcement Email
 * Sends the announcement email to brainpowerux@gmail.com for testing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Supabase configuration
const SUPABASE_URL = 'https://feewuhbtaowgpasszyjp.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  console.error('❌ Error: SUPABASE_ANON_KEY not found in environment variables');
  console.log('\nPlease set VITE_SUPABASE_ANON_KEY in your .env file or run:');
  console.log('VITE_SUPABASE_ANON_KEY=your_key node test-send-announcement.js\n');
  process.exit(1);
}

async function sendAnnouncementEmail() {
  try {
    console.log('📧 Sending WOTD announcement email...\n');

    // Read the HTML template
    const templatePath = path.join(
      __dirname,
      'docs/email-system/templates/wotd-announcement.html'
    );
    const htmlContent = fs.readFileSync(templatePath, 'utf8');

    // Prepare email payload
    const payload = {
      to: 'brainpowerux@gmail.com',
      subject: '🇫🇷 Introducing: Your Daily French Word',
      html: htmlContent,
      email_type: 'announcement',
      user_id: 'test-user-announcement',
      metadata: {
        campaign: 'wotd_launch_announcement',
        date: new Date().toISOString(),
        test: true
      }
    };

    console.log('📤 Sending to:', payload.to);
    console.log('📋 Subject:', payload.subject);
    console.log('🔗 Endpoint:', `${SUPABASE_URL}/functions/v1/send-resend-email\n`);

    // Send the email
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/send-resend-email`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('📬 Response:', result);
      console.log('\n🎉 Check brainpowerux@gmail.com for the announcement email!');
    } else {
      console.error('❌ Error sending email:');
      console.error('Status:', response.status);
      console.error('Response:', result);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

sendAnnouncementEmail();

