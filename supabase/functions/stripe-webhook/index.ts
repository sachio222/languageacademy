import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  if (!signature || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 })
  }

  try {
    const body = await req.text()
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    console.log('Received Stripe webhook:', event.type)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session, supabase)
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCreated(subscription, supabase)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription, supabase)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription, supabase)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice, supabase)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice, supabase)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    )
  }
})

// Handle successful checkout session
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: any
) {
  const userId = session.metadata?.supabase_user_id
  if (!userId) {
    console.error('No user ID in session metadata')
    return
  }

  const customerId = session.customer as string
  const subscriptionId = session.subscription as string | null
  const mode = session.mode

  // Determine plan tier
  let tier = 'free'
  let status = null

  if (mode === 'payment') {
    // One-time payment (Lifetime)
    tier = 'lifetime'
    status = null // No status for one-time purchases
  } else if (mode === 'subscription' && subscriptionId) {
    // Subscription - get details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const priceId = subscription.items.data[0]?.price.id
    tier = getPlanFromPriceId(priceId)
    status = subscription.status
  }

  // Update user profile
  const updateData: any = {
    stripe_customer_id: customerId,
    subscription_tier: tier,
    subscription_started_at: new Date().toISOString(),
  }

  if (subscriptionId) {
    updateData.stripe_subscription_id = subscriptionId
    updateData.subscription_status = status
  }

  if (tier === 'lifetime') {
    updateData.subscription_ends_at = null // Lifetime never expires
  }

  const { error } = await supabase
    .from('user_profiles')
    .update(updateData)
    .eq('id', userId)

  if (error) {
    console.error('Error updating user profile:', error)
  } else {
    console.log(`Updated user ${userId} to tier: ${tier}`)
  }
}

// Handle subscription created
async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
  supabase: any
) {
  const userId = subscription.metadata?.supabase_user_id
  if (!userId) {
    // Try to get user from customer
    const customer = await stripe.customers.retrieve(subscription.customer as string)
    if (customer.deleted || !customer.metadata?.supabase_user_id) {
      console.error('No user ID found for subscription')
      return
    }
  }

  const priceId = subscription.items.data[0]?.price.id
  const tier = getPlanFromPriceId(priceId)

  const { error } = await supabase
    .from('user_profiles')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_tier: tier,
      subscription_status: subscription.status,
      subscription_started_at: new Date(subscription.created * 1000).toISOString(),
      subscription_ends_at: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
    })
    .eq('stripe_customer_id', subscription.customer)

  if (error) {
    console.error('Error updating subscription:', error)
  }
}

// Handle subscription updated
async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: any
) {
  const priceId = subscription.items.data[0]?.price.id
  const tier = getPlanFromPriceId(priceId)

  const updateData: any = {
    subscription_tier: tier,
    subscription_status: subscription.status,
    subscription_ends_at: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
  }

  // If subscription is canceled, keep tier but mark status
  if (subscription.status === 'canceled') {
    updateData.subscription_tier = 'free'
  }

  const { error } = await supabase
    .from('user_profiles')
    .update(updateData)
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error updating subscription:', error)
  }
}

// Handle subscription deleted/canceled
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: any
) {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      subscription_tier: 'free',
      subscription_status: 'canceled',
      subscription_ends_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error deleting subscription:', error)
  }
}

// Handle successful payment
async function handlePaymentSucceeded(
  invoice: Stripe.Invoice,
  supabase: any
) {
  // Update subscription status to active on successful payment
  if (invoice.subscription) {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: 'active',
      })
      .eq('stripe_subscription_id', invoice.subscription)

    if (error) {
      console.error('Error updating payment status:', error)
    }
  }
}

// Handle failed payment
async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  supabase: any
) {
  // Update subscription status to past_due on failed payment
  if (invoice.subscription) {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: 'past_due',
      })
      .eq('stripe_subscription_id', invoice.subscription)

    if (error) {
      console.error('Error updating payment failure:', error)
    }

    // TODO: Send email notification to user about failed payment
  }
}

// Helper to determine plan from price ID
function getPlanFromPriceId(priceId: string): string {
  if (priceId.includes('1SX6UqL8WdA5h9TH5M4ZSani')) return 'weekly'
  if (priceId.includes('1SrOsHL8WdA5h9THCCzIiwu8')) return 'monthly'
  if (priceId.includes('1SrOscL8WdA5h9THMfzBylno')) return 'annual'
  if (priceId.includes('1SrOctL8WdA5h9THjwD86YVw')) return 'lifetime'
  return 'unknown'
}
