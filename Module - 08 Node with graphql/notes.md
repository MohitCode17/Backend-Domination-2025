## GraphQL with Node

GraphQL is a query language for APIs and a runtime for executing those queries by using a type system you define for your data. It was developed by Facebook in 2012 and released publicly in 2015. GraphQL provides a more flexible and efficient way to interact with APIs compared to traditional REST APIs.

### Basics of GraphQL

1.  Query Language:

    - GraphQL allows clients to specify exactly what data they need, and nothing more.

    - Instead of multiple endpoints like in REST, GraphQL typically exposes a single endpoint where all operations (queries, mutations, subscriptions) happen.

2.  Schema Definition:

    - A GraphQL API is defined by a schema, which describes the types of data available and their relationships.

    - Example:

    ```graphql
    type User {
      id: ID
      name: String
      email: String
    }

    type Query {
      getUser(id: ID!): User
    }
    ```

3.  Operations: GraphQL has three types of operations:

    - Query: To fetch data (similar to GET requests in REST).

    ```graphql
    query {
      getUser(id: "1") {
        name
        email
      }
    }
    ```

    - Output:

    ```json
    {
      "data": {
        "getUser": {
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    }
    ```

4.  Mutation: To modify data (similar to POST, PUT, DELETE in REST)

    ```graphql
    mutation {
      createUser(name: "Jane", email: "jane@example.com") {
        id
        name
      }
    }
    ```

5.  Fetching the data: In GraphQL, resolvers are functions that handle the logic for fetching the data for a specific field or operation in the GraphQL schema.

    ```javascript
    const resolvers = {
      Query: {
        // Getting products
        products: () => products,

        // Get single product
        product: (_, { id }) => products.find((item) => item.id === id),
      },
    };
    ```

### Types in GraphQL

- Scalar Types: Basic data types (e.g., String, Int, Float, Boolean, ID).
- Custom Types: Defined by the schema (e.g., User, Post).
- List and Nullable Types:
  - [Type]: Represents a list of items of a type.
  - Type!: Non-nullable type (always required).
