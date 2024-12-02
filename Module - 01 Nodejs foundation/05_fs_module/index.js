const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");
// console.log(dataFolder); // \Backend Marathon - 2025\Module - 1 Mastery in Node.js\05_fs_module\data

// 👉 CREATING A FOLDER

// - existsSync: Returns true if the path exists, false otherwise.
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("Data folder is created inside a directory.");
}

// 👉 CREATING A FILE TO DATA FOLDER
const filePath = path.join(dataFolder, "example.txt");
// console.log(filePath); // \Backend Marathon - 2025\Module - 1 Mastery in Node.js\05_fs_module\data\example.txt

// Synchronous way of creating file.
fs.writeFileSync(filePath, "Example of creating a file.");
console.log("Example.txt is created successfully.");

// 👉 READ A FILE
const fileContent = fs.readFileSync(filePath, "utf8");
console.log("Reading a file...");
console.log(fileContent);

// 👉 APPEND CONTENT TO EXISTING FILE
fs.appendFileSync(filePath, "\nThis content added using append method.");
console.log("File appended successfully.");

// 👉 COPY A FILE
fs.copyFileSync(filePath, path.join(dataFolder, "example-copy.txt"));
console.log("Duplicate file created.");
