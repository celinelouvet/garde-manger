var express = require('express');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var recipes = require('./routes/route_recipes.js');

var mongoose = require('mongoose');

//-- Mongoose instanciation -------------------------
mongoose.connect('mongodb://localhost/garde-manger', function (error) {
    if (error) {
        console.log(error);
    }
});


//-- Express configuration -------------------------
var app = express();

app.use(morgan('dev'));
app.use(express.static('.'));
app.use(bodyParser.json({type: 'application/json'}));


//-- Routing -------------------------
app.get('/api/recipe', recipes);
app.get('/api/recipe/:id', recipes);
app.post('/api/recipe', recipes);
app.put('/api/recipe/:id', recipes);
app.delete('/api/recipe/:id', recipes);


//-- Server -------------------------
var server = app.listen(8080, function () {
    console.log('Server listening on port ' + server.address().port);
});
