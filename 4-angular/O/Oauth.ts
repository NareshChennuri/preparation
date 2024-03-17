/*
Client Application Registration: The process begins with the client application (such as a web or mobile app) registering itself with the OAuth provider. During registration, the client application is issued a client identifier and optionally a client secret. These credentials are used to authenticate the client application with the OAuth provider.

User Authorization Request: When the client application needs to access a user's resources (such as their profile information or data), it redirects the user to the OAuth provider's authorization endpoint. The request includes the client identifier, requested scope (the specific resources the client application wants to access), and a redirect URI where the user will be redirected after authorization.

User Authentication and Authorization: At the authorization endpoint, the user is prompted to log in to their account with the OAuth provider (if they are not already authenticated). The user is then presented with a consent screen detailing the permissions requested by the client application. The user can choose to grant or deny access to their resources.

Authorization Grant: If the user grants access, the OAuth provider issues an authorization grant to the client application. The type of authorization grant depends on the OAuth flow being used (e.g., Authorization Code Flow, Implicit Flow, Client Credentials Flow). The authorization grant is a credential representing the user's consent to access their resources.

Access Token Request: The client application exchanges the authorization grant for an access token by sending a request to the OAuth provider's token endpoint. The request includes the authorization grant, client credentials, and other required parameters.

Access Token Issuance: The OAuth provider verifies the request and, if valid, issues an access token to the client application. The access token is a short-lived credential that grants the client application permission to access the requested resources on behalf of the user.

Resource Access: The client application includes the access token in API requests to the protected resources (e.g., RESTful APIs) hosted by the OAuth provider. The access token serves as a bearer token, allowing the client application to access the user's resources without revealing the user's credentials.

Token Expiration and Refresh: Access tokens typically have a limited lifespan (expiration time). When an access token expires, the client application can use a refresh token (if provided) to obtain a new access token without requiring the user to re-authenticate. This process is known as token refresh.
*/