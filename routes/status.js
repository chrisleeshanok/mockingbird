var express = require('express');
var router = express.Router();

router.route('/mockingbird/status')
.all(function(req, res, next) {
    res.sendStatus(204);
});

module.exports = router;
