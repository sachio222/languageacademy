import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-clerk-token',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Stripe checkout started')
    
    // Get Stripe secret key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured')
    }
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get Clerk JWT from custom header
    const clerkToken = req.headers.get('X-Clerk-Token')
    console.log('Clerk token present:', !!clerkToken)
    
    if (!clerkToken) {
      throw new Error('No Clerk authentication token')
    }

    console.log('Token length:', clerkToken.length)
    
    // Decode Clerk JWT to get user ID (without verification for now)
    // In production, you should verify the JWT signature with Clerk's JWKS
    let payload, userId
    try {
      payload = JSON.parse(atob(clerkToken.split('.')[1]))
      userId = payload.sub
      console.log('Decoded user ID:', userId)
    } catch (e) {
      console.error('JWT decode failed:', e)
      throw new Error('Invalid JWT format')
    }
    
    if (!userId) {
      throw new Error('Invalid token - no user ID')
    }

    // Get user from profiles table directly using service role
    console.log('Fetching profile for clerk_user_id:', userId)
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, email, stripe_customer_id')
      .eq('clerk_user_id', userId)
      .single()
    
    console.log('Profile query result:', { hasProfile: !!profile, error: profileError })
    
    if (profileError || !profile) {
      console.error('Profile error:', profileError)
      throw new Error(`User not found: ${profileError?.message || 'no profile'}`)
    }
    
    const user = { id: profile.id, email: profile.email }
    console.log('User authenticated:', user.id)

    // Parse request body
    const { priceId, touchpoint, metadata = {} } = await req.json()

    if (!priceId) {
      throw new Error('Missing priceId parameter')
    }

    // Use the profile we already fetched
    // (no need to query again)

    // Determine if this is a subscription or one-time payment
    // Lifetime is one-time, others are subscriptions
    const isLifetime = priceId.includes('1SrQqxEyhpMckjNRGAeW1CTm') // Lifetime price ID
    
    // Create or retrieve Stripe customer
    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Save customer ID to profile
      await supabase
        .from('user_profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Get success and cancel URLs
    const baseUrl = Deno.env.get('BASE_URL') || 'http://localhost:5173'
    const successUrl = `${baseUrl}?checkout=success`
    const cancelUrl = `${baseUrl}?checkout=canceled`

    // Create Checkout Session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      mode: isLifetime ? 'payment' : 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        supabase_user_id: user.id,
        touchpoint: touchpoint || 'direct',
        ...metadata,
      },
      // Allow promotion codes
      allow_promotion_codes: true,
    }

    // For subscriptions, add trial period (optional)
    // if (!isLifetime) {
    //   sessionParams.subscription_data = {
    //     trial_period_days: 7,
    //   }
    // }

    const session = await stripe.checkout.sessions.create(sessionParams)

    // Log conversion event (user clicked checkout)
    await supabase
      .from('conversion_events')
      .insert({
        user_id: user.id,
        event_type: touchpoint || 'direct',
        shown_at: new Date().toISOString(),
        converted: true,
        selected_plan: getPlanFromPriceId(priceId),
        converted_at: new Date().toISOString(),
        metadata: {
          priceId,
          sessionId: session.id,
          ...metadata,
        },
      })

    return new Response(
      JSON.stringify({ 
        url: session.url,
        sessionId: session.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Stripe Checkout Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create checkout session',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

// Helper to determine plan from price ID
function getPlanFromPriceId(priceId: string): string {
  if (priceId.includes('1SrQtlEyhpMckjNRtFU3KUZ2')) return 'weekly'
  if (priceId.includes('1SrQtlEyhpMckjNRyeDVHpPI')) return 'monthly'
  if (priceId.includes('1SrQtlEyhpMckjNRBfTUGJ2d')) return 'annual'
  if (priceId.includes('1SrQqxEyhpMckjNRGAeW1CTm')) return 'lifetime'
  return 'unknown'
}
