var express = require('express');

var app = express();

// serve static file
app.use(express.static('.'));

// Listen port 8080
app.listen(8080);
console.log("Server listening to port 8080");
