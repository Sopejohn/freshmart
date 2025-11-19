import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import Stripe from "npm:stripe";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "");

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-a8a8d287/health", (c) => {
  return c.json({ status: "ok" });
});

// Create Payment Intent endpoint
app.post("/make-server-a8a8d287/create-payment-intent", async (c) => {
  try {
    const { amount, currency = "usd" } = await c.req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return c.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return c.json({ error: error.message }, 400);
  }
});

// Sign up endpoint
app.post("/make-server-a8a8d287/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    // Check if user already exists in KV store
    const existingUser = await kv.get(`user:email:${email}`);
    if (existingUser) {
      return c.json({ error: "User with this email already exists" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store user info in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      name,
      role: 'customer',
      createdAt: new Date().toISOString()
    });
    await kv.set(`user:email:${email}`, userId);

    return c.json({
      success: true,
      user: {
        id: userId,
        email,
        name,
        role: 'customer'
      }
    });
  } catch (err) {
    console.log(`Error during signup: ${err}`);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-a8a8d287/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized - No token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: "Unauthorized - Invalid token" }, 401);
    }

    // Get user info from KV store
    const userInfo = await kv.get(`user:${user.id}`);
    if (!userInfo) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user: userInfo });
  } catch (err) {
    console.log(`Error getting user profile: ${err}`);
    return c.json({ error: "Internal server error while fetching profile" }, 500);
  }
});

// Initialize admin user on server startup
async function initializeAdmin() {
  try {
    const adminEmail = "admin@freshmart.com";
    const adminPassword = "Admin@123"; // Default admin password

    // Check if admin already exists
    const existingAdmin = await kv.get(`user:email:${adminEmail}`);
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      user_metadata: { name: "Admin" },
      email_confirm: true
    });

    if (error) {
      console.log(`Error creating admin: ${error.message}`);
      return;
    }

    // Store admin info in KV store
    const adminId = data.user.id;
    await kv.set(`user:${adminId}`, {
      id: adminId,
      email: adminEmail,
      name: "Admin",
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    await kv.set(`user:email:${adminEmail}`, adminId);

    console.log("Admin user created successfully");
    console.log(`Admin credentials - Email: ${adminEmail}, Password: ${adminPassword}`);
  } catch (err) {
    console.log(`Error initializing admin: ${err}`);
  }
}

// Initialize admin on startup
initializeAdmin();

Deno.serve(app.fetch);