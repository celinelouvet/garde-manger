var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var u = require('underscore');


//-- Mongoose instanciation -------------------------
var Schema = mongoose.Schema;


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
router.get('/api/recipe', function (req, res, next) {
    Recipe.find(function (err, recipes) {
        if (err) return next(err);
        return res.json(recipes);
    });
});
router.get('/api/recipe/type/:type', function (req, res, next) {
    var type = req.params.type;
    Recipe.find({'type': type}, function (err, recipes) {
        if (err) return next(err);
        return res.json(recipes);
    });
});

router.get('/api/recipe/:id', function (req, res) {
    var id = req.params.id;

    Recipe.findById(id, function (err, recipe) {
        if (err) return res.send(err);
        if (u.isEmpty(recipe)) return res.sendStatus(404);
        return res.json(recipe);
    });
});

router.post('/api/recipe', function (req, res, next) {
    var body = req.body;
    if (!body) return res.sendStatus(400);

    new Recipe(body)
        .save(function (err, post) {
            if (err) return next(err);
            return res.json(post);
        });
});

router.put('/api/recipe/:id', function (req, res) {
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

router.delete('/api/recipe/:id', function (req, res) {
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

module.exports = router;
