# Networking Fundamentals

## 1. OSI Model and TCP/IP Model

Network communication is easier to understand when it is divided into layers. Each layer has a specific role. Two common models are the **OSI model** and the **TCP/IP model**.

![OSI 7-layer model and TCP/IP 4-layer model](diagrams/network-layers.jpg)

### 1.1 Comparison of OSI and TCP/IP

| OSI Model | TCP/IP Model | Main purpose |
|---|---|---|
| Application (Layer 7) | Application | Provides network services to applications. |
| Presentation (Layer 6) | Application | Translates, encrypts and compresses data. |
| Session (Layer 5) | Application | Starts, manages and ends communication sessions. |
| Transport (Layer 4) | Transport | Provides process-to-process data delivery. |
| Network (Layer 3) | Internet | Handles logical addressing and routing. |
| Data Link (Layer 2) | Network Access / Link | Transfers frames over a local network. |
| Physical (Layer 1) | Network Access / Link | Sends raw bits through a physical medium. |

### 1.2 Key Differences

- **OSI** has 7 layers. **TCP/IP** commonly has 4 layers.
- OSI is a reference model. It helps explain how network communication works.
- TCP/IP is a practical model based on the protocols used on the internet.
- The OSI model separates the Session, Presentation and Application layers. TCP/IP groups these functions into its Application layer.
- The OSI Physical and Data Link layers are grouped into the TCP/IP Network Access layer. This layer is also called the Link layer.
- Both models describe how data moves from one device to another.

## 2. The Seven Layers of the OSI Model

The **OSI (Open Systems Interconnection) model** has seven layers. Each layer performs a different task. Together, they describe how data travels across a network.

### 2.1 Layer 7: Application Layer

The Application layer gives the interface between humanand data network. It provides network services to applications. PDU: Data.

**Main functions:**
- Provides services for web browsing, email, file transfer and other network applications.
- Allows applications to request network communication.
- Uses protocols such as HTTP, HTTPS, FTP, DNS and SMTP.

### 2.2 Layer 6: Presentation Layer

The Presentation layer prepares data for the Application layer. It makes sure that data is in a usable format.

**Main functions:**
- Translates data between different formats.
- Encrypts and decrypts data.
- Compresses and decompresses data.
- No particular protocol stack

### 2.3 Layer 5: Session Layer

The Session layer manages communication sessions between applications on different devices. It is responsible for dialog control & synchronization.

**Main functions:**
- Starts and establishes sessions.
- Keeps sessions active and manages communication during them.
- Ends sessions when communication is complete.
- Can help with session recovery and synchronization.

### 2.4 Layer 4: Transport Layer

The Transport layer provides communication between one processes to another. It breaks data into smaller pieces and manages their delivery. PDU: **Segment**

**Main functions:**
- Divides data into segments.
- Uses 16 bit port numbers to identify applications or services.
- Provides connection control, flow control and  error recovery when required.
- Error recovery - retransmission
- Common Protocols: TCP and UDP.

### 2.5 Layer 3: Network Layer

The Network layer delivers packets from host to destination. It determines how data should travel toward its destination. PDU: **Packet**

**Main functions:**
- Uses logical addresses such as IP addresses (32 bit).
- Selects routes for packets - Routing.
- Forwards packets between networks through routers.
- Supports IP and routing protocols.

### 2.6 Layer 2: Data Link Layer

The Data Link layer transfers data between opne hop to another. PDU: **Frames**.

**Main functions:**
- Creates and handles frames.
- Uses physical MAC addresses (48 bits) for local delivery.
- Controls access to the network medium.
- Detects some transmission errors - correction and retransmission.
- Is commonly associated with Ethernet and Wi-Fi link functions.

### 2.7 Layer 1: Physical Layer

The Physical layer sends raw bits through a physical or wireless medium. It deals with the hardware and signal transmission.

**Main functions:**
- Transmits and receives bits.
- Defines electrical, radio or optical signals.
- Specifies cables, connectors, frequencies and data rates.
- Describes the physical connection between devices.

# HTTP, Cookies, Web Caching, Proxy Servers, CDNs, and HTTPS

## 1. What Is HTTP?

**HTTP (Hypertext Transfer Protocol)** is an application-layer protocol. It defines how a client and a server communicate on the Web.

A client is usually a web browser. A server stores or creates resources such as HTML pages, images, videos, and API data.

HTTP follows a **request-response model**:

1. The client sends an HTTP request.
2. The server processes the request.
3. The server sends an HTTP response.
4. The browser processes the response and displays or uses the returned data.

HTTP is **stateless**. Each request is independent. The protocol does not automatically remember what happened in a previous request. Cookies and other application mechanisms are used when a website needs to remember a user or a session.

HTTP is an application-layer protocol. It commonly uses TCP as its transport with HTTP/1.1 and HTTP/2. HTTP/3 uses QUIC, which runs over UDP. HTTPS means HTTP communication protected by TLS.

---

## 2. Understanding a Web URL

A **URL (Uniform Resource Locator)** identifies where a resource can be found and how it should be accessed.

Consider this example:

```text
https://www.example.com:443/products/laptop.html?color=black#reviews
```

The URL contains several parts.

### 2.1 URL Parts

| Part | Example | Meaning |
|---|---|---|
| Scheme / protocol | `https` | Tells the browser which protocol to use. |
| Subdomain | `www` | A name used under the main domain. It is optional. |
| Domain name | `example.com` | The registered domain name in this example. |
| Top-level domain (TLD) | `.com` | The final domain label. |
| Hostname | `www.example.com` | The complete DNS name used to identify the host. |
| Port | `443` | The network port used by the service. |
| Path | `/products/laptop.html` | Identifies the resource or route on the server. |
| File-like name | `laptop.html` | The final path segment. It looks like a file name. |
| Query string | `?color=black` | Sends optional parameters to the server. |
| Fragment | `#reviews` | Points to a section or location within the resource. |

### 2.2 Scheme or Protocol

The scheme is the part before `://`.

Examples:

- `http://` uses HTTP without TLS encryption.
- `https://` uses HTTP protected by TLS.
- `ftp://` is associated with the File Transfer Protocol.

For normal web browsing, the default port is usually `80` for HTTP and `443` for HTTPS. A URL can specify another port explicitly.

### 2.3 Hostname, Domain Name, and Subdomain

The **hostname** identifies the host that the browser wants to contact. It may be a DNS name or an IP address.

In `www.example.com`:

- `www` is a subdomain label.
- `example` is the domain label in this example.
- `.com` is the top-level domain.
- `www.example.com` is the complete hostname.

The word **domain** is sometimes used loosely to mean the complete name. In DNS terminology, a domain can contain several labels and subdomains.

The browser uses DNS to resolve a hostname such as `www.example.com` to an IP address. The browser then connects to the server using that IP address and the required port.

### 2.4 Top-Level Domain (TLD)

A TLD is the final label of a domain name.

Examples:

- `.com` — commonly used by commercial organizations.
- `.org` — commonly used by organizations.
- `.net` — originally intended for network-related organizations.
- `.edu` — used by eligible educational institutions in some registration systems.
- `.gov` — used by government organizations under the applicable registration rules.
- `.bd` — Bangladesh's country-code top-level domain.

A TLD does not prove that a website is safe or trustworthy.

### 2.5 Port

A port identifies the service endpoint on a host.

Common web ports are:

- HTTP: `80`
- HTTPS: `443`

For example, `https://example.com:8443/` asks the browser to connect to port `8443` instead of the default HTTPS port.

