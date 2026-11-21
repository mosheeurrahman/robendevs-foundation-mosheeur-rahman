# Backend


## 1. **What is an API?**
API stands for Application Programming Interface. It is a way for two software applications to communicate with each other and exchange information.
<br>
**Why are APIs important?**
1. Communication: They allow the frontend and backend to communicate.
2. Data exchange: They allow applications to send and receive data.
3. Security: The backend controls how users access data instead of exposing direct database access.
4. Integration: They allow your application to communicate with external services, such as Cloudinary, payment gateways, and Google Maps.
5. Separation: Frontend and backend can be developed independently.

### 1.1 **API জীবনচক্র**
Here I tried to postmortem an request and find the steps it traverse. But It can be different for some different request. Moro or less this is the general lifecycle of an API request.

1. **URL Entry:** User enters a URL in the browser.

2. **URL Parsing:** Browser identifies the protocol (HTTPS), domain name, port (if specified), and path.

3. **Browser Cache Check:** Browser checks whether required resources are already cached.

4. **DNS Lookup:** DNS translates the domain name into the server's IP address.

5. **Network Routing:** Data packets travel through the router and internet toward the destination server.

6. **TCP/QUIC Connection:** Browser establishes a network connection with the server.

7. **TLS Handshake:** Browser and server establish a secure, encrypted connection for HTTPS.

8. **HTTP Request:** Browser sends an HTTP request to load the webpage.

9. **Server Infrastructure:** CDN, load balancer, and reverse proxy may process or forward the request.

10. **Web Server:** Server returns the frontend files, such as HTML, CSS, and JavaScript.

11. **Browser Rendering:** Browser parses HTML and CSS, executes JavaScript, and renders the webpage.

12. **Frontend Execution:** React application starts running and prepares the user interface.

13. **API Request:** Frontend sends an HTTP request to the backend API using `fetch` or Axios.

14. **CORS and Authentication:** Browser handles CORS rules; backend can verify cookies or authentication tokens.

15. **Backend Server:** API request reaches the backend application through its network endpoint.

16. **Middleware Processing:** Middleware handles logging, authentication, authorization, validation, and other common operations.

17. **Routing:** Backend router matches the HTTP method and URL with the appropriate endpoint.

18. **Controller:** Controller receives the request and calls the required service.

19. **Service Layer:** Service executes the application's business logic.

20. **Repository Layer:** Repository handles communication with the database.

21. **Database Connection:** Backend obtains a connection from the database connection pool.

22. **SQL Query Execution:** Database parses, plans, and executes the SQL query.

23. **Database Response:** Database returns the requested records to the backend.

24. **Backend Data Processing:** Service processes the database results and applies business rules.

25. **Controller Response:** Controller prepares the HTTP response, usually in JSON format.

26. **HTTP Response:** Backend sends the response with an appropriate status code, headers, and response body.

27. **Network Return:** Response travels back through the server infrastructure and internet to the browser.

28. **Frontend Response Handling:** Frontend receives the response and converts JSON into JavaScript data.

29. **State Update:** React state is updated with the received data.

30. **UI Re-rendering:** React updates the necessary components, and the user sees the latest information.

### 1.2 **API Methods**
| Method      | Purpose                                              | Example                     | Idempotency    |
| ----------- | ---------------------------------------------------- | --------------------------- |----------------|
| **GET**     | Retrieve data from the server.                       | Get all employees           | Yes            |
| **POST**    | Create a new resource.                               | Add a new employee          | No             |
| **PUT**     | Replace an existing resource completely.             | Update all employee details | Yes            |
| **PATCH**   | Partially update an existing resource.               | Update employee's name only | Not guaranteed |
| **DELETE**  | Delete an existing resource.                         | Delete an employee          | Yes            |
| **HEAD**    | Retrieve response headers without the response body. | Check resource metadata     | Yes            |
| **OPTIONS** | Check which communication methods are supported.     | Check allowed HTTP methods  | Yes            |

**What is Idempotency?**<br>
An HTTP method is idempotent when making the same request multiple times has the same intended effect on the server as making it once.
### 1.3 **Status Code**
HTTP status codes indicate the result of an HTTP request. They are grouped into five categories.
| Category                | Meaning                                             |
| ----------------------- | --------------------------------------------------- |
| **1xx – Informational** | Request received; processing continues.             |
| **2xx – Success**       | Request successfully processed.                     |
| **3xx – Redirection**   | Further action is required to complete the request. |
| **4xx – Client Error**  | Problem with the client's request.                  |
| **5xx – Server Error**  | Server failed to process a valid request.           |

