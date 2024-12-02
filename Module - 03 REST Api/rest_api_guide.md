# Let's Start to Build REST API 🚀

Before diving into build a Rest API, Let's understand what it is?

REST, which stands for Representational State Transfer, is an architectural style for designing networked applications. REST APIs are a set of rules and conventions that define how communication occurs between clients and servers over HTTP or HTTPS.

Key principles of RESTful APIs include:

- Client-Server Architecture: The client and server are separate concerns and can evolve independently. This separation allows for more flexibility and scalability.

- Stateless Communication: Communication between the client and server must be stateless, meaning each request from a client must contain all the necessary information to be understood by the server. This simplifies server logic and enhances scalability.

- Uniform Interface: RESTful APIs use a uniform interface, which simplifies and decouples the architecture. This includes resources identified by URIs, the use of standard HTTP methods (GET, POST, PUT, DELETE), and representation of resources (typically in JSON or XML format).

Express.js is a framework for NodeJS that builds on top of Node's HTTP module, providing a more structured and feature-rich environment for building web applications and APIs.

## Book Store API

```
**Challenge - 1

 * Create a GET request for "/api/books" that render all the books in JSON format from books_data.json file.
```

```javascript
app.get("/api/books", (req, res) => {
  res.json(books);
});
```

```
**Challenge - 2

 * Create a GET request for "/api/books/:id" that render the book which matches to "id".
```

```javascript
app.get("/api/books/:id", (req, res) => {
  // console.log(req.params.id);
  const bookId = Number(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book)
    return res
      .status(404)
      .json({ message: `Book is not found with ID: ${bookId}` });

  res.status(200).json(book);
});
```

```
**Challenge - 3

 * Create a POST request for "/api/books" that creates a new book.

 As of now, we did not cover about database, So we'll treat books_data.json as database and perform all CRUD operations into a file.
```

```javascript
app.use(express.json());

app.post("/api/books", (req, res) => {
  // Get book data from user
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
```

When you try to access bookData from req.body. You'll get "undefined" as result.

**_Reason_**

When the data comes from req.body to server, Express doesn't know which types of data comes or how to parse it.

For this, we'll use Middleware, which parse incoming request bodies in different format:

- Express.json Middleware: Parse JSON body
- Express.urlencoded Middleware: Parse form body

Always use middleware before any routes.

```
**Challenge - 4

 * Create a PATCH request for "/api/books/:id" that modify a book details which matches to "id".
```

```javascript
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
```

```
**Challenge - 5

 * Create a DELETE request for "/api/books/:id" that delete a book which matches to "id".
```

```javascript
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
```

---
