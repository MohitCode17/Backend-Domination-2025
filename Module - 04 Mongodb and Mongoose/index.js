import express from "express";
import { connectDatabase } from "./db.js";
import mongoose from "mongoose";

const app = express();

// Connect to MongoDB
connectDatabase();

// Book Schema
const bookSchema = new mongoose.schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    default: "English",
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Create a model
const Book = mongoose.model("Book", bookSchema);

// ==============================================================================================================
// **👉ROUTES

app.get("/", (req, res) => {
  res.send("Welcome to Book Store API");
});

// 👉 Render All Books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find(); // Retrieve all books
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 👉 Render Book By ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const book = await Book.findById(bookId);

    if (!book)
      return res
        .status(404)
        .json({ message: `Book is not found with ID: ${bookId}` });

    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch the book", error: err.message });
  }
});

// 👉 Creating a new Book
app.post("/api/books", async (req, res) => {
  const bookData = req.body;

  try {
    // Check if the book already exists (case-insensitive check on title)
    const isBookExist = await Book.findOne({
      title: { $regex: new RegExp(`^${bookData.title}$`, "i") }, // Case-insensitive regex
    });

    if (isBookExist) {
      return res.status(409).json({ message: "Book already exists" });
    }

    // Create and save the book
    const newBook = new Book(bookData);
    await newBook.save();
    res.status(201).json({ message: "Book added!", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error: err.message });
  }
});

// 👉 Updating a Book
app.patch("/api/books/:id", async (req, res) => {
  const bookId = Number(req.params.id);
  const updatedBookData = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      updatedBookData,
      { new: true, runValidators: true } // Options:
      // - new: returns the updated document
      // - runValidators: ensures validation on updated data
    );

    // If the book is not found, return a 404 error
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json({ message: "Book updated", book: updatedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update book", error: err.message });
  }
});

// 👉 Delete a Book
app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json({ message: "Book Deleted!", book: deletedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete book", error: err.message });
  }
});

app.listen(3000, () => console.log(`server running at port 3000`));
