
# Combining APIs in NestJS

For this task, I have integrated the Twilio and Stripe third-party APIs.

## Scenario

A customer is first created. Then, they have to choose between a **Basic** and **Premium** Plan to subscribe to.
After the subscription is created and activated(this part requires a frontend), the customer receives a confirmation message on their provided phone number.

The customer and subscription creation process is accomplished using the **Stripe** API whereas the confirmation message is sent using the **Twilio** API.




## API Reference

#### Create a customer

```http
  POST /api/stripe/create-customer
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `customer` | `CreateCustomerDTO` | **Required**. Data of the customer to be created |

Returns the created customer.

#### Create a subscription

```http
  POST /api/stripe/create-subscription
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `subscription`      | `CreateSubscriptionDTO` | **Required**. Data of the subscription to be created |

Returns the id of the created subscription and the client secret.

#### Webhook

```http
  POST /api/stripe/webhook
```
The purpose of this endpoint is to test whether subscriptions are being activated or not. 

