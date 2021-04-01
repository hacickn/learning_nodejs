//console.log(arguments);
//console.log(require("module").wrapper);

//module.exports
const Calculator = require("./test-module-1");
const cal1 = new Calculator();
console.log(cal1.add(4, 5));

//exports
//const cal2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");
//console.log(cal2.add(4, 3));
console.log(add(4, 3));

//caching
require("./test-module-3")();
