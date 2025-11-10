// Email Templates - Simple HTML templates for Resend
// NOTE: These are basic placeholders - improve the design/copy when ready

const APP_URL = 'https://languageacademy.app';

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  color: #1a1a1a;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const emailTemplates = {
  // Lesson completion (sent via Resend when module completes)
  lessonComplete: (userName, moduleTitle, moduleId) => ({
    subject: `Congratulations! You completed ${moduleTitle}! 🎉`,
    html: `
      <div style="${baseStyles}">
        <h1 style="color: #2563eb;">Congratulations, ${userName}!</h1>
        <p>You just completed <strong>${moduleTitle}</strong>!</p>
        <p>Great progress on your French journey.</p>
        <p><a href="${APP_URL}/lessons" style="color: #2563eb;">Continue Learning →</a></p>
        <p style="color: #665665; font-size: 14px;">Bonne continuation!<br>Language Academy</p>
      </div>
    `
  }),

  // Module nudge (sent via Resend for abandoned modules)
  moduleNudge: (userName, moduleTitle, moduleId, modulesRemaining) => ({
    subject: `Just ${modulesRemaining} modules to go! 🎯`,
    html: `
      <div style="${baseStyles}">
        <h1 style="color: #2563eb;">You're Almost There!</h1>
        <p>Hi ${userName},</p>
        <p>You're making great progress! Only <strong>${modulesRemaining} modules</strong> left in this unit.</p>
        <p>Keep the momentum going!</p>
        <p><a href="${APP_URL}/lessons?module=${moduleId}" style="color: #2563eb;">Continue ${moduleTitle} →</a></p>
        <p style="color: #665665; font-size: 14px;">You can do it!<br>Language Academy</p>
      </div>
    `
  }),

  // Word of the day quiz (sent via n8n/Resend)
  wordOfTheDay: (word, pronunciation, optionA, optionB, optionC, optionD, wordId) => ({
    subject: `Votre mot du jour: "${word}" 🇫🇷`,
    html: `
      <div style="${baseStyles}">
        <h1 style="color: #2563eb; margin-bottom: 8px;">Mot du Jour</h1>
        <h2 style="color: #1a1a1a; margin: 0;">"${word}"</h2>
        <p style="color: #665665; margin-top: 4px;">/${pronunciation}/</p>
        
        <div style="margin: 32px 0;">
          <p style="font-size: 18px; font-weight: 500;">What does "${word}" mean?</p>
          
          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
            <a href="${APP_URL}/wotd?word=${wordId}&answer=A" 
               style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
              A) ${optionA}
            </a>
            <a href="${APP_URL}/wotd?word=${wordId}&answer=B" 
               style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
              B) ${optionB}
            </a>
            <a href="${APP_URL}/wotd?word=${wordId}&answer=C" 
               style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
              C) ${optionC}
            </a>
            <a href="${APP_URL}/wotd?word=${wordId}&answer=D" 
               style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
              D) ${optionD}
            </a>
            <a href="${APP_URL}/wotd?word=${wordId}&answer=X" 
               style="display: block; padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; text-decoration: none; color: #1e40af; text-align: center;">
              I don't know
            </a>
          </div>
        </div>
        
        <p style="color: #665665; font-size: 14px;">Bonne chance!<br>Language Academy</p>
      </div>
    `
  }),

  // Weekly vocabulary summary (sent via n8n/Resend)
  weeklySummary: (userName, wordsLearned, totalWords, weekStart, weekEnd) => ({
    subject: `Your French Progress: ${wordsLearned.length} words this week! 📚`,
    html: `
      <div style="${baseStyles}">
        <h1 style="color: #2563eb;">Weekly French Summary</h1>
        <p>Hi ${userName},</p>
        <p>Here's your progress from ${weekStart} to ${weekEnd}:</p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 16px 0;">Words You Learned This Week:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${wordsLearned.map(word => `<li><strong>${word.french}</strong> - ${word.english}</li>`).join('')}
          </ul>
          <p style="margin: 16px 0 0 0; color: #665665; font-size: 14px;">Total vocabulary: ${totalWords} words</p>
        </div>
        
        <p><a href="${APP_URL}/lessons" style="color: #2563eb;">Keep Learning →</a></p>
        <p style="color: #665665; font-size: 14px;">Bravo!<br>Language Academy</p>
      </div>
    `
  })
};