### 2.6 Path and File

The path identifies the requested resource or route on the server.

In this example:

```text
/products/laptop.html
```

- `/products/` is a path segment.
- `laptop.html` is the final path segment. It looks like a file name.

A URL path does **not** prove that a real file exists on the server. Many websites use application routes. The server may generate a page dynamically from a database or application code.

### 2.7 Query String

A query string starts with `?`.

Example:

```text
/search?q=networking&page=2
```

Here:

- `q=networking` is one parameter.
- `page=2` is another parameter.
- `&` separates parameters.

Query parameters commonly carry search terms, filters, sorting options, or page numbers. Sensitive information should not normally be placed in a URL because URLs may appear in browser history, logs, analytics, and referrer information.

### 2.8 Fragment

A fragment starts with `#`.

Example:

```text
https://example.com/guide#cookies
```

The fragment may tell the browser to jump to the `cookies` section of the page. The fragment is handled by the browser and is **not sent as part of the HTTP request target**.

### 2.9 Origin

An origin is the combination of:

```text
scheme + hostname + port
```

For example:

```text
https://www.example.com:443
```

The browser uses origins for important security rules. Two pages with different schemes, hostnames, or ports have different origins. A **same-site** relationship is not always the same as a **same-origin** relationship. For example, two subdomains can be same-site but still have different origins.

---

## 3. HTTP Message Types

HTTP communication uses two main message types:

1. **HTTP Request Message** — sent by a client to a server.
2. **HTTP Response Message** — sent by a server to a client.

A browser may send many requests to load one page. For example, it may request the HTML document first, then request CSS files, JavaScript files, images, fonts, and other resources.

> **Important:** The readable examples in the next sections show the HTTP/1.1 message format. HTTP/2 and HTTP/3 carry the same HTTP meaning using binary framing. They are not simply plain-text HTTP/1.1 messages with a different version number.

## 4. HTTP Request Message

An HTTP request tells the server what resource the client wants and what action it wants to perform.

### 4.1 Request Message Format

A simplified HTTP/1.1 request has this structure:

```text
METHOD /path HTTP/version
Header-Name: header value
Another-Header: another value

Optional request body
```

It contains four main parts:

1. **Request line** — contains the method, request target, and HTTP version.
2. **Headers** — provide extra information about the request, client, accepted formats, authentication, and other details.
3. **Blank line** — separates the headers from the message body.
4. **Message body** — optional data sent to the server.

### 4.2 Request Example: GET

```http
GET /products/42 HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: en-US,en;q=0.9
Connection: keep-alive

```

Explanation:

- `GET` is the HTTP method.
- `/products/42` is the requested path.
- `HTTP/1.1` is the HTTP version.
- `Host` identifies the requested host. HTTP/1.1 uses this header to identify the target host.
- `User-Agent` describes the client software. Its contents are not a reliable way to identify a user.
- `Accept` tells the server which response media types the client can handle.
- `Accept-Language` expresses language preferences.
- `Connection` is a connection-management header used in HTTP/1.x. Connection-specific headers are handled differently in HTTP/2 and HTTP/3.
- There is no request body in this example.

### 4.3 Request Example: POST with a Body

```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Content-Length: 42

{"name":"Alex","email":"alex@example.com"}
```

Explanation:

- `POST` asks the server to process the submitted data.
- `Content-Type` describes the format of the request body.
- `Content-Length` gives the body size in bytes when this framing is used.
- The JSON data is the request body.

The exact headers in a real request depend on the browser, application, and HTTP version.

---

## 5. HTTP Methods

An HTTP method describes the purpose of a request. Methods are also called **HTTP verbs**.

| Method | Purpose | Example use |
|---|---|---|
| `GET` | Retrieves a resource. | Load a web page or read product information. |
| `POST` | Submits data for processing. It often creates a resource or causes an action. | Submit a form or create a user. |
| `PUT` | Creates or replaces the target resource with the submitted representation. | Replace a user's profile data. |
| `PATCH` | Applies a partial update to a resource. | Change only a user's phone number. |
| `DELETE` | Requests deletion of a resource. | Delete a comment. |
| `HEAD` | Works like `GET`, but the response has no body. | Check headers or resource metadata. |
| `OPTIONS` | Asks which communication options are available. | Check allowed methods or support for a CORS request. |
| `CONNECT` | Establishes a tunnel to the target server. | Create an HTTPS tunnel through a forward proxy. |
| `TRACE` | Performs a message loop-back test. | Diagnostic use; often disabled for security reasons. |

### 5.1 Safe Methods

A method is **safe** when the client is not asking the server to change application state.

- `GET`, `HEAD`, and `OPTIONS` are safe methods.
- A safe method may still cause normal server-side logging or statistics collection.
- A website should not use `GET` to perform actions such as deleting an account or placing an order.

### 5.2 Idempotent Methods

A method is **idempotent** when repeating the same request has the same intended effect on the server as sending it once.

Examples:

- Sending the same `PUT` request several times should leave the resource in the same final state.
- Sending the same `DELETE` request several times should still leave the resource deleted.
- `GET` is also idempotent because it is not intended to change application state.
- `POST` is not generally idempotent. Repeating it may create multiple records or perform an action more than once.

Idempotency does not mean that every response must be identical. For example, a second `DELETE` request may return `404` after the first one deleted the resource.

### 5.3 Safe, Idempotent, and Cacheable Are Different

These terms describe different properties:

- **Safe:** Does the client request a change to server state?
- **Idempotent:** Does repeating the request have the same intended effect?
- **Cacheable:** May a response be stored and reused under HTTP caching rules?

Do not treat these properties as synonyms. For example, `PUT` is idempotent but not safe. `POST` is not generally idempotent, although some POST responses can be cached under specific conditions.

---

## 6. HTTP Response Message

An HTTP response carries the result of the request. It may contain the requested resource, an error message, a redirect, or other information.

### 6.1 Response Message Format

A simplified HTTP/1.1 response has this structure:

```text
HTTP/version status-code reason-phrase
Header-Name: header value
Another-Header: another value

Optional response body
```

It contains four main parts:

1. **Status line** — contains the HTTP version, status code, and optional reason phrase.
2. **Headers** — provide information about the response and its content.
3. **Blank line** — separates headers from the response body.
4. **Message body** — optional returned data, such as HTML, JSON, an image, or an error message.

### 6.2 Response Example

```http
HTTP/1.1 200 OK
Date: Sun, 08 Nov 2026 00:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 46
Cache-Control: max-age=60

<html><body><h1>Hello World</h1></body></html>
```

Explanation:

- `HTTP/1.1` is the protocol version used by this example.
- `200` is the status code. It means the request succeeded.
- `OK` is the reason phrase. It is human-readable and does not control the meaning of the numeric status code.
- `Date` tells when the response was generated.
- `Content-Type` identifies the media type of the response body.
- `Content-Length` gives the body size in bytes when this framing is used.
- `Cache-Control` gives instructions to HTTP caches.
- The HTML after the blank line is the response body.

### 6.3 Another Response Example: JSON

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/42

