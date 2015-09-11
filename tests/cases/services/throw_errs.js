

var express = require('express');

var createError = require('http-errors');

var router = new express.Router();

function handleGet(req,res,next) {
    if (req.query && req.query.errorcode) {
        console.log("Throwing an error (" + req.query.errorcode + ")...");
        var code = req.query && req.query.errorcode && parseInt(req.query.errorcode);
        var msg = req.query.errormsg || 'some test ' + code + ' error';
        var err = createError(code, msg);
        throw err;
    } else {
        console.log("Throwing a 400 error (not enough params)...");
        throw createError(400, "not enough parameters to our error generator");
    }
}

router.get('/', handleGet);

module.exports = {
    router : router,
    _getHandler : handleGet
};


