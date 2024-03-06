/*

Web attacks are malicious activities that target vulnerabilities in web applications, it's important to take appropriate measures to mitigate such attacks.

Cross-Site Scripting (XSS):
==============================
Attacker injects malicious scripts into web pages to steal sensitive information or to execute unwanted actions.
- Sanitize and also validate user inputs
- we need output encoding, 
- implement content security policies (CSP rules) to prevent unauthorized script execution.
    Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
    img-src 'self' data: https://*.example.com; 
    font-src 'self' https://fonts.gstatic.com; 
    media-src 'self'; 
    object-src 'none'; 
    frame-src 'self' https://www.youtube.com;

SQL Injection:
===========================
Attacker inserts malicious SQL code into user inputs, aiming to manipulate or expose sensitive data from the database.
- Use parameterized queries or prepared statements to prevent SQL injection. 
- avoid concatenating user inputs directly into SQL queries.

Cross-Site Request Forgery (CSRF):
====================================
Forcing users to perform unwanted actions without their consent by tricking them into clicking malicious links.
- implement anti-CSRF tokens to ensure that requests come from legitimate sources. 
- add user authentication for sensitive actions.

    - use HttpClientXsrfModule to send xsrf-cookie header

    //app.config.js
    export const appConfig: ApplicationConfig = {
        providers: [
            importProvidersFrom(HttpClientModule),
            importProvidersFrom(
                HttpClientXsrfModule.withOptions({
                cookieName: 'My-Xsrf-Cookie',
                headerName: 'My-Xsrf-Header',
            })
            ),
        ]
    };

Cross-Origin Resource Sharing (CORS):
========================================
CORS allows web servers to specify which origins are permitted to access their resources and under what conditions. 
CORS provides a way for servers to indicate to browsers that cross-origin requests are allowed and which types of requests are permitted (e.g., GET, POST).

When a web browser makes a cross-origin request (e.g., an XMLHttpRequest or Fetch API call), it includes an "Origin" header in the request indicating the origin of the requesting page. The server, if properly configured, can respond with CORS headers specifying which origins are allowed to access its resources. If the request is allowed, the browser allows the response to be accessed by the requesting page's JavaScript code.

CORS headers include:

Access-Control-Allow-Origin: Specifies the allowed origins, which can be specific domains or the wildcard * to allow any origin.
Access-Control-Allow-Methods: Lists the HTTP methods (e.g., GET, POST, PUT) that are allowed for cross-origin requests.
Access-Control-Allow-Headers: Specifies which headers are allowed in the request.
Access-Control-Expose-Headers: Lists which headers the response can expose to the requesting page.
Access-Control-Allow-Credentials: Indicates whether the browser should include credentials (such as cookies) in the request.

CORS headers are set by the server in its response. Properly configuring CORS headers on the server allows controlled and secure cross-origin communication while adhering to the Same-Origin Policy.

Insecure File Uploads:
===========================
Attack: Uploading malicious files that can be executed on the server to gain unauthorized access or control.
- Validate file types and extensions, restrict file permissions, and use server-side scanning tools to detect malicious content.

Sensitive Data Exposure:
===========================
Attack: Exposing sensitive information like passwords, credit card numbers, or personal data due to weak encryption or insecure storage.
- Encrypt sensitive data at rest and in transit using strong encryption algorithms. Follow best practices for data storage and handling.

Clickjacking:
===========================
Attack: Concealing malicious content or actions behind legitimate-looking UI elements to trick users into performing unintended actions.
- Use the X-Frame-Options header to prevent your site from being embedded in an iframe on other sites. Implement frame-busting techniques.

Security Misconfigurations:
===========================
Attack: Exploiting misconfigured servers, databases, or frameworks to gain unauthorized access to sensitive data or resources.
- Regularly review and update configurations, apply security patches, and follow secure deployment practices.

Unvalidated Redirects and Forwards:
===========================
Attack: Redirecting users to malicious websites by abusing unvalidated input in URL parameters.
- Validate and sanitize URL parameters before using them in redirects. Use a whitelist of safe URLs.

Broken Authentication and Session Management:
===========================
Attack: Exploiting vulnerabilities in authentication mechanisms or session management to gain unauthorized access to user accounts.
- Use strong authentication and password hashing techniques. Implement proper session management with secure cookies and session timeouts.

Insecure Deserialization:
===========================
Attack: Exploiting vulnerabilities in deserialization processes to execute malicious code or manipulate application behavior.
- Use secure deserialization libraries, validate input before deserialization, and avoid serializing and deserializing untrusted data.


To mitigate these attacks effectively, it's crucial to adopt a holistic approach to web security. 
This includes regular security assessments, penetration testing, staying updated on security best practices, using security libraries and frameworks, and fostering a security-conscious development culture within your team.

*/