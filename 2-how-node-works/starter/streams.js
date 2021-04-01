const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1
  //big memory allocation is problem
  /*
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log.log("error");
    res.end(data);
  });
  */

  //Solution 2
  //read speed and write speed are not configured
  /*
  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("file not found");
  });
  */

  //Solution 3
  // best solution
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
