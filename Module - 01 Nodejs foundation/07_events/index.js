const EventEmitter = require("events");

const myEventEmitter = new EventEmitter();

// REGISTER A LISTENER
myEventEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// TRIGGER THE EVENT USING .emit METHOD
myEventEmitter.emit("greet", "mohit gupta");
