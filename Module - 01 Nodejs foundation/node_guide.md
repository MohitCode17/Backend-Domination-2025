# Mastery in Node.js

A comprehensive guide to mastering Node.js, covering its basics, package management, core modules, and event-driven programming.

---

## What is Node.js ?

Node.js is a free, open source, cross-platform JavaScript runtime environment that allow to run JavaScript in the server.

Node.js is built on the top of "The Chrome v8 Engine"

**The Chrome V8 Engine**

The V8 engine is a high performance JavaScript engine, which written in C++ that complies JavaScript code into machine code.

---

## Getting Started with Node.js

### 1. Installing Node.js

- Download Node.js from the official website: [Node.js Download](https://nodejs.org/)
- Verify the installation using:
  ```bash
  node -v
  npm -v
  ```

### 1.2 Installing Code Editor

- Download VS Code Editor: [VS Code Download](https://code.visualstudio.com/)

### 1.3 Installing Postman

- Download Postman for API Testing: [Postman](https://www.postman.com/)

---

## Write your first Program in Node.js

```javascript
console.log("Welcome to Backend Marathon");

let a = 10;
let b = 5;

console.log(a + b);
```

### Running JavaScript with Node.js

We can run program directly on our local machine by installing Node.js.

To run above code, you can open terminal inside a **vs code** by pressing **ctrl+`**.

Run the file using:

```bash
node fileName.js
```

A node.js interactive programming enviroment will be open called **REPL**.

### What is REPL?

REPL stands for "Read-Eval-Print-Loop". It's an interactive programming environment that allows you to enter and execute JavScript codes snippets.

The REPL is useful for experimenting with code, debugging, and testing small snippets of JavaScript.

## Modules System in Node.js

Modules are reusable blocks of code that encapsulate related functionality. They allow you to organize your code into smaller, manageable files making it easier to maintain and reuse.

Node.js by default uses the Common.js module system. Each files is treated as a separate modules, and you can use the `require()` function to import modules and the `module.exports` or `exports` object to export functionality from a module.

### Understanding `module.exports` and `require`

- **`module.exports`:** Export functionalities from one file to use in another.
- **`require`:** Import the exported modules.

Example:

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = {
  add,
  sub,
};
```

```javascript
// index.js
const math = require("./math");

console.log(math.add(18, 2)); // 20
console.log(math.sub(15, 5)); // 10
```

## NPM and Package Management

NPM is a package manager for Node.js packages, or modules.

We can use NPM packages in our files. Basic difference between Node core module and NPM modules that they created by third parties.

### Creating a `package.json` File

The `package.json` file is the heart of any Node project. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.

- Initialize a project with:
  ```bash
  npm init
  ```
- You will be asked a few questions to configure: package.json.

  ```
  - package name: Name of your package
  - version: Can go with default version
  - description: If any
  - entry point: root file (index.js)
  - git repository: If any
  - keyword: If any
  - author: Can be anyone
  ```

### Adding and Removing Dependencies

- Install a dependency:

  ```bash
  npm install <package-name>
  ```

- Remove a dependency:
  ```bash
  npm uninstall <package-name>
  ```

### Understanding Dev Dependencies vs Dependencies

- **Dependencies:** Required for the application to run (e.g., `express`).
- **Dev Dependencies:** Needed only during development (e.g., `nodemon`).
- Install dev dependencies:
  ```bash
  npm install <package-name> --save-dev
  ```

---

## Core Modules in Node.js

### Path Module

Path module is a way to Work with file and directory paths.

- Example:

  ```javascript
  const path = require("path");

  console.log("Directory path: ", path.dirname(__filename)); // Returns the directory part of the provided path.

  console.log("File name:", path.basename(__filename)); // Returns the last portion (filename) of the provided path.

  console.log("file extension:", path.extname(__filename)); // Returns the extension of the file in the provided path.

  const joinPath = path.join("/user", "documents", "node", "projects"); // Joins multiple path segments into a single normalized path.
  console.log("Joined path:", joinPath);

  const resolvePath = path.resolve("user", "documents", "node", "project"); // Resolves a sequence of path segments into an absolute path.
  console.log("Resolve path:", resolvePath);

  const normalizePath = path.normalize("/user/.documents/../node/projects"); //  Normalizes the given path by resolving .. (parent directory) and . (current directory) segments and correcting slashes.
  console.log("Normalize path:", normalizePath);
  ```

### File System (fs) Module

Node.js has a set of built-in modules, One of is file system. The file system module allows you to work with the file system on your computer.

- Example of synchronous way of file handling:

  ```javascript
  const fs = require("fs");
  const path = require("path");

  const dataFolder = path.join(__dirname, "data");
  // console.log(dataFolder); // \Backend Marathon - 2025\Module - 1 Mastery in Node.js\05_fs_module\data

  // 👉 CREATING A FOLDER

  // - existsSync: Returns true if the path exists, false otherwise.
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log("Data folder is created inside a directory.");
  }

  // 👉 CREATING A FILE TO DATA FOLDER
  const filePath = path.join(dataFolder, "example.txt");
  // console.log(filePath); // \Backend Marathon - 2025\Module - 1 Mastery in Node.js\05_fs_module\data\example.txt

  // Synchronous way of creating file.
  fs.writeFileSync(filePath, "Example of creating a file.");
  console.log("Example.txt is created successfully.");

  // 👉 READ A FILE
  const fileContent = fs.readFileSync(filePath, "utf8");
  console.log("Reading a file...");
  console.log(fileContent);

  // 👉 APPEND CONTENT TO EXISTING FILE
  fs.appendFileSync(filePath, "\nThis content added using append method.");
  console.log("File appended successfully.");

  // 👉 COPY A FILE
  fs.copyFileSync(filePath, path.join(dataFolder, "example-copy.txt"));
  console.log("Duplicate file created.");
  ```

- Example of Asynchronous way of file handling:

  ```javascript
  const fs = require("fs");
  const path = require("path");

  // 👉 CREATING A FILE
  const dataFolder = path.join(__dirname, "data");
  const asyncFilePath = path.join(dataFolder, "async-file.txt");

  fs.writeFile(asyncFilePath, "This is async way of create a file.", (err) => {
    if (err) throw err;
    console.log("Async file is created successfully.");

    // 👉 READ FILE CONTENT
    fs.readFile(asyncFilePath, "utf8", (err, data) => {
      if (err) throw err;
      console.log(data);

      fs.appendFile(
        asyncFilePath,
        "\nThis is another line added by async append method.",
        (err) => {
          if (err) throw err;
          console.log("Data appended successfully");
        }
      );
    });
  });
  ```

### HTTP Module

Node.js has built-in module called `HTTP`, which allows Node.js to transfer data over the HTTP protocol.
The `HTTP` module can create an HTTP server that listens to server ports and gives a response back to the client.

- Example:
  ```javascript
  const http = require("http");
  const server = http.createServer((req, res) => {
    res.end("Hello, HTTP Server!");
  });
  server.listen(3000, () => console.log("Server running on port 3000"));
  ```

The function passed into the http.createServer() method, will be executed when someone tries to access the computer on port 3000.

This callback function typically has two parameters: `req` and `res`.

1. `req` stands for "request" and represents the incoming HTTP request made by a client. It contains information about the request, such as the URL, HTTP headers, request method, request body, and other relevant data.

2. `res` stands for "response" and is used to send the HTTP response back to the client. It allows you to set the status code, headers, and the response body that will be sent back to the client.

```
* Challenge

  * Create a HTTP server that logs the requested URL
  * and the time when a user tries to access different routes
  * like home, about, and contact.
```

---

## Event-Driven Programming

### Understanding `EventEmitter` Class

- Explore the `EventEmitter` class to handle events in Node.js.
- Import `EventEmitter`:
  ```javascript
  const EventEmitter = require("events");
  ```

### Creating Custom Events

- Example:

  ```javascript
  const EventEmitter = require("events");
  const eventEmitter = new EventEmitter();

  // Register an event listener
  eventEmitter.on("greet", () => console.log("Hello, Event!"));

  // Emit the event
  eventEmitter.emit("greet");
  ```

## How versioning works in Node.js

In Node.js, versioning typically refers to managing the version of your application or library, as well as the version of Node.js itself.

```
Example: Version - 4.18.2
```

Semantic versioning is a comman convention used for Node.js. It consists of three numbers separated by dots.

```
Major = 4
Minor = 18
Patch = 2
```

- Increment in major version signifies incompatible changes, such as API changes that could break existing functionality.

- Incrementing the minor version indicates backward-compatible additions, like new features.

- Incrementing the patch version suggests backward-compatible bug fixes.

The most commonly used symbol prefixes in Node versioning are:

- ^ (caret): Denotes that the specified version and any minor or patch updates are allowed, but not major updates.

- ~ (tilde): Denotes that the specified version and any patch updates are allowed, but not minor or major updates.

## URL Handling in Node.js

A URL, or Uniform Resource Locator, is a string of characters that provides a reference to a web resource such as a website, a file, an image, or any other resource available on the internet.

```
Example: https://www.example.dev/
```

A typical URL consists of several components:

- Protocol: The protocol used to access the resource. Common protocols include HTTP and HTTPS for web pages.

- Domain name: Identifier or user friendly name of IP Addess of the server. `www.example.dev`

- Path: This specifies the location of the resource on the server's filesystem.

  - `/` specify Root path or Home page,
  - `/about` is path for about page,
  - `/project/1` specify the nested path,

- Query Parameters: These are optional parameters that are appended to the URL to provide additional information to the server. Query parameters are separated from the URL path by a question mark (?) and are in the form of key-value pairs.

  - `/about?userId=1&a=2` after question-mark (?) `?userId=1&a=2` are query parameters.

---