{"id":42,"name":"Alex"}
```

`201 Created` means the request successfully created a resource. The `Location` header identifies the new resource in this example.

---

## 7. HTTP Response Status Codes

A status code is a three-digit number. It tells the client the general result of the request.

The first digit identifies the status-code class:

| Range | Class | Meaning |
|---|---|---|
| `1xx` | Informational | The request was received. The process is continuing. |
| `2xx` | Success | The request was successfully handled. |
| `3xx` | Redirection | The client needs to take another action, often by following a redirect. |
| `4xx` | Client error | There is a problem with the request or the requested resource. |
| `5xx` | Server error | The server failed to complete an apparently valid request. |

### 7.1 Common Status Codes

#### 1xx — Informational

| Code | Meaning | Explanation |
|---|---|---|
| `100 Continue` | Continue | The client can continue sending the request body. |
| `101 Switching Protocols` | Switching Protocols | The server is switching to a protocol requested by the client. |

#### 2xx — Success

| Code | Meaning | Explanation |
|---|---|---|
| `200 OK` | OK | The request succeeded. The response usually contains the requested data. |
| `201 Created` | Created | A resource was successfully created. |
| `202 Accepted` | Accepted | The request was accepted for processing, but processing may not be complete. |
| `204 No Content` | No Content | The request succeeded, but there is no response body. |
| `206 Partial Content` | Partial Content | The server returned part of a resource, often for a download. |

#### 3xx — Redirection

| Code | Meaning | Explanation |
|---|---|---|
| `301 Moved Permanently` | Permanent redirect | The resource has a new permanent URL. |
| `302 Found` | Temporary redirect | The resource is temporarily available at another URL. |
| `303 See Other` | See Other | The client should retrieve another resource, commonly with `GET`. |
| `304 Not Modified` | Not Modified | The cached copy is still valid. The server does not need to send the resource body again. |
| `307 Temporary Redirect` | Temporary redirect | The client should follow the redirect and keep the original method. |
| `308 Permanent Redirect` | Permanent redirect | The redirect is permanent and the original method is kept. |

#### 4xx — Client Error

| Code | Meaning | Explanation |
|---|---|---|
| `400 Bad Request` | Bad Request | The request is invalid or cannot be understood. |
| `401 Unauthorized` | Unauthorized | Authentication is required or has failed. |
| `403 Forbidden` | Forbidden | The server understood the request but refuses to allow it. |
| `404 Not Found` | Not Found | The requested resource was not found. |
| `405 Method Not Allowed` | Method Not Allowed | The method is not supported for this resource. |
| `408 Request Timeout` | Request Timeout | The server did not receive the complete request in time. |
| `409 Conflict` | Conflict | The request conflicts with the current state of the resource. |
| `410 Gone` | Gone | The resource is no longer available and this may be permanent. |
| `413 Content Too Large` | Content Too Large | The request content is larger than the server is willing to process. |
| `415 Unsupported Media Type` | Unsupported Media Type | The server does not support the request body's format. |
| `422 Unprocessable Content` | Unprocessable Content | The request format is understood, but its instructions cannot be processed. |
| `429 Too Many Requests` | Too Many Requests | The client has sent too many requests in a given period. |

#### 5xx — Server Error

| Code | Meaning | Explanation |
|---|---|---|
| `500 Internal Server Error` | Internal Server Error | The server encountered an unexpected problem. |
| `501 Not Implemented` | Not Implemented | The server does not support the required functionality. |
| `502 Bad Gateway` | Bad Gateway | A gateway or proxy received an invalid response from an upstream server. |
| `503 Service Unavailable` | Service Unavailable | The server is temporarily unable to handle the request. |
| `504 Gateway Timeout` | Gateway Timeout | A gateway or proxy did not receive a timely response from an upstream server. |

The reason phrase, such as `OK` or `Not Found`, is mainly for people. The numeric status code carries the protocol meaning.

---

## 8. HTTP Cookies

### 8.1 What Is a Cookie?

A **cookie** is a small piece of data that a website asks the browser to store.

The browser may send the cookie back to the website in later requests. This allows a website to remember information between requests.

Cookies are important because HTTP is stateless. Without cookies or another state-management system, a website would not automatically know that two requests came from the same browser session.

Common uses include:

- Keeping a user logged in.
- Remembering a shopping cart.
- Saving language or theme preferences.
- Remembering consent settings.
- Measuring website usage.
- Supporting advertising and analytics.

A cookie usually contains a name and a value. It may also have attributes that control where, when, and how the browser sends it.

### 8.2 Important Cookie Terms

| Term | Meaning |
|---|---|
| Cookie | The small name-value data item and its associated attributes. |
| Cookie jar | The browser-managed collection of cookies. |
| Cookie store / cookie database | The browser's internal storage for cookie records. |
| First-party cookie | A cookie associated with the site the user is visiting. |
| Third-party cookie | A cookie associated with a different site whose content is used by the current page. |
| Session cookie | A cookie without an explicit expiry time. |
| Persistent cookie | A cookie with an expiry time or lifetime. |
| Session ID | A token that a website may store in a cookie to identify a server-side session. |

### 8.3 Why Do Websites Need Cookies?

Imagine logging in to a website.

1. The browser sends the login form to the server.
2. The server checks the username and password.
3. If the login is successful, the server creates a session or another authentication record.
4. The server sends a response with a `Set-Cookie` header.
5. The browser stores the cookie if it accepts the cookie and its attributes.
6. On later matching requests, the browser sends the cookie in a `Cookie` header.
7. The server reads the session token and identifies the logged-in session.

This is how a website can recognize a user across separate HTTP requests.

A secure website normally stores an unpredictable session token in the cookie. The actual session data can remain on the server. The cookie is then a reference to that session, not the user's password.

### 8.4 How a Cookie Is Created and Sent

The server creates a cookie with the **`Set-Cookie` response header**.

Example:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session_id=abc123; Path=/; Secure; HttpOnly; SameSite=Lax

```

The browser checks the cookie and its attributes. If accepted, it stores the cookie in its cookie store.

A website can also create or change cookies through JavaScript using `document.cookie`. JavaScript cannot create an `HttpOnly` cookie. It also cannot read an `HttpOnly` cookie. A server should set sensitive session cookies through the `Set-Cookie` response header so that it can apply `HttpOnly` and other security attributes.

Later, the browser may send it with a matching request:

```http
GET /account HTTP/1.1
Host: example.com
Cookie: session_id=abc123

```

Important points:

- The server uses `Set-Cookie` to ask the browser to store or update a cookie.
- The browser uses `Cookie` to send matching cookie name-value pairs to the server.
- Cookie attributes such as `Secure`, `HttpOnly`, and `SameSite` are not repeated in the `Cookie` request header.
- A browser does not send every cookie to every website. It selects cookies based on their scope, security requirements, expiry, and request context.
- Each cookie should normally be set with its own `Set-Cookie` response header. Do not combine multiple cookies into one comma-separated `Set-Cookie` header.

### 8.5 Cookie Attributes

Attributes control how a cookie is stored and sent.

#### `Domain`

`Domain` controls which hosts can receive a cookie.

```http
Set-Cookie: user_id=42; Domain=example.com
```

This can make the cookie available to `example.com` and its subdomains, subject to browser rules.

If `Domain` is omitted, the cookie is normally **host-only**. It is sent only to the host that set it, not automatically to its subdomains.

A server cannot set a cookie for an unrelated domain. Browsers also apply public-suffix protections to prevent cookies from being set for top-level public suffixes such as `.com`.

#### `Path`

`Path` limits the URL paths for which the browser sends a cookie.

```http
Set-Cookie: cart_id=xyz; Path=/shop
```

The cookie can be sent for matching paths such as `/shop` and `/shop/items`.

`Path` is a sending rule. It is not a strong security boundary between applications on the same host.

#### `Expires`

`Expires` gives a specific expiry date and time.

