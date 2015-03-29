var express = require('express');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var u = require('underscore');

var mongoose = require('mongoose');


//-- Mongoose instanciation -------------------------
mongoose.connect('mongodb://localhost/garde-manger', function (error) {
    if (error) {
        console.log(error);
    }
});
var Schema = mongoose.Schema;

//-- Express configuration -------------------------
var app = express();

app.use(morgan('dev'));
app.use(express.static('.'));
app.use(bodyParser.json({type: 'application/json'}));


//-- Recipe schema -------------------------
var RecipeSchema = new Schema({
    'title': String,
    'type': String,
    'parent': String,
    'serves': Number,
    'prepare': String,
    'cook': String,
    'rest': String,
    'ingredients': [{
        'name': String,
        'quantity': String
    }],
    'steps': Array
});
var Recipe = mongoose.model('recipes', RecipeSchema);

//-- Routing -------------------------
app.get('/api/recipe', function (req, res, next) {
    Recipe.find(function (err, recipes) {
        if (err) return next(err);
        return res.json(recipes);
    });
});

app.get('/api/recipe/:id', function (req, res) {
    var id = req.params.id;

    Recipe.findById(id, function (err, recipe) {
        if (err) return res.send(err);
        if (u.isEmpty(recipe)) return res.sendStatus(404);
        return res.json(recipe);
    });
});

app.post('/api/recipe', function (req, res, next) {
    var body = req.body;
    if (!body) return res.sendStatus(400);

    new Recipe(body)
        .save(function (err, post) {
            if (err) return next(err);
            return res.json(post);
        });
});

app.put('/api/recipe/:id', function (req, res) {
    var id = req.params.id;
    var body = req.body;

    if (!body) return res.sendStatus(400);

    Recipe.findById(id, function (err, recipe) {
        if (err) return res.send(err);
        if (u.isEmpty(recipe)) return res.sendStatus(404);

        recipe.title = body.title;
        recipe.type = body.type;
        recipe.parent = body.parent;
        recipe.serves = body.serves;
        recipe.prepare = body.prepare;
        recipe.cook = body.cook;
        recipe.rest = body.rest;
        recipe.ingredients = body.ingredients;
        recipe.steps = body.steps;

        recipe.save(function (err) {
            if (err) return res.send(err);
            return res.sendStatus(200);
        });
    });
});

app.delete('/api/recipe/:id', function (req, res) {
    var id = req.params.id;

    Recipe.findById(id, function (err, recipe) {
        if (err) return res.send(err);
        if (u.isEmpty(recipe)) return res.sendStatus(404);

        recipe.remove(function (err) {
            if (err) return res.send(err);
            return res.sendStatus(200);
        });
    });
});

// Listen port 8080
var server = app.listen(8080, function () {
    console.log('Server listening on port ' + server.address().port);
});
