import express from "express";
import fs from "fs";

const app = express();

// APPLICATION LEVEL MIDDLEWARE
app.use((req, res, next) => {
  const logs = `${Date.now()} - ${req.method} - ${
    req.path
  } new request received\n`;

  fs.appendFile("./log.txt", logs, (err) => {
    if (err) throw err;

    next();
  });
});

// ROUTE LEVEL MIDDLEWARE
const checkForRole = (req, res, next) => {
  const role = req.query.role;

  if (!role) return res.json({ message: "Please provide a role!" });

  if (role === "admin") {
    next();
  } else {
    res.json({ message: "Unauthorized" });
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to home page!");
});

app.get("/about", (req, res) => {
  res.send("This is about page!");
});

app.post("/contact", (req, res) => {
  res.send("Contact form submitted!");
});

app.get("/get-users", checkForRole, (req, res) => {
  res.json({ id: 1, username: "Virat kohli", profession: "Cricketer" });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id; // Extracting the dynamic parameter
  res.send(`User ID is: ${userId}`);
});

app.listen(3000, () => console.log(`Server running at port 3000`));
