const path = require("path");

console.log("Directory path: ", path.dirname(__filename)); // Returns the directory part of the provided path.

console.log("File name:", path.basename(__filename)); // Returns the last portion (filename) of the provided path.

console.log("file extension:", path.extname(__filename)); // Returns the extension of the file in the provided path.

const joinPath = path.join("/user", "documents", "node", "projects"); // Joins multiple path segments into a single normalized path.
console.log("Joined path:", joinPath);

const resolvePath = path.resolve("user", "documents", "node", "project"); // Resolves a sequence of path segments into an absolute path.
console.log("Resolve path:", resolvePath);

const normalizePath = path.normalize("/user/.documents/../node/projects"); //  Normalizes the given path by resolving .. (parent directory) and . (current directory) segments and correcting slashes.
console.log("Normalize path:", normalizePath);
