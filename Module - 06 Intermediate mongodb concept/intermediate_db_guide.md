## What is Aggregation Pipeline ?

The aggregation pipeline in MongoDB is a powerful framework for data processing and analysis. It allows you to perform operations on documents in a collection, such as filtering, transforming, grouping, and sorting, in a sequence of stages, where the output of one stage serves as the input to the next.

### Key Features of the Aggregation Pipeline

1. Multiple Stages: Each stage performs a specific operation, such as filtering or grouping data.
2. Efficient: Operations are executed in-memory, and indexes can be leveraged where possible.
3. Flexible: Supports a wide range of transformations and computations.

### Common Aggregation Stages

1. `$match`: Filters documents based on a condition (similar to find).
2. `$project`: Shapes the output by including, excluding, or computing new fields.
3. `$group`: Groups documents by a specific field and computes aggregated values like sum, avg, max, etc.
4. `$sort`: Sorts the documents by a specified field.
5. `$limit`: Limits the number of documents returned.
6. `$skip`: Skips a specified number of documents.
7. `$unwind`: Deconstructs an array field from documents into multiple documents.
8. `$lookup`: Performs joins with other collections.
9. `$addFields`: Adds or modifies fields in documents.

## Document References in MongoDB

In MongoDB, document references allow you to create relationships between documents in different collections. This is a common approach in a NoSQL database to establish relations without embedding data.

For example, if you have two collections, Books and Authors, a reference can link a book to its author.

**Author Schema**

```javascript
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  age: Number,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
```

**Book Schema**

```javascript
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Author model
    ref: "Author", // Name of the referenced model
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
```

## Populating Referenced Documents

In MongoDB, population refers to the process of replacing a reference in one document with the actual document from another collection. This is typically done using Mongoose in Node.js, where referenced fields are "populated" with their related data from the referenced collection.

**Insert sample data**

1.  Create a Author:

    ```javascript
    const Author = require("./models/author");

    async function createAuthor() {
      const author = new Author({
        name: "George R.R. Martin",
        bio: "Author of A Song of Ice and Fire series",
        age: 75,
      });

      const result = await author.save();
      console.log("Author created:", result);
    }

    createAuthor();
    ```

2.  Create a Book and Reference the Author:

    ```javascript
    const Book = require('./models/book');

    const Author = require('./models/author');

    async function createBook() {
    const author = await Author.findOne({ name: 'George R.R. Martin' });

    const book = new Book({
    title: 'A Game of Thrones',
    genre: 'Fantasy',
    author: author.\_id // Reference the author's ObjectId
    });

    const result = await book.save();
    console.log('Book created:', result);
    }

    createBook();
    ```

**Populate the Referenced Document**

```javascript
const Book = require("./models/book");

async function getBooks() {
  const books = await Book.find()
    .populate("author", "name bio") // Populate author with only `name` and `bio` fields
    .select("title genre author"); // Only return specific fields in the book document

  console.log("Books with populated authors:", books);
}

getBooks();
```
