/**
 * config.js
 * Configuration utilities.
 */


// soon will be extended with custom specs

module.exports = function() {
    var fs = require('fs-extra');
    var path = require('path');
    var glob = require('glob');
    var merge = require('merge');
    var log = require('./logging');

    var serverConf;
    var staticConf;

    function mergeConfig(dest,src) { 
        merge.recursive(dest, src);
    }

    // initializing, so sync is OK
    function baseConfig(key) {
        var baseConfDir = path.join(path.dirname(__filename), '..', 'config', key);
        var baseConfFile = path.join(baseConfDir, 'base.json');
        log.debug('Initializing ' + key + ' configuration from ' + baseConfFile);
        return fs.readJsonSync(baseConfFile);
    }

    function customConfig(key) {
        var resultConf = {};
        var customConfDir = path.join(process.cwd(), 'config', key);
        log.debug("Looking for custom configuration files in: " + customConfDir);
        var files = glob.sync('**/*.json', { 'cwd' : customConfDir });
        if (files && files.length) {
            files.map(function(fname) { return path.join(customConfDir, fname) })
                 .forEach(function(jsonfile) {
                    log.debug("Merging custom configuration: " + jsonfile);
                    var customConf = fs.readJsonSync(jsonfile);
                    if (customConf) {
                        mergeConfig(resultConf, customConf);
                    }
                 });
        }
        return resultConf;
    }
    
    function serverConfig() {
        if (!serverConf) {
            serverConf = baseConfig('server');
            var customConf = customConfig('server');
            mergeConfig(serverConf, customConf);
        }
        return serverConf;
    }

    function staticConfig() {
        if (!staticConf) {
            staticConf = staticConf || baseConfig('static');
            var customConf = customConfig('static');
            mergeConfig(staticConf, customConf);
        }
        return staticConf;
    }
    

    return {
        // API methods (contract)
        serverConfig : serverConfig,
        staticConfig : staticConfig,

        // Harness methods (volatile internals)
        _serverConf : serverConf,
        _staticConf : staticConf

    }

}();

