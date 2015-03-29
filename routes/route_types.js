var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var u = require('underscore');


//-- Mongoose instanciation -------------------------
var Schema = mongoose.Schema;


//-- Type schema -------------------------
var TypeSchema = new Schema({
    'name': String
});
var Type = mongoose.model('types', TypeSchema);


//-- Routing -------------------------
router.get('/api/type', function (req, res, next) {
    Type.find(function (err, types) {
        if (err) return next(err);
        return res.json(types);
    });
});

router.get('/api/type/:id', function (req, res) {
    var id = req.params.id;

    Type.findById(id, function (err, type) {
        if (err) return res.send(err);
        if (u.isEmpty(type)) return res.sendStatus(404);
        return res.json(type);
    });
});

router.post('/api/type', function (req, res, next) {
    var body = req.body;
    if (!body) return res.sendStatus(400);

    new Type(body)
        .save(function (err, post) {
            if (err) return next(err);
            return res.json(post);
        });
});

router.put('/api/type/:id', function (req, res) {
    var id = req.params.id;
    var body = req.body;

    if (!body) return res.sendStatus(400);

    Type.findById(id, function (err, type) {
        if (err) return res.send(err);
        if (u.isEmpty(type)) return res.sendStatus(404);

        type.name = body.name;

        type.save(function (err) {
            if (err) return res.send(err);
            return res.sendStatus(200);
        });
    });
});

router.delete('/api/type/:id', function (req, res) {
    var id = req.params.id;

    Type.findById(id, function (err, type) {
        if (err) return res.send(err);
        if (u.isEmpty(type)) return res.sendStatus(404);

        type.remove(function (err) {
            if (err) return res.send(err);
            return res.sendStatus(200);
        });
    });
});

module.exports = router;