```http
Set-Cookie: preference=dark; Expires=Wed, 01 Dec 2027 12:00:00 GMT
```

The browser should stop sending the cookie after it expires.

#### `Max-Age`

`Max-Age` gives the cookie lifetime in seconds.

```http
Set-Cookie: preference=dark; Max-Age=604800
```

This example requests a lifetime of seven days.

If both `Max-Age` and `Expires` are present, `Max-Age` takes priority in browsers that follow the standard behavior.

#### `Secure`

```http
Set-Cookie: session_id=abc123; Secure
```

A `Secure` cookie is sent only over secure connections, normally HTTPS. This reduces the risk of the cookie being exposed over unencrypted HTTP.

`Secure` does not protect a cookie from malware or someone who can access the browser's data on the device. It also does not replace `HttpOnly`.

#### `HttpOnly`

```http
Set-Cookie: session_id=abc123; HttpOnly
```

`HttpOnly` prevents normal page JavaScript from reading the cookie through APIs such as `document.cookie`.

The browser can still attach the cookie to matching HTTP requests. This helps reduce the risk of session-cookie theft through some cross-site scripting (XSS) attacks.

`HttpOnly` does not stop an XSS attack from performing actions on the page as the user. It only blocks JavaScript from reading the cookie value through the normal cookie API.

#### `SameSite`

`SameSite` controls whether a cookie is sent in cross-site request situations. It helps protect privacy and reduces some cross-site request forgery (CSRF) risks.

The three common values are:

| Value | Behavior |
|---|---|
| `Strict` | Sends the cookie only in same-site contexts. It provides the strongest cross-site restriction. |
| `Lax` | Allows the cookie in same-site requests and certain top-level cross-site navigations. It blocks many other cross-site uses. |
| `None` | Allows the cookie in cross-site contexts. It must also have the `Secure` attribute. |

Examples:

```http
Set-Cookie: session_id=abc123; SameSite=Strict; Secure; HttpOnly
Set-Cookie: preference=light; SameSite=Lax; Secure
Set-Cookie: embedded_session=xyz; SameSite=None; Secure; HttpOnly
```

For a normal first-party login cookie, `Lax` is often a practical starting point. Some applications need `Strict` or `None` depending on how their sign-in and embedded content work.

Do not rely on a browser's default. Set `SameSite` explicitly. Defaults and third-party-cookie policies can differ between browsers and can change over time.

#### `Partitioned`

```http
Set-Cookie: widget_id=abc; Secure; SameSite=None; Partitioned
```

`Partitioned` is used for **partitioned cookies**, including the CHIPS mechanism supported by browsers that implement it.

A partitioned cookie is stored separately for different top-level sites. For example, an embedded widget may have a separate cookie when it is included on Site A and Site B. This limits cross-site tracking while allowing some embedded services to keep the state they need.

Partitioned cookies require `Secure`. Browser support and policy details should be checked for the target browsers.

#### Cookie Prefixes

Some browsers enforce additional rules for cookie names with special prefixes:

- `__Secure-` requires the cookie to be set from a secure context with the `Secure` attribute.
- `__Host-` has stricter rules. It requires a secure context, `Secure`, `Path=/`, and no `Domain` attribute.

Example:

```http
Set-Cookie: __Host-session=abc123; Secure; HttpOnly; Path=/; SameSite=Lax
```

These prefixes help prevent some unsafe cookie configurations.

### 8.6 Session Cookies and Persistent Cookies

**Session cookies** do not have an `Expires` or `Max-Age` attribute. They are intended to last for the current browser session.

**Persistent cookies** have an expiry time or lifetime. They can remain after the browser is closed and reopened, until they expire or are removed.

The meaning of a browser session is browser-dependent. A browser that restores previous sessions may preserve some session cookies after a restart. Private browsing, browser cleanup settings, and user privacy settings can also affect cookie lifetime.

A website can remove a cookie by setting the same cookie name and scope again with an expiry in the past or a `Max-Age` of zero.

```http
Set-Cookie: session_id=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax
```

To remove a cookie reliably, the deletion response must use the matching cookie scope, especially its name, path, and domain setting.

### 8.7 First-Party and Third-Party Cookies

A **first-party cookie** belongs to the site the user is directly visiting.

Example:

- The user visits `https://shop.example.com`.
- The shop sets a cookie for its own site.
- The browser sends the cookie on later matching requests to the shop.

A **third-party cookie** is associated with a different site that is included in the page.

Example:

- The user visits `https://news.example`.
- The page loads an advertisement or analytics resource from `https://ad-network.example`.
- That external service may try to set or read a cookie in the context of the news page.

Third-party cookies have been widely used for cross-site advertising, tracking, and embedded services. Modern browsers increasingly restrict or block them. The exact behavior depends on the browser, its version, settings, privacy mode, extensions, and cookie attributes.

A site should not assume that third-party cookies will always be available. `SameSite=None; Secure` is required for a cookie intended to be sent in cross-site contexts, but browser privacy policies may still block it. Also remember that same-site and same-origin are different concepts.

### 8.8 Cookie Database and Browser Storage

Cookies are stored by the browser, not automatically in the website's database.

The browser manages a **cookie store**, often called a cookie jar. It keeps cookie values and metadata. Conceptually, a cookie record may contain:

| Field | Purpose |
|---|---|
| Name | Cookie name. |
| Value | Cookie value. |
| Domain / host | Which host or domain can receive it. |
| Host-only flag | Whether it is limited to the exact host. |
| Path | Which request paths can receive it. |
| Expiry time | When it should stop being sent. |
| Secure flag | Whether it is restricted to secure connections. |
| HttpOnly flag | Whether normal JavaScript access is blocked. |
| SameSite value | Cross-site sending policy. |
| Partition key | Top-level site information for a partitioned cookie. |
| Creation and access metadata | Information used by the browser to manage the cookie. |

This table is a **conceptual model**. It is not a universal database schema.

Browsers store profile data in different ways. For example:

- Chromium-based browsers keep cookies inside the browser's user profile data.
- Firefox documents a `cookies.sqlite` file in its profile.
- The actual file name, database format, file location, encryption method, and cleanup behavior can vary by browser, operating system, and version. A browser may also keep some cookie information in memory while it is running. Browser privacy settings can limit cookie lifetimes or remove cookies before their requested expiry.

Each browser profile normally has its own separate cookie store. Different browsers do not automatically share cookies. A normal profile and a private/incognito session also have separate handling.

A user can usually view and remove cookies through browser settings. Developers can inspect cookies through the browser's Developer Tools, often under **Application** or **Storage**, and can inspect `Cookie` and `Set-Cookie` headers under **Network**.

Do not edit the browser's cookie database directly. It is an internal browser data store. Changing it while the browser is running can corrupt data or cause unexpected behavior.

### 8.9 Browser Cookie Store vs. Server Session Database

These are two different things.

**Browser cookie store:**

- Exists on the user's device.
- Stores cookie name-value pairs and attributes.
- Sends matching cookies with requests.
- Is controlled by the browser and user settings.

**Server-side session database or session store:**

- Exists on the server or in a server-side storage service.
- Stores session information such as user ID, login state, expiry, and permissions.
- Uses the session token from the browser cookie to find the matching session.
- Can invalidate a session even when the browser still has the cookie.

Example flow:

```text
Browser cookie store                  Server session store
---------------------                 --------------------
session_id = random-token  -------->  random-token -> user 42
                                      user 42 -> logged in
```

