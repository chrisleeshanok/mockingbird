var express = require('express');
var router = express.Router();

//Mongoose Schema
var Mock = require('../../models/mock');
var Method = require('../../models/method');

router.route('/mockingbird/api/mock/:mockid')

.get(function(req, res, next) {

    Mock.findById(req.params.mockid, function(err, mock) {

        if (err) {
            res.status(404).json({
                "code": 404,
                "status": 'Not Found',
                "message": "No mock data found by this id"
            });
        }

        res.json(mock);
    });
})

.put(function(req, res, next) {

    //TODO: responseData, responseCode, responseMethod are deprecated.
    // On creation, the POST method creates a Method document of Method schema instead.
    // Need to remove logic to store response data/code/method here
    if (!req.body.name) {
        res.status(500).json({
            "code": 500,
            "status": 'Missing required parameters',
            "message": "Required parameters to create a mock endpoint were missing in the request body"
        });
    }

    var mockData = {
        "name": req.body.name,
        "metadata": {
            "description": req.body.description,
            "author": req.body.author
        },
        "response": {
            "data": JSON.parse(req.body.responseData),
            "delay": (req.body.responseDelay) ? req.body.responseDelay : 0,
            "code": (req.body.responseCode) ? req.body.responseCode : 200,
            "method": (req.body.responseMethod) ? req.body.responseMethod : 'GET'
        },
        "component": {
            "name": req.body.componentName,
            "id": req.body.componentId,
            "product": req.body.componentProduct
        }
    };

    Mock.findByIdAndUpdate(req.params.mockid, mockData, {new:true}, function(err, mock){
        if (err) {
            res.status(500).json({
                "code": 500,
                "status": 'Unable to update Mock',
                "error": err
            });
        }
        res.json({
            "code": 200,
            "status": "success",
            "message": "Successfully updated Mock with id " + mock.id,
            "result": mock
        });
    });
})

.delete(function(req, res, next) {
    next(new Error('Not implemented'));
})
.post(function(req, res, next) {
    next(new Error('Not implemented'));
});

//Catchall for no mockid param supplied
//Only POST should reach this
router.route('/mockingbird/api/mock')

.post(function(req, res) {

    var mockData = {};

    if (!(req.body.name && req.body.responseData)) {
        res.status(500).json({
            "code": 500,
            "status": 'Missing required parameters',
            "message": "Required parameters to create a mock endpoint were missing in the request body"
        });
    }

    var mockData = {
        "name": req.body.name,
        "metadata": {
            "description": req.body.description,
            "author": req.body.author
        },
        "response": {
            "data": JSON.parse(req.body.responseData),
            "delay": (req.body.responseDelay) ? req.body.responseDelay : 0,
            "code": (req.body.responseCode) ? req.body.responseCode : 200,
            "method": (req.body.responseMethod) ? req.body.responseMethod : 'GET'
        },
        "component": {
            "name": req.body.componentName,
            "id": req.body.componentId,
            "product": req.body.componentProduct
        }
    };

    var newMock = Mock(mockData);
    newMockId = newMock.id;

    //Now create a method document
    var methodData = {
        "endpointId": newMock._id,
        "method": req.body.responseMethod,
        "code": req.body.responseCode,
        "data": JSON.parse(req.body.responseData)
    };

    var newMethod = Method(methodData);

    //TODO: USE ASYNC AND GET THESE TWO DOC CREATES IN SERIES
    newMock.save(function(err, mock) {
        if (err) {
            res.status(500).json({
                "code": 500,
                "status": 'Unable to save new Mock',
                "error": err
            });
        }

        newMethod.save(function(err, method) {
            if (err) {
                res.status(500).json({
                    "code": 500,
                    "status": 'Unable to save new Mock',
                    "error": err
                });
            }
        });

        res.json({
            "code": 200,
            "status": "success",
            "message": "Successfully created new Mock with id " + mock.id,
            "result": mock
        });

    });
})

.all(function(req, res, next) {
    res.status(404).json({
        "code": 404,
        "status": 'No Mock ID given',
        "message": "A valid Mock ID was not supplied as a url parameter"
    });
});

module.exports = router;
