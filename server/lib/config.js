/**
 * config.js
 * Configuration utilities.
 */


var serverConf;

module.exports = function() {
	var fs = require('fs-extra');
	var path = require('path');
	var merge = require('merge');
	var log = require('./logging');
	
	function mergeConfig(dest,src) {
		return merge.recursive(false, dest, src);
	}
	
	function serverConfig() {
		if (!serverConf) {
			var serverBase = path.join(process.cwd(),'config/server/base.json');
			log.debug('Initializing server configuration from ' + serverBase);
			serverConf = fs.readJsonSync(serverBase);
		}
		return serverConf;
	}
	
	return {
		mergeConfig : mergeConfig,
		// addConfig : addConfig,
		serverConfig : serverConfig
	}
}();