The token should be random and difficult to guess. The server should not trust a user ID or permission value simply because it appears in a client-controlled cookie.

### 8.10 Cookie Limits and Performance

Cookies are designed to store small values, not large files or application databases.

- Browsers enforce limits on cookie size and the number of cookies.
- The exact limits vary between browsers and may change.
- A common practical limit is around 4 KB per cookie, but applications should not depend on one universal limit.
- Cookies are attached to matching requests, so large or numerous cookies increase request-header size.
- Large headers add network overhead and may exceed server or intermediary limits.
- A cookie should contain only the data needed by the application. Large data is usually better stored in a server-side session or an appropriate browser storage API.

### 8.11 Cookies vs. Local Storage and Session Storage

Cookies are not the same as `localStorage` or `sessionStorage`.

| Feature | Cookies | `localStorage` | `sessionStorage` |
|---|---|---|---|
| Automatically sent with matching HTTP requests | Yes | No | No |
| Typical use | Session IDs, preferences, state sent to server | Client-side preferences and data | Temporary tab/session data |
| Expiry | Session or explicit expiry | Usually remains until cleared | Usually limited to the tab's page session |
| JavaScript access | Depends on `HttpOnly` | JavaScript can access it | JavaScript can access it |
| Scope | Domain/host, path, and cookie rules | Origin | Origin and tab session |

Do not store sensitive authentication tokens in JavaScript-accessible storage without carefully considering the XSS risk.

### 8.12 Cookie Security Problems and Related Attacks

Cookies often carry session identifiers. If an attacker steals or misuses a session cookie, the attacker may be able to act as the logged-in user.

#### 1. Session Hijacking

An attacker obtains a valid session cookie and reuses it to impersonate the user.

Possible causes include:

- Sending session cookies over unencrypted HTTP.
- Malware or malicious browser extensions.
- XSS that can read an unprotected cookie.
- Leaked logs, backups, or browser profile data.
- Phishing or unsafe device access.

Defenses:

- Use HTTPS everywhere.
- Set `Secure` and `HttpOnly` on session cookies.
- Use an appropriate `SameSite` policy.
- Rotate session IDs after login and privilege changes.
- Use short and reasonable session lifetimes.
- Revoke sessions after logout, password changes, or suspicious activity.

#### 2. Cross-Site Scripting (XSS)

XSS happens when an attacker causes malicious JavaScript to run in a trusted website's context.

If a session cookie is not `HttpOnly`, the script may read it and send it to the attacker.

Defenses:

- Set `HttpOnly` on sensitive cookies.
- Escape output and validate input correctly.
- Use a Content Security Policy (CSP) where appropriate.
- Keep libraries and application code secure.

`HttpOnly` is not a complete XSS defense. A script that runs on the page may still perform actions as the user even if it cannot read the cookie.

#### 3. Cross-Site Request Forgery (CSRF)

CSRF tricks a browser into sending an unwanted request to a website where the user is already authenticated.

The browser may automatically attach the site's cookie. The server might then mistake the request for an action intentionally made by the user.

Defenses:

- Use `SameSite=Lax` or `SameSite=Strict` where the application allows it.
- Use CSRF tokens for state-changing requests.
- Check the `Origin` header, and use other request-context checks where appropriate.
- Do not use `GET` for state-changing actions.
- Require re-authentication for highly sensitive actions.

`SameSite` helps, but it should not be the only CSRF defense for sensitive applications.

#### 4. Session Fixation

An attacker tries to make a victim use a session ID already known to the attacker. If the victim logs in without receiving a new session ID, the attacker may reuse the known ID.

Defenses:

- Generate a new session ID after successful login.
- Regenerate it after privilege changes.
- Reject untrusted session identifiers.

#### 5. Cookie Tossing and Domain Scope Problems

A subdomain or an unsafe application may set a cookie for a parent domain. This can cause another application on the same domain to receive an unexpected cookie with the same name.

Defenses:

- Avoid broad `Domain` attributes when they are not needed.
- Prefer host-only cookies for sensitive sessions.
- Use the `__Host-` prefix where suitable.
- Use unique cookie names and carefully control subdomains.

#### 6. Cookie Theft from a Device

Someone with access to the device, browser profile, malware, or a compromised extension may obtain cookie data.

Defenses:

- Keep the operating system and browser updated.
- Avoid untrusted extensions and software.
- Protect the user account and device.
- Use short session lifetimes and server-side session revocation.

`Secure` and `HttpOnly` do not protect against every form of local device compromise.

#### 7. Privacy Tracking

Advertising and analytics companies may use cookies to recognize a browser across sites. This can create detailed browsing profiles.

Defenses and controls include:

- Browser tracking protection.
- Blocking or limiting third-party cookies.
- Clearing cookies and site data.
- Using privacy settings and extensions from trusted sources.
- Applying consent and data-protection rules where required.

#### 8. Stale or Incorrect Cookies

Old cookies can cause login problems, incorrect preferences, or conflicts after a website changes its session system.

Possible solutions:

- Clear the affected site's cookies.
- Sign out and sign in again.
- Check cookie expiry and scope.
- Ensure the server uses consistent cookie names and attributes.

### 8.13 Important Cookie Best Practices

For a sensitive login/session cookie, a common secure pattern is:

```http
Set-Cookie: __Host-session=RANDOM_TOKEN; Path=/; Secure; HttpOnly; SameSite=Lax
```

The application should also:

- Use HTTPS for the entire site.
- Generate unpredictable session tokens.
- Keep sensitive session data on the server.
- Rotate session IDs after authentication.
- Set suitable expiry times.
- Invalidate the server-side session on logout.
- Avoid putting passwords or other secrets in cookies.
- Avoid using cookies as a large storage system.
- Check browser behavior for the browsers the application supports.

---

## 9. Web Cache

### 9.1 What Is a Web Cache?

A **web cache** stores copies of HTTP responses so they can be reused later.

For example, when a browser downloads a logo image, it may store a copy. When the user visits another page that needs the same image, the browser may use the cached copy instead of downloading it again.

An HTTP cache stores response information and decides whether a stored response can be reused. Caches can exist in the browser, in a proxy, in a CDN, or in other parts of the delivery path.

### 9.2 Types of Web Cache

#### Browser Cache (Private Cache)

The browser stores resources for that browser profile or user.

Examples:

- HTML pages, depending on cache rules.
- CSS and JavaScript files.
- Images, fonts, and other static resources.

Benefits:

- Faster repeat visits.
- Less data downloaded.
- Lower bandwidth usage.
- Better performance on slower connections.

A browser cache is normally private to that browser user. Other users do not share it.

#### Shared Cache

A shared cache can store a response for reuse by multiple users.

Examples include:

- A forward proxy cache in an organization.
- A reverse proxy cache in front of a website.
- A CDN edge cache.

Shared caches need careful rules. They must not accidentally return one user's private response to another user.

### 9.3 How HTTP Caching Works

A simplified flow is:

1. The browser requests a resource.
2. The browser checks whether it has a usable cached response.
3. If the response is fresh, the browser may use it without contacting the origin server.
4. If it is stale or needs validation, the browser sends a conditional request.
5. The server may confirm that the cached version is still valid or send a new version.

### 9.4 Important Cache Headers

#### `Cache-Control`

`Cache-Control` gives caching instructions.

Examples:

```http
Cache-Control: max-age=3600
Cache-Control: public, max-age=3600
Cache-Control: private, max-age=300
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: public, max-age=3600, s-maxage=86400
```

Common directives:

