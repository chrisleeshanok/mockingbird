var express = require('express');
var nconf = require('nconf');
var router = express.Router();

//Mongoose Schema
var Mock = require('../models/mock');
var Method = require('../models/method');

router.route('/mockingbird/mocks')

.get(function(req, res, next) {
    Mock.find({}, function(err, mocks) {
        if (err) {
            res.status(500).json({
                "code": 500,
                "status": "Unable to fetch Mocks",
                "message": "There was an error fetching Mocks from the database"
            });
        } else {
            res.render('mocks', {
                "mocks": mocks,
                "context_root": nconf.get('ROUTING').CONTEXT_ROOT,
                "hello": "Hello World"
            });
        }
    });
})

.post(function(req, res, next) {
    next(new Error('Not implemented'));
})
.put(function(req, res, next) {
    next(new Error('Not implemented'));
})
.delete(function(req, res, next) {
    next(new Error('Not implemented'));
});

router.route('/mockingbird/mocks/create')
.get(function(req, res, next) {
    res.render('mocks_create', {
        "context_root": nconf.get('ROUTING').CONTEXT_ROOT
    });
});

router.route('/mockingbird/mocks/edit/:mockid')
.get(function(req, res, next) {
    Mock.findById(req.params.mockid, function(err, mock) {
        if (err) {
            res.status(404).json({
                "code": 404,
                "status": 'Not Found',
                "message": "No mock data found by this id"
            });
        } else {

            //Now fetch Methods related to this mockid
            Method.find({endpointId: mock.id}).exec(function(methodErr, methods) {
                if (methodErr) {
                    res.status(500).json({
                        "code": 500,
                        "status": 'Error Fetching Methods',
                        "message": "Unable to fetch methods for this endpoint"
                    });
                }

                res.render('mocks_edit', {
                    "mock": JSON.stringify(mock),
                    "methods": JSON.stringify(methods),
                    "context_root": nconf.get('ROUTING').CONTEXT_ROOT
                });
            });
        }
    });
})

module.exports = router;
