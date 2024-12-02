const http = require("http");
const fs = require("fs");
const path = require("path");

// Ensure the log directory exists
const logDir = path.join(__dirname, "log");

if (!fs.existsSync(logDir)) {
  fs.mkdir(logDir, (err) => {
    if (err) throw err;
  });
}

const logFilePath = path.join(logDir, "log.txt");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    // Skip logging for favicon requests
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  const log = `${Date.now()} - ${req.url} New request received\n`;

  fs.appendFile(logFilePath, log, (err) => {
    if (err) throw err;

    switch (req.url) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Home Page");
        break;
      case "/about":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hyy there, I'm Mohit");
        break;
      case "/contact":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Mail at: mohit@gmail.com");
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 page not found!!");
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
