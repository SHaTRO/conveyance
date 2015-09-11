/**
 * Main start script for the Conveyance server.
 */


// SWITCH THE COMMENTING OF THE NEXT TWO LINES FOR USE AS AN EXTERNAL EXAMPLE
// var conveyance = require('conveyance');
var conveyance = require('../../server/lib/server');
var router = require('./router');

conveyance.routers.register('/test', router);

conveyance.start();




