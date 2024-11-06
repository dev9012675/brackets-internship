# Guards and Interceptors

For this task , I have created some very simple routes in src/employees/employees.controller.ts. For each
of these routes, a simple string message is shown on a successful request. I have also implemented the
following:

#### RolesGuard:-

The relevant files are located in src/guards.This guard protects the POST api/employees and the PUT api/employees/:id endpoints. For a successful request, you have to specify your role as admin as shown below. Otherwise, you will get a Forbidden Error.

```json
{
    "name":"Ans",
    "email":"test@gmail.com" ,
    "role": "admin"
    
}
```

For both the above specified endpoints, you have to include a role property and it has to be set to "admin"
for a successful request.

#### LoggingInterceptor:

Located in src/interceptors/logging.interceptor.ts.This interceptor shows the request duration via console.log().

#### TransformInterceptor:- 
 
Located in src/interceptors/transform.interceptor.ts.This interceptor appends the request output and a successful request message into an object and sends it to the client.



