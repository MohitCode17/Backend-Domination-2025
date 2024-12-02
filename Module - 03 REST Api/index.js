const express = require("express");
const path = require("path");
const fs = require("fs");
const books = require("./books_data.json");

const app = express();

app.use(express.json());

// 👉 Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Book Store API");
});

// 👉 Render All Books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// 👉 Render Book By ID
app.get("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book)
    return res
      .status(404)
      .json({ message: `Book is not found with ID: ${bookId}` });

  res.status(200).json(book);
});

// 👉 Creating a new Book
app.post("/api/books", (req, res) => {
  const bookData = req.body;

  // Check if book exists
  const isBookExist = books.some(
    (book) => book?.title.toLowerCase() === bookData?.title.toLowerCase()
  ); // If one of element in array will be true, isBookExist wil be true

  if (isBookExist)
    return res.status(409).json({ message: "Book is already exists" });

  // Create a books
  books.push({ ...bookData, id: books.length + 1 });

  const dbPath = path.join(__dirname, "books_data.json");
  fs.writeFile(dbPath, JSON.stringify(books), (err) => {
    if (err) throw err;

    return res.status(201).json({ message: "Book Added!" });
  });
});

// 👉 Updating a Book
app.patch("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const updatedBookData = req.body;

  // Find book by Id
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found!" });

  // Updat the book
  books[bookIndex] = { ...books[bookIndex], ...updatedBookData };

  const dbPath = path.join(__dirname, "books_data.json");
  fs.writeFile(dbPath, JSON.stringify(books), (err) => {
    if (err) throw err;

    return res.status(200).json({ message: "Book updated" });
  });
});

// 👉 Delete a Book
app.delete("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);

  // Find a Book
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found!" });

  books.splice(bookIndex, 1);

  const dbPath = path.join(__dirname, "books_data.json");
  fs.writeFile(dbPath, JSON.stringify(books), (err) => {
    if (err) throw err;

    return res.status(200).json({ message: "Book Deleted!" });
  });
});

app.listen(3000, () => console.log("Server running at port 3000."));
