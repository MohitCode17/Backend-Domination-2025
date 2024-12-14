## What are WebSockets?

WebSockets are a communication protocol that provides a persistent, full-duplex connection between a client and a server. Unlike the traditional request-response model of HTTP, WebSockets enable real-time, two-way communication over a single, long-lived TCP connection.

## Single way Communication vs Two way Communication

**Single way Communication**

Data flows in one direction only, either from the client to the server or from the server to the client.

Example: HTTP Request-Response

- How it works: The client sends a request, and the server responds. After that, the connection is closed.

- Use Case:
  - Static websites.
  - API calls where the client only needs to fetch or send data occasionally.

**Two way Communication**

Data flows in both directions simultaneously and in real-time between the client and server.

Example: WebSockets

- How it works: A persistent connection is established between the client and server. Both can send and receive messages independently over the same connection.

- Use Case:
  - Real-time applications like chat apps, multiplayer games, live notifications, stock market apps.

## Concept of Polling

Polling is a method used in client-server communication where the client repeatedly requests data from the server at regular intervals to check for updates. It's like a client asking the server, "Do you have new data?" at specified time intervals.

**How Polling Works**

1. Client Request: The client sends an HTTP request to the server.

2. Server Response: The server processes the request and sends back a response (new data or an empty response if there's nothing new).

3. Repeat: The client waits for a fixed interval and then sends another request.

**Example: Chat Application**

Imagine a chat app where users send and receive messages.

Without Polling

- You send a message, but you don’t know if the other person has replied unless you manually refresh the chat.

With Polling

1. The client (your app) sends a request to the server every 5 seconds to check for new messages.

2. The server checks if there are any new messages for the user.

3. If new messages exist, the server responds with the new message data. If not, the server responds with an empty message or a "no updates" status.

4. The client updates the chat interface with any new messages received.

5. The cycle repeats at regular intervals.

**Cons:**

1. Inefficient: Many requests may return empty responses, wasting bandwidth and server resources.

2. Delay: Updates depend on the polling interval. For example, if the interval is 5 seconds, there may be a delay of up to 5 seconds before the user sees new messages.

For a real-time chat app, WebSockets is generally the preferred approach because it provides low latency and efficient communication.
