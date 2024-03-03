/*

API Methods:

GET:
------------
Used to retrieve resource representations.
Should not have side effects on the server.

POST:
------------
Used to create new resources or trigger actions.
Can have side effects and is not idempotent.

PUT:
------------
Typically used to update existing resources.
Should be idempotent - multiple identical requests have the same effect as a single request.

PATCH:
------------
Similar to PUT but used for partial updates to resources.
Should also be idempotent if possible.

DELETE:
------------
Used to delete resources.
Should be idempotent - deleting a resource multiple times has the same effect as deleting it once.

Idempotence:
------------
Idempotent operations are those that produce the same result regardless of how many times they are executed.
In the context of HTTP methods, an idempotent method is one where the result of a successful performed action remains the same even if the action is performed multiple times.

GET, PUT, and DELETE are typically idempotent. POST requests are not idempotent because multiple identical requests can lead to different results (e.g., creating multiple resources).



HTTP Status Codes:
==========================
1xx Informational:
------------
Indicates that the request has been received and the process is continuing.
Example: 100 Continue.

2xx Success:
------------
Indicates that the request was successful.
Example: 200 OK, 201 Created.

3xx Redirection:
------------
Indicates that further action needs to be taken to complete the request.
Example: 301 Moved Permanently, 302 Found.

4xx Client Error:
------------
Indicates that there was a problem with the request (e.g., invalid syntax, unauthorized).
Example: 400 Bad Request, 401 Unauthorized, 404 Not Found.

5xx Server Error:
------------
Indicates that the server failed to fulfill a valid request.
Example: 500 Internal Server Error, 503 Service Unavailable.



*/