| Directive | Meaning |
|---|---|
| `max-age=3600` | A response can be considered fresh for 3600 seconds. |
| `public` | The response may be stored by shared caches, subject to the other caching rules. |
| `private` | The response is intended for a private cache, not a shared cache. |
| `no-cache` | The cache may store the response, but must validate it before reusing it. |
| `no-store` | Caches must not store the response. |
| `s-maxage=86400` | Gives a freshness lifetime for shared caches. It overrides `max-age` for those caches. |
| `must-revalidate` | Once stale, the response must be successfully validated before reuse. |

**Important difference:** `no-cache` does not mean "never store." It means the stored response must be validated before reuse. `no-store` is the directive used to prevent storage.

#### `Expires`

`Expires` gives a date and time after which a response is stale. `Cache-Control: max-age` is generally preferred for modern applications.

#### `ETag`

An `ETag` is a validator for a particular version of a resource.

Example response:

```http
HTTP/1.1 200 OK
ETag: "version-123"
Cache-Control: max-age=60

```

When the cached response needs validation, the browser may send:

```http
GET /style.css HTTP/1.1
Host: example.com
If-None-Match: "version-123"

```

If the resource has not changed, the server can return:

```http
HTTP/1.1 304 Not Modified
ETag: "version-123"

```

`304 Not Modified` tells the browser to reuse its stored response body. The server avoids sending the full resource again.

#### `Last-Modified` and `If-Modified-Since`

A server can send `Last-Modified` with the time when a resource was last changed.

The browser can later send that date in `If-Modified-Since`. If the resource has not changed, the server may return `304 Not Modified`.

#### `Vary`

`Vary` tells a cache that certain request headers affect the response representation.

For example:

```http
Vary: Accept-Encoding
```

This means a cache may need separate stored versions for different `Accept-Encoding` request values.

### 9.5 Why Is Web Caching Important?

- **Speed:** Cached resources can be delivered quickly.
- **Lower bandwidth:** Repeated downloads can be avoided.
- **Less server work:** The origin server does not need to generate every response again.
- **Scalability:** A website can serve more users with the same origin capacity.
- **Better user experience:** Pages may load faster, especially on repeat visits.

Caching must be configured carefully. User-specific pages, account details, and sensitive responses should not be shared through public caches unless the application explicitly supports that behavior.

---

## 10. Proxy Server

### 10.1 What Is a Proxy Server?

A **proxy server** is an intermediary. It receives a request from one side and forwards it to another side.

The word proxy means that the server acts on behalf of another system.

There are two main types:

1. Forward proxy.
2. Reverse proxy.

### 10.2 Forward Proxy

A **forward proxy** sits between clients and external servers.

```text
Client / Browser
       |
       v
Forward Proxy
       |
       v
Internet / Website Server
```

The client sends its request to the proxy. The proxy forwards the request to the destination server and returns the response to the client.

Common uses:

- **Access control:** An organization can allow or block access to selected websites.
- **Monitoring:** An organization can record network usage according to its policies and laws.
- **Filtering:** A proxy can block unsafe or unwanted destinations.
- **Shared caching:** It can store commonly requested resources for many users.
- **Network management:** It can control how a group of clients accesses the Internet.
- **Client IP masking:** The destination server may see the proxy's IP address instead of the client's direct IP address. This does not guarantee anonymity.

For HTTPS, a forward proxy can often create a `CONNECT` tunnel. Without authorized TLS inspection, it can forward the encrypted connection but cannot read the protected HTTP contents.

### 10.3 Reverse Proxy

A **reverse proxy** sits in front of one or more origin servers.

```text
Browser / Client
       |
       v
Reverse Proxy
       |
       +------> Web Server 1
       |
       +------> Web Server 2
       |
       +------> Web Server 3
```

The client sends a request to the website. The reverse proxy receives it and forwards it to an appropriate backend server.

The client usually does not communicate directly with the origin server.

Common uses:

- **Load balancing:** Distributes requests across multiple servers.
- **Security:** Hides the origin server's network details and can filter suspicious traffic.
- **TLS termination:** Handles HTTPS connections at the proxy and forwards requests to backend servers.
- **Caching:** Stores static or suitable dynamic responses.
- **Compression:** Compresses responses to reduce transfer size.
- **Routing:** Sends requests to different backend services based on the host or path.
- **High availability:** Can route traffic to healthy servers when another server is unavailable.

### 10.4 Why Are Proxy Servers Important?

Proxy servers help organizations and websites control, protect, and manage traffic.

Forward proxies are mainly used to manage client access to external resources. Reverse proxies are mainly used to manage and protect access to backend servers.

A proxy is a general networking concept. It does not have to be a CDN.

---

## 11. CDN Server

### 11.1 What Is a CDN?

**CDN (Content Delivery Network)** is a distributed network of servers that delivers website content from locations closer to users.

A CDN usually has many **edge servers** or **points of presence (PoPs)** in different regions.

Instead of making every user download every resource from one central origin server, a CDN can serve cached resources from a nearby edge location.

### 11.2 Main CDN Components

| Component | Function |
|---|---|
| Origin server | The main server where the original website content is stored or generated. |
| Edge server | A CDN server close to users. It can serve cached content. |
| Point of Presence (PoP) | A physical or network location where CDN infrastructure is deployed. |
| Cache | Stores eligible copies of resources. |
| CDN routing system | Directs users to an appropriate edge location. |

### 11.3 How a CDN Works

A simplified CDN request flow:

1. The user opens a website that uses a CDN.
2. DNS or the CDN's routing system directs the request to an appropriate CDN edge location.
3. The edge server checks its cache.
4. If the resource is in the cache and is usable, the edge server returns it. This is a **cache hit**.
5. If the resource is missing or stale, the edge server requests it from the origin server, subject to the CDN's rules. This is a **cache miss**.
6. The edge server may store the eligible response.
7. Later users may receive the cached response from that edge location.

### 11.4 What Can a CDN Deliver?

CDNs commonly deliver:

- Images.
- CSS files.
- JavaScript files.
- Fonts.
- Videos and other media.
- Software downloads.
- Other cacheable resources.

Some CDNs also support dynamic request routing, API acceleration, security filtering, and other services. Dynamic or user-specific responses are not automatically safe to cache.

### 11.5 Why Are CDNs Important?

- **Lower latency:** Content can be delivered from a nearby edge server.
- **Faster loading:** Users may not need to contact a distant origin for every resource.
- **Less origin traffic:** The CDN handles many cacheable requests.
- **Lower bandwidth costs:** Repeated content can be served from CDN caches.
- **Scalability:** The distributed network can handle large traffic volumes.
- **Availability:** CDN infrastructure can help keep content available during some origin or traffic problems.
- **Security:** Many CDNs provide DDoS protection, web application firewall features, rate limiting, and TLS services.

A CDN does not make every request local. Cache misses and dynamic requests may still need to reach the origin server.

---

## 12. Proxy Server vs. CDN

A proxy server is a general intermediary. A CDN is a distributed content-delivery system. Many CDN providers use reverse-proxy technology at their edge locations.

| Feature | Proxy Server | CDN |
|---|---|---|
| Main purpose | Forward, filter, control, protect, or route requests. | Deliver content quickly and reliably from distributed locations. |
| Typical position | May sit in front of clients or in front of servers. | Usually sits in front of origin servers as a reverse proxy. |
| Main types | Forward proxy and reverse proxy. | A distributed set of edge servers, usually acting as reverse proxies. |
| Caching | May cache content, but caching is not required. | Caching is a major feature, but not the only feature. |
| Geographic distribution | Not required. | Usually distributed across many regions. |
| Common users | Organizations, networks, application owners, and service providers. | Websites, applications, media services, and large platforms. |
| Main benefits | Access control, privacy features, security, routing, and load management. | Lower latency, less origin load, scalability, and availability. |