## 2. **GraphQL**
I read this [GraphQL Blog](https://www.ibm.com/think/topics/graphql) to learn what actually it is. RESTful approach required multiple round trips to different API endpoints to fetch all necessary query. A GraphQL architecture’s declarative data-fetching features revolve around several key components and processes, each playing a unique role in data handling and processing.

**How It Works? The 4 Main Parts:**
1. Schemas: The blueprint. It defines what kind of data exists and what questions an app is allowed to ask.
2. Resolvers: The workers behind the scenes. They actually go grab the requested data from databases, cloud services, or other sources.
3. Queries: How an app reads or fetches data. The data comes back in the exact same structure as the request.
4. Mutations: How an app changes data (creating, updating, or deleting it). Unlike some queries, mutations always require authentication (like an API token).

## 2. **RPC(Remote Prosedure Call) & gRPC**

### **2.1. RPC (Remote Procedure Call)**
**RPC** stands for **Remote Procedure Call**. It is a communication technique that allows one application to call a function or procedure running on another computer or server as if it were a local function.
<br>
**How it works:**

1. Client calls a remote function with required parameters.
2. RPC system converts the function call into a network request.
3. Server receives the request and executes the function.
4. Server sends the result back to the client.
5. Client receives the result as if the function returned it locally.

**Example:**
Suppose a frontend needs employee information. It calls: <br>
`getEmployee(10)` <br>
The function actually runs on the backend server, retrieves employee ID 10 from the database and returns the result.

### **2.2 gRPC (Google Remote Procedure Call)**

**gRPC** is a high-performance, open-source RPC framework originally developed by Google. It allows applications written in different programming languages to communicate with each other using remote procedure calls.

**Features:**

1. **HTTP/2:** Uses HTTP/2 for efficient communication, multiplexing, and streaming.
2. **Protocol Buffers:** Uses Protocol Buffers (Protobuf) as its default data serialization format instead of JSON. It produces compact binary messages.
3. **Code Generation:** Automatically generates client and server code from `.proto` definitions.
4. **Streaming:** Supports client-to-server, server-to-client, and bidirectional streaming.
5. **Multi-language Support:** Supports languages like JavaScript, Python, Java, Go, and C#.

## 3. **JWT, Access Token, Refresh Token**

## 4. **Rate Limiting**
**Rate limiting** is a technique used to control how many requests a client can send to a server within a specific time. It protects APIs from excessive requests and server overload. For example, an API may allow a user to make **100 requests per minute**. After reaching the limit, additional requests are rejected. We usually use HTTP status code `429 Too Many Requests`.
<br>
Some Methods to implement Rate Limiting:

### **4.1 Fixed Window**
It divides time into fixed intervals and counts requests within each interval. <br>
**How it works:**
- Set a request limit, such as 100 requests per minute.
- Count requests during each one-minute window.
- Reset the counter when the next window begins.
- Reject requests when the limit is reached.

The main limitation is a client can send 100 requests at 10:00:59 and another 100 at 10:01:00. This allows 200 requests within just two seconds.

### **4.2. Sliding Window**

It trcks requests over a continuously moving time period instead of using fixed time boundaries.<br>
**How it works:**
- Set a limit, such as 100 requests per minute.
- When a new request arrives, check how many requests were made during the previous 60 seconds.
- Allow the request if the limit has not been reached.
- Reject it otherwise.

**Example:** At 10:01:30, the system checks requests made between 10:00:30 and 10:01:30. It prevents sudden request spikes at fixed window boundaries and provides smoother rate limiting.

### **4.3 Token Bucket**

It uses a bucket containing tokens. Each incoming request must consume one token.<br>
**How it works:**
- The bucket has a maximum token capacity.
- Tokens are added at a fixed rate.
- Each request consumes one token.
- If tokens are available, the request is accepted.
- If the bucket is empty, the request is rejected or delayed.

**For Example:**
- Bucket capacity: 10 tokens.
- Token refill rate: 1 token per second.
- Each request consumes 1 token.
