
const { Router } = require("express");
const db = require('./dbConnection')
const router = Router();
const objectId = require('mongodb').ObjectId;

router.get('/api', (req, res) => {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.find().toArray(function (err, results) {
                err ? res.json(err) : res.json(results);
                db.close();
            })
        })
    })
})

router.get('/api/:id', (req, res) => {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.find(objectId(req.params.id)).toArray(function (err, results) {
                err ? res.json(err) : res.json(results);
                db.close();
            })
        })
    })
})

router.put('/api/:id', (req, res) => {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.update(
                { _id: objectId(req.params.id) },
                { $set: { titulo: req.body.title } },
                {},
                function (err, results) {
                    err ? res.json(err) : res.json(results);
                    db.close();
                }
            );
        })
    })
})

router.delete('/api/:id', (req, res) => {
    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.remove(
                { _id: objectId(req.params.id) },
                {},
                function (err, results) {
                    err ? res.json(err) : res.json(results);
                    db.close();
                }
            );
        })
    })
})

router.post('/api', (req, res) => {
    var data = req.body;

    db.open(function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.insert(data, function (err, records) {
                err ? res.json(err) : res.json(results);
                mongoclient.close();
            })
        })
    })
})

module.exports = router;