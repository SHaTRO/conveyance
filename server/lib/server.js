/**
 * server.js
 * Server startup utility.
 */

module.exports = function() {
	
	var express = require('express');
	var path = require('path');

	
	var log = require('./logging');
	var config = require('./config');
	var staticRoutes = require('./static');
	var errorHandlers = require('./error');
        var routers = require('./routers');
        var resources = require('./resources');
	
	
	var serverConfig = config.serverConfig();
	
	var app = express();
	var server;
	
	function startServer(cb) {
		log.debug("Configuring server...");
                resources.init();
		staticRoutes(app, { config : config.staticConfig() });
                routers.addRoutes(app);
		errorHandlers(app);
		log.debug("Starting server...");
		this.server = server = app.listen(serverConfig.port || 80, serverConfig.host, function() {
		    var addr = server.address();
		    log.info("Server (" + serverConfig.name + ") started at " + addr.address + ':' + addr.port);	
                    if (cb) cb();
                });
	}

        function stopServer(cb) {
            server.close(function() {
                log.info("Server (" + serverConfig.name + ") stopped.");
                if (cb) cb();
            });
        }
	
	return {
		app : app,
		server : server,
                routers : routers,

		config : serverConfig,
		start : startServer,
                stop : stopServer,

	};

}();
