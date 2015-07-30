/**
 * Static Resource Router
 */

var fs = require('fs-extra');
var path = require('path');
var express = require('express');

var log = require('./logging');

module.exports = function(app, opt) {
	// if (opt) is a file, we will use it as the source JSON
	// otherwise we will use the options to locate the source
	
	function setStaticRoutes(config) {
		for (var route in config) {
			var resource = config[route];
			var dest;
			if (typeof resource == 'string') {
				dest = resource;
			} else {
				dest = resource.dest;
				if (!dest) throw new Error('Invalid resource for route (' + route + ') in static configuration');
			}
			log.debug('Adding static route:  ' + route + ' => ' + dest);
			app.use(route, express.static(dest));
		}
	};	
	
	var myopt = opt || {};
	var config;
	if (typeof myopt == 'string') {
		// myopt is the file path from which to read our JSON config
		log.debug('Reading static route config from JSON file (' + myopt + ')');
		config = fs.readJsonSync(myopt);
	} else if (myopt.config) {
		log.debug('Pulling static route config from options');
		config = myopt.config;
	} else {
		var dir = myopt.dir || '.';
		var file = myopt.file || 'static.json';
		var fpath = path.join(dir, file);
		log.debug('Reading static route config per options: JSON file (' + fpath + ')');
		if (fs.existsSync(fpath)) {
			config = fs.readJsonSync(fpath);
		} else {
			throw new Error('"static" module failed to locate config file: ' + fpath);
		}
	}
	if (!config) {
		throw new Error('Failed to locate proper "static" configuration.');
	}
	
	setStaticRoutes(config);
};