### 12.1 Simple Difference

- A **forward proxy** works on behalf of clients.
- A **reverse proxy** works on behalf of servers.
- A **CDN** uses a distributed network of servers to deliver content. Its edge servers commonly behave like reverse proxies.

A CDN can therefore be considered a specialized system that often uses reverse-proxy technology. Not every proxy is a CDN.

---

## 13. HTTPS

### 13.1 What Is HTTPS?

**HTTPS (Hypertext Transfer Protocol Secure)** is HTTP communication protected by **TLS (Transport Layer Security)**.

The URL begins with `https://` when the browser uses HTTPS.

HTTP transfers application data without built-in TLS protection. HTTPS protects HTTP communication while it travels across the network.

HTTPS normally uses port `443` by default.

### 13.2 HTTP vs. HTTPS

| Feature | HTTP | HTTPS |
|---|---|---|
| Full name | Hypertext Transfer Protocol | Hypertext Transfer Protocol Secure |
| Encryption | No TLS encryption by default. | Uses TLS encryption. |
| Data integrity | No TLS integrity protection. | TLS detects unauthorized changes to protected data in transit. |
| Server authentication | Does not provide TLS certificate authentication. | Uses a server certificate to authenticate the server's domain identity. |
| Default port | `80` | `443` |
| URL scheme | `http://` | `https://` |
| Suitable for sensitive data | Not suitable without another secure protection layer. | Designed to protect data in transit. |

### 13.3 What Does HTTPS Protect?

TLS provides three important protections:

#### 1. Confidentiality

The HTTP data is encrypted. A person who captures the network traffic should not be able to read the protected content without the required keys.

This protects information such as:

- Login form data.
- Cookies sent over the HTTPS connection.
- API request and response bodies.
- HTTP headers and URL paths inside the encrypted HTTP traffic.

#### 2. Integrity

TLS detects if protected data is changed during transmission. An attacker should not be able to silently modify the protected message without detection.

#### 3. Authentication

The server presents a digital certificate. The browser checks whether the certificate is valid for the hostname and chains to a trusted Certificate Authority (CA).

This helps the browser confirm that it is communicating with a server authorized for the requested domain.

**HTTPS limitations:** HTTPS does not prove that a website is honest or free from malware. It does not protect a device that is already compromised. It also does not hide all network information. For example, the destination IP address is generally visible to the network, and DNS visibility depends on how DNS is configured.

---

## 14. SSL, TLS, and Digital Certificates

### 14.1 SSL vs. TLS

- **SSL (Secure Sockets Layer)** is an older security protocol.
- **TLS (Transport Layer Security)** is its modern successor.
- Old SSL versions are obsolete and insecure.
- Modern HTTPS uses TLS, not old SSL.

People still commonly say **SSL certificate**, but the accurate modern term is **TLS certificate** or **server certificate**.

A certificate is not the encryption algorithm itself. It helps authenticate the server's identity and public key.

### 14.2 What Is a Digital Certificate?

A digital certificate is an electronic document that connects an identity, such as a website hostname, with a public key.

A web server's certificate commonly contains:

- The website's domain names, usually in the Subject Alternative Name (SAN) field.
- The server's public key.
- The identity of the certificate issuer.
- A validity period.
- The allowed key usage and other certificate extensions.
- The Certificate Authority's digital signature.

Example:

A certificate may state that the public key belongs to `www.example.com`. A trusted CA signs the certificate so that browsers can verify the certificate's authenticity.

### 14.3 Public Key and Private Key

Public-key cryptography uses a key pair:

- **Public key:** Can be shared with others.
- **Private key:** Must remain secret and under the server owner's control.

The server certificate contains the public key. The server keeps the matching private key securely.

The private key is not sent to the browser.

In modern TLS 1.3, the certificate's public key is mainly used to verify the server's digital signature during authentication. A separate key-agreement process creates shared session secrets. The browser does not simply encrypt the full session key with the certificate's public key.

### 14.4 Certificate Authority (CA)

A **Certificate Authority** is an organization trusted to issue and sign digital certificates.

Examples of CA services include Let's Encrypt and commercial certificate providers.

A browser or operating system contains a store of trusted root CA certificates. This store is used when checking a server's certificate chain.

### 14.5 Certificate Chain of Trust

A certificate chain commonly contains three levels:

```text
Trusted Root CA Certificate
          |
          v
Intermediate CA Certificate
          |
          v
Website / Server Certificate
```

- **Root certificate:** A trust anchor included in the browser or operating system's trusted certificate store.
- **Intermediate certificate:** A certificate signed by a trusted root or another intermediate CA. It is used to issue website certificates.
- **Server certificate:** The certificate presented by the website for its hostname.

The browser checks the signatures from the server certificate through the intermediate certificates to a trusted root.

The server normally sends its certificate and the necessary intermediate certificates. The root certificate is usually already trusted by the browser or operating system.

---

## 15. How a TLS Certificate Is Issued

A simplified certificate-issuance process is:

1. The website owner creates a public/private key pair.
2. The website owner creates a **CSR (Certificate Signing Request)**. It includes the public key and the requested domain information.
3. The website owner sends the CSR to a Certificate Authority.
4. The CA verifies control of the requested domain. The exact validation method depends on the certificate and CA process.
5. The CA creates and digitally signs the certificate.
6. The website owner installs the certificate and required intermediate certificates on the server or TLS-terminating service.
7. The private key remains securely stored by the website owner or service that operates TLS.

A CA should not need the website's private key to issue a normal server certificate. The private key must remain secret.

### 15.1 Common Certificate Validation Types

- **Domain Validation (DV):** Confirms control of the domain. It is commonly used for normal websites.
- **Organization Validation (OV):** Includes checks about the organization requesting the certificate.
- **Extended Validation (EV):** Applies additional organization checks under the relevant CA rules.

These types do not mean that one HTTPS connection uses stronger encryption than another. TLS configuration determines the cryptographic protection. A certificate also does not prove that the website's business or content is trustworthy.

---

## 16. Full HTTPS / TLS Connection Process

The process below describes a simplified **TLS 1.3** handshake using certificate-based server authentication and ephemeral key agreement. Real connections may use session resumption or other options.

### Step 1: The User Opens an HTTPS URL

The browser receives a URL such as:

```text
https://www.example.com
```

The browser needs to connect to the server for `www.example.com` using HTTPS.

### Step 2: DNS Resolution

The browser or operating system resolves the hostname to an IP address using DNS, unless a usable result is already available in a cache.

### Step 3: Establish the Transport Connection

For HTTP/1.1 and HTTP/2 over TLS, the browser normally establishes a TCP connection first. TLS then runs over that connection.

For HTTP/3, the browser uses QUIC over UDP. QUIC integrates the TLS 1.3 handshake into its connection setup.

### Step 4: ClientHello

The browser sends a TLS message called `ClientHello`.

It includes information such as:

- Supported TLS versions.
- Supported cryptographic options.
- A random value.
- Key-share information for key agreement.
- Extensions, which may include the intended hostname through SNI.

The browser is telling the server which security options it can use.

### Step 5: ServerHello

The server selects compatible security parameters and sends `ServerHello`.

