/**
 * Main start script for the Conveyance server.
 */

var conveyance; 

var conveyance = require('../../server/lib/server');
var server1, server2;

module.exports = {

    
    setUp : function (cb) {
        console.log("setUp() called...");
        console.log("in setUp() - conveyance==" + conveyance);
        conveyance.reset();
        conveyance.start(cb);
    },

    tearDown : function (cb) {
        console.log("in tearDown() - conveyance==" + conveyance);
        conveyance.stop(cb);
    },

    test1 : function(test) {
        test.expect(2);
        test.ok(conveyance.app, "app is set");
        server1 = conveyance.server;
        test.ok(server1, "server is set");
        console.log("SERVER1: " + server1);
        test.done();
    },

    test2 : function(test) {
        test.expect(2);
        test.ok(conveyance.app, "app is set");
        server2 = conveyance.server;
        test.ok(server2 && server1!==server2, "server is set and differs from first server");
        console.log("SERVER2: " + server2);
        test.done();
    }

}


