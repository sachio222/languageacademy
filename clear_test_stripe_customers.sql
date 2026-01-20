-- Clear test Stripe customer IDs so new live customers can be created
UPDATE user_profiles 
SET stripe_customer_id = NULL 
WHERE stripe_customer_id IS NOT NULL;
