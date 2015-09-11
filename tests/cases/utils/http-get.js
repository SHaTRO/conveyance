

var http = require('http');
var URL = require('url');

module.exports = function(urlopt, callback) {
    // console.log("TEST: http request initiating with " + JSON.stringify(urlopt));
    try {
        return http.get(urlopt, function(res) {
            // console.log("TEST: Initiated a response object for the url request...");
            var data = '';
            res.on('data', function(d) {
                data += d;
                // console.log("data received from url");
            });
            res.on('end', function() {
                // console.log("url complete");
                callback(res, data);
            });
            res.on('error', function(err) {
                // console.log("Error encountered");
                callback(res, data, err);
            });
        });
    } catch (e) {
        console.error(e);
        // console.error("TEST: Encountered unexpected http request failure");
    }
};


