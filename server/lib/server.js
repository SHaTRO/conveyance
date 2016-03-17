/**
 * server.js
 * Server startup utility.
 */

var express = require('express');

var path = require('path');

module.exports = function(optionalCustomDir) {

	var log = require('./logging');

        var config = require('./config');

        var routers = require('./routers');
        var resources = require('./resources');
	var staticRoutes = require('./static');
	var errorHandlers = require('./error');

        var favicon = require('./favicon');

        var serverConfig, app, server;
    
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
                this.server = server = false;
                if (cb) cb();
            });
        }


        function init() {
            if (server) {
                log.error("Can't init() when already initialized, must stop the server");
                throw new Error("Can't init() when already initialized, must stop the server");
            }
            config.reset();
	    serverConfig = config.serverConfig();
            appConfig = config.appConfig();
	    app = express();

            // add favicon if it wasn't overridden to be false
            if (serverConfig.favicon) app.use(favicon(serverConfig.favicon));

            return {
		app : app,
		server : server,
                routers : routers,
		appConfig : appConfig,
                config : serverConfig,
		start : startServer,
                stop : stopServer,
                reset : init
            };
        }
	
	return init();
}();

