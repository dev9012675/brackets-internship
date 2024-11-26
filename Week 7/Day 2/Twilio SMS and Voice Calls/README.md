
# Twilio SMS and Voice in NestJS

For this task, I have created a twilio module , service and controller in the src/twilio directory. I have created two endpoints in the twilio controller one of which sends a SMS message and the other creates a call.


## API Reference

#### Send message

```http
  POST /api/messages/send
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `string` | **optional**. The body of your SMS message |

Creates an SMS message and returns a message indicating that the SMS was sent successfully.

#### Create call

```http
  POST/api/calls
```
Creates a call and returns a message indicating that call was made successfully.





