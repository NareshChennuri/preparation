/*

JSON Web Tokens (JWT) are a compact, self-contained means of securely transmitting information between parties as a JSON object. They are commonly used for authentication and authorization in web applications, providing a stateless, token-based mechanism for user identity verification. Let's break down the key components and functionality of JWT:

1. Structure:
========================
A JWT consists of three parts separated by dots: the header, the payload, and the signature.

Header: (metada about the algorithm used)
    Contains metadata about the token, such as the type (JWT) and the signing algorithm being used.
Payload: (user data such as user id role and expiration)
    Contains claims or assertions about the user or entity being authenticated, such as user ID, role, or expiration time.
Signature: (verifies the token that is using with the algorithm)
    Verifies the integrity of the token and ensures that it has not been tampered with. It is created by combining the header, payload, and a secret key using a specified algorithm (e.g., HMAC, RSA).

2. Example:
========================
Here's an example of a JWT:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Payload: eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
Signature: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

3. Authentication:
========================
JWTs are commonly used for authentication by issuing a token to a user upon successful login. The token contains information about the user's identity and privileges.
When a user makes subsequent requests to protected resources, they include the JWT in the request headers (usually in the Authorization header) to prove their identity.
The server validates the JWT by verifying its signature using the secret key, ensuring that it hasn't been tampered with. If the signature is valid, the server can trust the information contained in the token and grant access to the requested resource.

4. Stateless:
========================
JWTs are stateless, meaning the server does not need to store session information for authenticated users. Instead, the necessary information is contained within the token itself.
This simplifies scaling and improves performance since the server does not need to perform database lookups or maintain session state.

5. Expiration and Revocation:
========================
JWTs can include an expiration time (exp claim) to limit their validity period. Once expired, the token is no longer accepted by the server.
To handle scenarios where a user's access needs to be revoked before the token expires (e.g., user logout or account deletion), additional mechanisms may be required, such as maintaining a blacklist of revoked tokens.

6. Flexibility:
========================
JWTs are versatile and can be used in various scenarios beyond authentication, such as information exchange between services, user authorization, and securing API endpoints.

They can also include custom claims to convey additional information as needed.
In summary, JSON Web Tokens provide a secure and efficient method for exchanging information between parties in a web application. By encapsulating user identity and permissions in a digitally signed token, JWTs enable stateless authentication and facilitate secure communication between clients and servers.

*/
