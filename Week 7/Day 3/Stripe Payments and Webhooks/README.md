# Stripe Payments and Webhooks

In this task, I implemented a simple endpoint which creates a payment intent with the data provided in the request body. Also created a webhook endpoint which responds to **payment_intent.succeeded** and  **payment_intent.payment_failed** events. These endpoints are in the Payments Controller located in the src/payments directory.