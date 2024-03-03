/*

sessionStorage and localStorage are web storage options that we have in browsers, 
we can store key-value pairs of data on the client side. 

main difference is the lifespan and the accessibility of data

sessionStorage:
------------------------
Lifespan: until the tab closes, and the data can't be accessed outside of the tab.

Ideal for storing temporary data that is relevant only during the user's interaction with the current page or session.

Example Usage:

// Store data in sessionStorage
sessionStorage.setItem('key', 'value');

// Retrieve data from sessionStorage
const data = sessionStorage.getItem('key');

localStorage:
------------------------
Lifespan: persists even after browser tab is closed, until you explicitly clears the data, data is scoped with the domain name, can be accessed outside of the tab across the same origin / domain.


Data stored in localStorage persists even after the browser is closed and reopened. It remains until explicitly cleared or the user clears their browser data.
Scope:

The data is accessible across all tabs or windows from the same origin. It provides a shared storage space for the entire domain.
Use Case:

Suitable for long-term storage of data that needs to be retained across sessions.
Example Usage:

javascript
Copy code
// Store data in localStorage
localStorage.setItem('key', 'value');

// Retrieve data from localStorage
const data = localStorage.getItem('key');
Considerations:
Storage Limit:

Both sessionStorage and localStorage have storage limits (usually around 5-10 MB per domain). Exceeding these limits can lead to errors.
Data Type:

Both storage options store data as strings. When storing non-string data types, you need to convert them to strings using methods like JSON.stringify before storage and JSON.parse when retrieving.
Security:

Be cautious about storing sensitive information on the client side, as both sessionStorage and localStorage are accessible by JavaScript on the client. Avoid storing sensitive information or use proper encryption techniques if necessary.
Compatibility:

Both sessionStorage and localStorage are widely supported in modern browsers. Ensure compatibility with your target audience and consider fallback mechanisms for older browsers.


**/