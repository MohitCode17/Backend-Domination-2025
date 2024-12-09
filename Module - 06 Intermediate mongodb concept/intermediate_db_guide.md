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
