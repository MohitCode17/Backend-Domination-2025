# Mastery in Express

A comprehensive guide to mastering Express, covering its basics, template engine, routing, and finally start to learn `REST API` development.

---

## What is Express ?

Express.js is a framework for NodeJS that builds on top of Node's HTTP module, providing a more structured and feature-rich environment for building web applications and APIs.

**First Program in Express**:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello From Express Server!");
});

app.listen(3000, () => console.log(`Server running at port 3000`));
```

We often see a three dots below require() syntax, When we hover over it, It give us some warning `"File is a CommonJS module; it may be converted to an ES module"`

**Why It Happens**

Node.js supports both module systems, but you need to specify which one you're using:

- CommonJS: Default in older Node.js projects. Uses require and module.exports.

- ES Modules: Modern standard. Uses import and export. Supported when:
  - Your package.json includes "type": "module", or
  - Your file has a .mjs extension.

**Resolving the Issue**

1. Convert to ES Modules

   If your project prefers modern ES Modules:

- Update your package.json:

  ```json
  {
    "type": "module"
  }
  ```

- Change your syntax:

  Replace `require` with `import`:

  ```javascript
  import moduleName from "module-name";
  ```

- Change your syntax:

  Replace `module.exports` with `export`:

  ```javascript
  export default someVariable;
  ```

---

## Routing in Express

Routing in Express refers to the mechanism of defining the endpoints (URIs) and how the server responds to client requests for those endpoints. It determines how an application responds to a client request for a specific HTTP method (GET, POST, PUT, DELETE, etc.) and URL.

**Basic Example of Routing**

```javascript
import express from "express";

const app = express();

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to home page!");
});

// ABOUT ROUTE
app.get("/about", (req, res) => {
  res.send("This is about page!");
});

// CONTACT ROUTE
app.post("/contact", (req, res) => {
  res.send("Contact form submitted!");
});

// DYNAMIC ROUTE
app.get("/user/:id", (req, res) => {
  const userId = req.params.id; // Extracting the dynamic parameter
  res.send(`User ID is: ${userId}`);
});

// NOT FOUND ROUTE
app.get("*", (req, res) => {
  res.send("404! Page not found.");
});

app.listen(3000, () => console.log(`Server running at port 3000`));
```

**How it Works**

1. HTTP Methods:

   - app.get(): Handles GET requests.
   - app.post(): Handles POST requests.
   - Similarly, app.put(), app.delete(), etc., handle other HTTP methods.

2. Route Path:

   - The first argument of the route method is the path (e.g., /about).
   - It can include parameters (e.g., /user/:id).

3. Callback Function:

   - The second argument is a function that defines what happens when a request matches the specified path and method.
   - It takes req (request) and res (response) objects as arguments.

---

## Middewares in Express

Middleware are funtions that works between the `request` and `response` cycle. Middleware gets executed after the server receives the `request` and before send the `response`.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

An Express application can use the following types of middleware:

- Application-level middleware
- Router-level middleware
- Error-handling middleware
- Built-in middleware(e.g. express.json & express.urlencoded())

### Application Level Middleware

An application level middleware is middleware that is applied globally across all routes or endpoints within a web application.

Example

```javascript
app.use((req, res, next) => {
  const logs = `${Date.now()} - ${req.method} - ${
    req.path
  } new request received\n`;

  fs.appendFile("./log.txt", logs, (err) => {
    if (err) throw err;

    next();
  });
});
```

This middleware function is designed to log information about incoming HTTP requests to a file named "log.txt".
This middleware will executed every time, when user try to access any of the route within the file.

### Route Level Middleware

Route level middleware is middleware that is applied to specific routes or endpoints within a web application.

Example

```javascript
const checkForRole = (req, res, next) => {
  const role = req.query.role;

  if (!role) return res.json({ message: "Please provide a role" });

  if (role === "admin") {
    next();
  } else {
    res.json({ message: "Unauthorized" });
  }
};
```

```javascript
app.get("/get-users", checkForRole, (req, res) => {
  res.json({ id: 1, username: "Virat kohli", profession: "Cricketer" });
});
```

This middleware function named checkForRole checks if the incoming request has a query parameter named "role".

This middleware function ensures that only requests with the "admin" role parameter are allowed to pass through to the next middleware or route handler, otherwise, it returns an "Unauthorized" message.

---

## Server Side Rendering with EJS Template Engine

Server Side Rendering is a technique used in web development where the server generates the full HTML content of a web page and sends it to the client's browser.

Server Side Rendering has several advantages, including improved performance, better search engine optimization (SEO), and enhanced accessibility. It ensures that the user receives the content more quickly since the initial page load includes all the necessary HTML.

Express supports server-side rendering using various template engines.

EJS (Embedded JavaScript) is one such template engine that allows you to embed JavaScript code directly within your HTML markup.

Example

```javascript
import express from "express";
import path from "path";

const app = express();

// 👉 SET STATIC FILE RENDERING MIDDLEWARE
app.set(express.static(path.join(__dirname, "public")));

// 👉 SET EJS AS TEMPLATE ENGINE
app.set("view engine", "ejs");

// ROUTING
app.get("/", (req, res) => {
  // RENDERING HTML CONTENT
  res.render("home", { title: "Home Page" });
});

app.get("/profile", (req, res) => {
  // RENDERING HTML CONTENT
  res.render("profile", {
    title: "Profile Page",
    name: "Mohit Gupta",
    email: "mohit.dev@gmail.com",
    job_title: "Fullstack Developer",
  });
});

app.listen(3000, () => console.log("Server running at port 3000"));
```

**Render Static Content**

Static content refers to files that are served directly to the client without any processing by the server. These can include HTML files, CSS stylesheets, client-side JavaScript files, images, and other types of files that don't change dynamically.

In Express, you can serve static content using the built-in `express.static` middleware. Here's how you can do it:

1. First, create a directory in your project to store your static files, called "public".
2. Place all your static files (HTML, CSS, images, etc.) inside this directory.

```javascript
app.use(express.static(path.join(__dirname, "public")));
```

---
