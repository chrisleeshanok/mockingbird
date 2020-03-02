var express = require('express');
var router = express.Router();

var Method = require('../../models/method');

router.route('/mockingbird/api/method/:methodid')

.get(function(req, res, next) {
    Method.findById(req.params.methodid, function(err, method) {
        if (err) {
            res.status(404).json({
                "code": 404,
                "status": 'Not Found',
                "message": "No method data found by this id"
            });
        }

        res.json(method);
    });
})

.put(function(req, res, next) {

    //All required
    if (!(req.body.endpointId && req.body.method && req.body.code && req.body.data)) {
        res.status(500).json({
            "code": 500,
            "status": 'Missing required parameters',
            "message": "Required parameters to update a method for this endpoint were missing in the request body"
        });
    } else {
        var methodData = {
            "endpointId": req.body.endpointId,
            "method": req.body.method,
            "code": req.body.code,
            "data": JSON.parse(req.body.data)
        };

        Method.findByIdAndUpdate(req.params.methodid, methodData, {new:true}, function(err, method){
            if (err) {
                res.status(500).json({
                    "code": 500,
                    "status": 'Unable to update Method',
                    "error": err
                });
            }
            res.json({
                "code": 200,
                "status": "success",
                "message": "Successfully updated Method with id " + method.id,
                "result": method
            });
        });
    }
});



router.route('/mockingbird/api/method')

.post(function(req, res, next) {

    //All required
    if (!(req.body.endpointId && req.body.method && req.body.code && req.body.data)) {
        res.status(500).json({
            "code": 500,
            "status": 'Missing required parameters',
            "message": "Required parameters to create a method with this endpoint were missing in the request body"
        });
    }

    var methodData = {
        "endpointId": req.body.endpointId,
        "method": req.body.method,
        "code": req.body.code,
        "data": JSON.parse(req.body.data)
    };

    var newMethod = Method(methodData);

    newMethod.save(function(err, method){
        if (err) {
            res.status(500).json({
                "code": 500,
                "status": 'Unable to create Method',
                "error": err
            });
        }
        res.json({
            "code": 200,
            "status": "success",
            "message": "Successfully created method with id " + method.id,
            "result": method
        });
    });
})

.all(function(req, res, next) {
    res.status(404).json({
        "code": 404,
        "status": 'No Method ID given',
        "message": "A valid Method ID was not supplied as a url parameter"
    });
});

module.exports = router;
