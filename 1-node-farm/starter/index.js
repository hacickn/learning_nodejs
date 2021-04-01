const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
///////////////////////////////
//fileee
//////////////////////////////

//const hello = "Hello World";
//console.log(hello);

//synchronous and blocking
//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn);
//const textOut = 'This is what we know ' + textIn + "\n Created on " + Date.now();
//fs.writeFileSync("./txt/output.txt",textOut);
//console.log("Process done");

//asynchronous and non-blocking,
/*
fs.readFile('./txt/input.txt','utf-8', (err,data) => {
    console.log(data);
    fs.writeFile('./txt/start.txt', "This is what I read \n " + data,()=>{
        console.log("Process done");
    });
});
*/
/* 
fs.readFile('./txt/start.txt','utf-8', (err,data) => {
    if (err) return console.log(`errorrrrrrr`);
    console.log(data);
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err,data) => {
        console.log(data);
    })
});
console.log('Reading file');
*/

///////////////////////////////
//server
//////////////////////////////

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'UTF-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'UTF-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'UTF-8');

const myData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'UTF-8');
const productData = JSON.parse(myData);

const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
//console.log(slugs);
//console.log(slugify(('Fresh Avacados'),{lower:true}));

const server = http.createServer((req, res) => {
  //console.log(req);
  //console.log(res);
  //console.log(req.url);
  console.log(req.url);
  const { query, pathName } = url.parse(req.url, true);

  //overview page
  if (req.url === '/overview' || req.url === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = productData.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    //console.log(cardsHtml);
    res.end(output);
  }

  //product page
  else if (req.url === `/product?id=${query.id}`) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const myProduct = productData[query.id];
    const myOutput = replaceTemplate(tempProduct, myProduct);
    res.end(myOutput);
  }

  //api
  else if (req.url === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(myData);
  }

  //not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1> Page Not Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
