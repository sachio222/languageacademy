#!/bin/bash

# Deploy Supabase Edge Functions
# This script deploys all edge functions related to module and email functionality

set -e

echo "🚀 Deploying Supabase Edge Functions..."

# Deploy module-related functions
echo "📦 Deploying get-module-email-data..."
supabase functions deploy get-module-email-data

echo "📦 Deploying get-user-email-stats..."
supabase functions deploy get-user-email-stats

# Optional: Deploy other email-related functions if needed
# echo "📦 Deploying send-resend-email..."
# supabase functions deploy send-resend-email

# echo "📦 Deploying sync-to-mailerlite..."
# supabase functions deploy sync-to-mailerlite

echo "✅ Edge functions deployment complete!"
echo ""
echo "View deployments: https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/functions"