It provides its key-share information. Together, the client's and server's key shares allow both sides to calculate shared secret material using a key-agreement algorithm such as ephemeral Diffie-Hellman (for example, ECDHE).

The shared secret is not sent directly across the network.

### Step 6: Server Sends Its Certificate and Proof

The server sends TLS handshake messages that include:

- `EncryptedExtensions` — negotiated connection extensions.
- `Certificate` — the server's certificate chain.
- `CertificateVerify` — a digital signature that proves the server has the private key corresponding to the certificate's public key.
- `Finished` — a message that verifies the handshake so far and confirms key possession.

In TLS 1.3, handshake messages after `ServerHello` are encrypted using keys derived during the handshake.

### Step 7: Browser Validates the Certificate

The browser checks several things:

1. **Trusted chain:** Does the certificate chain lead to a trusted root CA?
2. **Hostname:** Does the certificate cover the requested hostname, such as `www.example.com`?
3. **Validity:** Is the certificate currently within its valid time period?
4. **Signatures:** Are the certificate signatures valid?
5. **Usage and constraints:** Are the certificate's key usage and other constraints suitable for server authentication?
6. **Revocation and policy checks:** Does the browser's certificate-validation process find a relevant revocation or policy problem?

If important checks fail, the browser may show a security warning or stop the connection.

### Step 8: Shared Session Keys Are Derived

The browser and server use the key-agreement result and the handshake transcript to derive cryptographic secrets.

They independently derive matching traffic keys. These keys are used to encrypt and authenticate data in each direction.

Modern TLS uses symmetric encryption for application data because it is efficient. Key derivation and authentication establish the secure connection.

### Step 9: Client Finished

The browser sends its `Finished` message. This confirms that it has completed the handshake and derived the correct handshake secrets.

The server verifies the message.

### Step 10: Encrypted HTTP Communication Begins

The TLS connection is ready for application data.

The browser sends HTTP requests through the protected connection. The server sends HTTP responses through the same protected connection.

The application data is encrypted and integrity-protected using the negotiated traffic keys and authenticated-encryption algorithms.

### 16.1 Simplified TLS 1.3 Flow

```text
Browser / Client                         Web Server
       |                                      |
       |---------- ClientHello -------------->|
       |                                      |
       |<--------- ServerHello ---------------|
       |<------ EncryptedExtensions ----------|
       |<--------- Certificate ---------------|
       |<------ CertificateVerify ------------|
       |<----------- Finished ----------------|
       |                                      |
       |  Browser validates certificate       |
       |  and derives traffic keys             |
       |                                      |
       |------------ Finished --------------->|
       |                                      |
       |<==== Encrypted HTTP requests ========>|
       |<==== Encrypted HTTP responses =======>|
       |                                      |
```

This is a learning diagram, not a complete packet-level trace. Some handshake messages and connection steps can vary depending on TLS version, transport, and session-resumption settings.

### 16.2 How HTTPS Makes Communication Secure

The complete security idea is:

1. The certificate helps the browser authenticate the server's domain identity.
2. The key-agreement process allows the browser and server to derive shared secret keys without sending those secrets directly.
3. TLS derives separate traffic keys for communication in each direction.
4. Symmetric authenticated encryption protects HTTP data from being read or modified in transit.
5. Handshake verification helps detect tampering with the handshake itself.

This protects the connection against common network attacks such as passive eavesdropping and unauthorized message modification.

---

## 17. Additional HTTPS Concepts

### 17.1 HTTPS Does Not Mean the Website Is Trustworthy

A valid certificate means that the browser has verified the domain identity according to its certificate rules. It does not mean:

- The business is honest.
- The website has no malware.
- Every download is safe.
- The website will protect data after it reaches the server.
- The server itself has not been compromised.

Users should still check the domain name and be careful with suspicious links.

### 17.2 Mixed Content

Mixed content occurs when an HTTPS page loads some resources over insecure HTTP.

For example:

```text
Main page: https://example.com
Image:     http://example.com/image.png
```

The HTTP resource is not protected by the page's TLS connection. Browsers may block or upgrade some mixed-content requests depending on the resource type and browser policy.

Websites should load all resources securely.

### 17.3 HSTS

**HSTS (HTTP Strict Transport Security)** is a response policy that tells a browser to use HTTPS for future visits to a site for a specified period.

Example:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

This example asks the browser to remember the HTTPS-only rule for one year and to apply it to subdomains.

HSTS helps prevent certain downgrade and accidental HTTP connection problems. It does not replace a valid TLS certificate.

### 17.4 TLS Termination at a CDN or Reverse Proxy

A website may use a CDN or reverse proxy to handle HTTPS.

In that design:

1. The browser establishes a TLS connection to the CDN or reverse proxy.
2. The CDN or proxy decrypts the incoming request at its edge.
3. It forwards the request to the origin server.
4. The edge-to-origin connection may use another TLS connection, depending on configuration.

The encryption is therefore applied to each connection segment. For sensitive systems, the connection from the CDN or proxy to the origin should also be protected and correctly authenticated.

---

## 18. Quick Revision

| Topic | Key point |
|---|---|
| HTTP | An application-layer request-response protocol. |
| URL | Identifies a resource and how to access it. |
| HTTP request | Sent by a client to ask for an action or resource. |
| HTTP response | Sent by a server with the result of the request. |
| HTTP method | Describes the purpose of a request, such as `GET` or `POST`. |
| Status code | Three-digit result code, grouped into `1xx` through `5xx`. |
| Cookie | Small browser-stored data sent with matching requests. |
| Cookie jar | The browser's managed collection of cookies. |
| Browser cookie store | Browser-profile storage for cookie records. |
| Server session store | Server-side session data identified by a session token. |
| Web cache | Stores reusable responses to reduce repeated downloads. |
| Forward proxy | Acts on behalf of clients. |
| Reverse proxy | Acts in front of origin servers. |
| CDN | Uses distributed edge servers to deliver content close to users. |
| HTTPS | HTTP protected by TLS. |
| TLS certificate | Connects a domain identity with a public key. |
| Certificate Authority | Trusted organization that issues and signs certificates. |
| TLS handshake | Negotiates security parameters, authenticates the server, and derives traffic keys. |

---

## 19. References and Further Reading

The following sources provide standards and browser documentation for deeper study:

1. [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
2. [IETF RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
3. [IETF RFC 9112 — HTTP/1.1 Message Syntax](https://www.rfc-editor.org/rfc/rfc9112.html)
4. [MDN — HTTP Request Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
5. [IETF RFC 9111 — HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)
6. [MDN — Using HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
7. [MDN — `Set-Cookie` Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)
8. [MDN — Third-Party Cookies](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies)
9. [MDN — Proxy Servers and Tunneling](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Proxy_servers_and_tunneling)
10. [Cloudflare — CDN Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/cdn/)
11. [Mozilla — Secure Website Certificates](https://support.mozilla.org/en-US/kb/secure-website-certificate)
12. [IETF RFC 9846 — TLS 1.3](https://www.rfc-editor.org/rfc/rfc9846.html)
13. [Chromium — User Data Directory](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/user_data_dir.md)
14. [Mozilla — Firefox Profile Data Files](https://support.mozilla.org/en-US/kb/about-your-important-data-and-their-files)
15. [MDN — URL API and URL Components](https://developer.mozilla.org/en-US/docs/Web/API/URL)
16. [MDN — Third-Party Cookies and Partitioned Cookies (CHIPS)](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies/Partitioned_cookies)


