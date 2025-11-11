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
  // Airbnb-style: clean, minimal, logo in footer
  wordOfTheDay: (word, pronunciation, optionA, optionB, optionC, optionD, wordId, partOfSpeech = 'word', difficultyLabel = '') => ({
    subject: `🇫🇷 Your French Word: ${word}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Word of the Day</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
          <tr>
            <td align="center" style="padding: 48px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px;">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 0 0 40px 0; text-align: center;">
                    <div style="font-size: 13px; font-weight: 500; letter-spacing: 0.5px; color: #999999; text-transform: uppercase; margin-bottom: 16px;">Word of the Day</div>
                    <div style="font-size: 14px; color: #665665;">🇫🇷</div>
                  </td>
                </tr>

                <!-- Word Display -->
                <tr>
                  <td style="padding: 0 0 48px 0; text-align: center; border-bottom: 1px solid #f0f0f0;">
                    <h1 style="margin: 0 0 12px 0; font-size: 42px; font-weight: 300; letter-spacing: -0.03em; color: #1a1a1a;">${word}</h1>
                    <div style="font-size: 16px; color: #999999; margin-bottom: 8px;">/${pronunciation}/</div>
                    ${partOfSpeech ? `<div style="display: inline-block; padding: 4px 12px; background: #fafbfc; border-radius: 12px; font-size: 13px; color: #665665; margin-top: 8px;">${partOfSpeech}${difficultyLabel ? ' • ' + difficultyLabel : ''}</div>` : ''}
                  </td>
                </tr>

                <!-- Question -->
                <tr>
                  <td style="padding: 48px 0 32px 0; text-align: center;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a;">What does this mean?</h2>
                  </td>
                </tr>

                <!-- Answer Options -->
                <tr>
                  <td style="padding: 0 0 24px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <a href="${APP_URL}?wotd=true&word=${wordId}&answer=A&date=${new Date().toISOString().split('T')[0]}" 
                             style="display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center; transition: all 0.15s ease;">
                            ${optionA}
            </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <a href="${APP_URL}?wotd=true&word=${wordId}&answer=B&date=${new Date().toISOString().split('T')[0]}" 
                             style="display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;">
                            ${optionB}
            </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <a href="${APP_URL}?wotd=true&word=${wordId}&answer=C&date=${new Date().toISOString().split('T')[0]}" 
                             style="display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;">
                            ${optionC}
            </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <a href="${APP_URL}?wotd=true&word=${wordId}&answer=D&date=${new Date().toISOString().split('T')[0]}" 
                             style="display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;">
                            ${optionD}
            </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Don't Know Option -->
                <tr>
                  <td style="padding: 0 0 48px 0; text-align: center;">
                    <a href="${APP_URL}?wotd=true&word=${wordId}&answer=X&date=${new Date().toISOString().split('T')[0]}" 
                       style="display: inline-block; padding: 0; background: none; border: none; text-decoration: underline; color: #999999; font-size: 15px;">
              I don't know
            </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 48px 0 0 0; border-top: 1px solid #f0f0f0; text-align: center;">
                    <div style="padding: 24px 0 16px 0;">
                      <img src="https://languageacademy.app/img/logov2.png" alt="Language Academy" style="height: 32px; width: auto; margin-bottom: 12px;" />
                      <div style="font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; margin-bottom: 4px;">Language Academy</div>
                      <div style="font-size: 13px; color: #999999;">Learn French, one word at a time</div>
                    </div>
                    <div style="padding: 16px 0;">
                      <a href="${APP_URL}" style="color: #3b82f6; text-decoration: none; font-size: 14px; margin: 0 12px;">Visit App</a>
                      <span style="color: #e0e0e0;">|</span>
                      <a href="${APP_URL}/settings?section=notifications" style="color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;">Preferences</a>
                      <span style="color: #e0e0e0;">|</span>
                      <a href="${APP_URL}/unsubscribe?type=wotd" style="color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;">Unsubscribe</a>
          </div>
                    <div style="padding: 16px 0 0 0; font-size: 12px; color: #cccccc;">
                      © ${new Date().getFullYear()} Language Academy. All rights reserved.
        </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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


