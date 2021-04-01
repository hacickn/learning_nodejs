const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immadiate 1 finished"));

//CHANGE THE NUMBER OF THREAD
process.env.UV_THREADPOOL_SIZE = 2;

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immadiate 2 finished"));

  process.nextTick(() => console.log("Process.nextThick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + "     Password encyped");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + "     Password encyped");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + "     Password encyped");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + "     Password encyped");
  });
  /*
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start + "     Password encyped SYNC1");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start + "     Password encyped SYNC2");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start + "     Password encyped SYNC3");
  */
});

console.log("Hello from the top-level code");
