/*

GraphQL 
 - is a query language for APIs.
 - It allows clients to request only the data they need
 - reducing over-fetching and under-fetching of data.

Key Features;

Hierarchical Query Structure:

GraphQL queries are hierarchical and mirror the structure of the data being requested. This allows clients to specify exactly what data they need, including nested fields and related objects, in a single request.
Strongly Typed Schema:

GraphQL APIs are defined by a schema that explicitly describes the types of data that can be queried. This schema is strongly typed, meaning it provides clear expectations about the shape and structure of data.
Single Endpoint:

Unlike traditional REST APIs that expose multiple endpoints for different resources, GraphQL has a single endpoint for all data queries. This simplifies API management and reduces the number of network requests required by clients.
Precise Data Retrieval:

Clients can request only the data they need, eliminating over-fetching and under-fetching of data commonly associated with REST APIs. This results in more efficient data retrieval and reduced bandwidth usage.
Real-time Updates with Subscriptions:

GraphQL supports real-time updates through subscriptions, allowing clients to subscribe to changes in data and receive updates in real-time. This is useful for applications that require live updates, such as chat apps or real-time dashboards.
Introspection:

GraphQL APIs support introspection, allowing clients to query the schema itself to discover available types, fields, and their descriptions. This makes it easier to explore and understand the API without relying on external documentation.
Batching and Caching:

GraphQL queries can be batched together, enabling more efficient data fetching by reducing the number of round-trips between the client and server. Additionally, GraphQL responses can be cached at various levels to improve performance.
Versionless APIs:

GraphQL APIs are inherently versionless, as changes to the schema can be made without affecting existing clients. Clients can request only the fields they support, and new fields can be added to the schema without breaking existing queries.
Tooling Ecosystem:

GraphQL has a rich ecosystem of tools and libraries for various platforms and languages, including client libraries, server frameworks, development tools, and IDE integrations. This makes it easier for developers to adopt and work with GraphQL in their projects.
Backend Agnostic:

GraphQL is backend agnostic, meaning it can be used with any backend technology or data source. This flexibility allows developers to use GraphQL with existing systems or choose the best backend technology for their specific needs.

*/