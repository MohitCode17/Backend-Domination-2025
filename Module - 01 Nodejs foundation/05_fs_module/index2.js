const fs = require("fs");
const path = require("path");

// 👉 CREATING A FILE
const dataFolder = path.join(__dirname, "data");
const asyncFilePath = path.join(dataFolder, "async-file.txt");

fs.writeFile(asyncFilePath, "This is async way of create a file.", (err) => {
  if (err) throw err;
  console.log("Async file is created successfully.");

  // 👉 READ FILE CONTENT
  fs.readFile(asyncFilePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);

    fs.appendFile(
      asyncFilePath,
      "\nThis is another line added by async append method.",
      (err) => {
        if (err) throw err;
        console.log("Data appended successfully");
      }
    );
  });
});
