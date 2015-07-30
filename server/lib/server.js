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
	
	
	var serverConfig = config.serverConfig();
	
	var app = express();
	var server;
	
	function startServer() {
		log.debug("Configuring server...");
		staticRoutes(app, path.join(process.cwd(), 'config/static/base.json'));
		errorHandlers(app);
		log.debug("Starting server...");
		server = app.listen(serverConfig.port || 80, serverConfig.host);
		var addr = server.address();
		log.info("Conveyance started at " + addr.address + ':' + addr.port);	
		return app;
	}
	
	return {
		app : app,
		server : server,
		config : serverConfig,
		start : startServer
	};

}();