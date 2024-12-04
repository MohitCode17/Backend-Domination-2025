## Basics of MongoDB

MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called documents. It is highly scalable and works well with modern applications.

**Key Concepts in MongoDB**

1. **Database**: A container for collections (similar to a folder).
2. **Collection**: A group of documents (like a table in relational databases).
3. **Document**: A single record in a collection, stored as a JSON-like object.

**Basics MongoDB Command**

```bash
# Start MongoDB server (in your terminal or as a service)
mongod

# Open the Mongo shell
mongo

# Show databases
show dbs

# Create or switch to a database
use myDatabase

# Create a collection and insert a document
db.myCollection.insertOne({ name: "Alice", age: 25 })

# Show collections
show collections

# Delete collection
db.myCollection.drop()

# Delete database
db.dropDatabase()

# Query documents
db.myCollection.find()

# Update a document
db.myCollection.updateOne({ name: "Alice" }, { $set: { age: 26 } })

# Delete a document
db.myCollection.deleteOne({ name: "Alice" })

```

---

## Mongoose Overview

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It helps you define schemas and interact with MongoDB in an elegant and structured way.

**Key features of Mongoose**

1. **Schema Definition**: Define the structure of your documents.
2. **Validation**: Validate data before saving to the database.
3. **Middleware**: Execute functions before or after certain actions (e.g., save, remove).
4. **Query Builders**: Perform complex queries easily.

### Setting Up Mongoose

**Installation**

```bash
npm install mongoose
```

**Connecting to MongoDB**

```javascript
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error connection to database");
    });

    await mongoose.connect("YOUR_DATABASE_CONNECTION_URL");
  } catch (err) {
    console.log("Failed to connect with database", err);
    process.exit(1);
  }
};
```

- `mongoose.connection`: This is Mongoose's interface to the underlying MongoDB connection.

- Event: `"connected"`: This event is triggered when Mongoose successfully connects to the database.

- Event: `"error"`: Triggered when there is an error during the connection process.

- `mongoose.connect`: This method initiates the connection to the MongoDB database.

- Uses `process.exit(1)` to terminate the application if the database connection fails. A non-zero exit code (`1`) indicates an error.

**Defining a Mongoose Schema**

A schema defines the structure of documents in a collection.

```javascript
import mongoose from "mongoose";

// Define a schema
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
```
