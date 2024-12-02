const colors = require("colors");
const lodash = require("lodash");

console.log(colors.america("Colors package in node.js"));

const names = ["mohit", "john", "knight", "phonix", "james"];
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);
