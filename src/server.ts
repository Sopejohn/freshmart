import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import Stripe from "stripe";
import "dotenv/config";

const app = new Hono();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Enable CORS
app.use(
    "/*",
    cors({
        origin: "*",
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
    })
);

// Health check
app.get("/make-server-a8a8d287/health", (c) => {
    return c.json({ status: "ok" });
});

// Create Payment Intent endpoint
app.post("/make-server-a8a8d287/create-payment-intent", async (c) => {
    try {
        const body = await c.req.json();
        const { amount, currency = "usd" } = body;

        console.log(`Creating payment intent for amount: ${amount} ${currency}`);

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
    } catch (error: any) {
        console.error("Error creating payment intent:", error);
        return c.json({ error: error.message }, 400);
    }
});

const port = 8000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});
