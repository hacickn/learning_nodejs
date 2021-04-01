const EventEmitter = require("events");
const http = require("http");
//const myEmitter = new EventEmitter();
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Costumer Name is Jonas");
});

myEmitter.on("newSale", (value) => {
  console.log(`There are now ${value} items left in stock`);
});
myEmitter.emit("newSale", 9);

////////////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request recieved end");
});

server.on("request", (req, res) => {
  console.log("anaother request received");
});

server.on("close", (req, res) => {
  console.log("server closed");
});

server.listen(8000, "127.0.01", () => {
  console.log("Waiting for request");
});
