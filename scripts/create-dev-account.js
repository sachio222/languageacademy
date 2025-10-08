// Script to create a dev account in Supabase
// Run this once to set up your dev account

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createDevAccount() {
  const devEmail = "dev.user@example.com"; // Use a standard email format
  const devPassword = "DevPassword123!";

  console.log("Creating dev account...");

  const { data, error } = await supabase.auth.signUp({
    email: devEmail,
    password: devPassword,
    options: {
      data: {
        first_name: "Dev",
        last_name: "User",
      },
    },
  });

  if (error) {
    console.error("Error creating dev account:", error.message);
    process.exit(1);
  }

  console.log("✅ Dev account created successfully!");
  console.log("Email:", devEmail);
  console.log("Password:", devPassword);
  console.log(
    "\nYou can now run your app in dev mode and it will auto-login with this account."
  );
}

createDevAccount();
