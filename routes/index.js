var express = require('express');
var router = express.Router();
var nconf = require('nconf');

/* GET home page. */
router.get('/mockingbird', function(req, res, next) {
   res.render('index', {
       context_root: nconf.get('ROUTING').CONTEXT_ROOT
   });
});

module.exports = router;
