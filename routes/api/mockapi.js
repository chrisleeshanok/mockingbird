var express = require('express');
var router = express.Router();

//Mongoose Schema
var Mock = require('../../models/mock');
var Method = require('../../models/method');

router.route('/mockingbird/mockapi/mock/:mockid')

.all(function(req, res, next) {
    Mock.findById(req.params.mockid, function(err, mock) {
        if (err) {
            res.status(404).json({
                "code": 404,
                "status": 'Not Found',
                "message": "No mock data found by this id"
            });
        } else {

            //TODO: Optimization: Also change the query below to search by req.method
            //Now fetch Methods related to this mockid
            Method.find({endpointId: mock.id}).exec(function(methodErr, methods) {
                if (methodErr) {
                    res.status(404).json({
                        "code": 404,
                        "status": 'Not Found',
                        "message": "No mock data found by this id"
                    });
                }

                if (methods.length < 1) {
                    res.status(404).json({
                        "code": 404,
                        "status": 'No Methods found',
                        "message": "No methods were found for this mock"
                    });
                }

                var i;
                var method = null;
                for (i = 0; i < methods.length; i++) {
                    if (methods[i].method == req.method) {
                        method = methods[i];
                        break;
                    }
                }

                if (!method) {
                    res.status(404).json({
                        "code": 404,
                        "status": 'No Method for VERB',
                        "message": "No methods were found for this mock for the requested verb"
                    });
                } else {
                    res.status(method.code || 200).json(method.data);
                }
            });
        }
    });
});

router.route('/mockingbird/mockapi/mock')
.all(function(req, res, next) {
    res.status(404).json({
        "code": 404,
        "status": 'No Mock ID given',
        "message": "A valid Mock ID was not supplied as a url parameter"
    });
});

module.exports = router;
