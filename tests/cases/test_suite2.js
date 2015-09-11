/**
 * Test script for errors
 */

var conveyance, errorService; 

var httpGet = require('./utils/http-get');


function errorTest(test, code) {
    test.expect(1);
    function httpCallback(res, data) {
        console.log("res.statusCode(" + res.statusCode + ") vs. code(" + code + ")");
        test.equals(res && res.statusCode, code);
        test.done();
    }
    console.log("Initiating http-get on 127.0.0.1:" + conveyance.server.address().port);
    httpGet('http://127.0.0.1:4480/error?errorcode=403', httpCallback);
}

module.exports = {
    
    setUp : function (cb) {
        conveyance = require('../../server/lib/server');
        conveyance.reset();
        errorService = require('./services/throw_errs');
        conveyance.routers.register('/error', errorService.router);
        conveyance.start(cb);
    },

    tearDown : function (cb) {
        conveyance.stop(cb);
    },

    test_01_errors : function(test) {
        errorTest(test, 403);
    }

}


