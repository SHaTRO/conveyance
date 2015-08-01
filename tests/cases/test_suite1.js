/**
 * Main start script for the Conveyance server.
 */

var conveyance; 

module.exports = {

    
    setUp : function (cb) {
        conveyance = require('../../server/lib/server');
        conveyance.start(cb);
    },

    tearDown : function (cb) {
        conveyance.stop(cb);
    },

    test1 : function(test) {
        test.expect(2);
        test.ok(conveyance.app, "app is set");
        test.ok(conveyance.server, "server is set");
        test.done();
    }


}


