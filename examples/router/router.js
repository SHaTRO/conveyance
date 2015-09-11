


var express = require('express');
var router = new express.Router();
router.get('/', function(req,res,next) {
    res.send("GET encountered on router");
});

module.exports = router;

