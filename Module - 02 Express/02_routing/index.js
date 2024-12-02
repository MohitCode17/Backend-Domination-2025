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
