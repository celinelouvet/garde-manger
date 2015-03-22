var express = require('express');
var recipes = require('./routes/route_recipes');

var app = express();

// serve static file
app.use(express.static('.'));

// Routing
app.get('/recipe', recipes);

// Listen port 8080
app.listen(8080);
console.log("Server listening to port 8080");
