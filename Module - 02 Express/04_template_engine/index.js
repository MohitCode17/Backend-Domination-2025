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
