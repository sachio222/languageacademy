# Email System Documentation

## 📋 Quick Start

1. **Setup Database:** Run `email-system-final.sql` in Supabase SQL Editor
2. **Test Connection:** Click 📧 button in app → "Test Resend Email"
3. **Build n8n Workflows:** Use `EMAIL_SYSTEM_GUIDE.md` for complete examples

## 📁 Files in This Directory

### Setup Files

- **`email-system-final.sql`** - Complete database setup (run this)
- **`cleanup-email-bloat.sql`** - Clean old tables (run first if needed)
- **`email-system-minimal.sql`** - Minimal version (alternative)

### Documentation

- **`EMAIL_SYSTEM_GUIDE.md`** - **MAIN GUIDE** (everything you need)
- **`FINAL_EMAIL_SETUP.md`** - Deployment checklist
- **`N8N_WORKFLOWS_GUIDE.md`** - n8n workflow examples

## 🎯 What Works Right Now

✅ **Congrats emails** - Sent when user completes module  
✅ **MailerLite sync** - Users added to segments on signup  
✅ **User preferences** - Users can opt out  
✅ **Admin dashboard** - View email activity  
✅ **Test emails** - Verify Resend connection

## 🚧 What You Need to Build

❌ **MailerLite groups** - Create "All Users", "Module Completers" groups  
❌ **MailerLite automation** - Welcome email when added to "All Users"  
❌ **n8n WOTD workflow** - Daily word generation + sending  
❌ **n8n weekly workflow** - Personal vocabulary summaries  
❌ **WOTD page** - Handle quiz answers from email clicks

## 🔗 Key URLs

- **Resend Dashboard:** https://resend.com/emails
- **MailerLite Dashboard:** https://dashboard.mailerlite.com
- **Supabase Functions:** https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/functions
- **Your App Admin:** https://languageacademy.io?communication-admin=true

## 🆘 Need Help?

**Start with:** `EMAIL_SYSTEM_GUIDE.md` - has everything you need for n8n workflows and API usage.

**For issues:** Check Supabase Edge Function logs and email_logs table.
