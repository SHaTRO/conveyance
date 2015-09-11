/**
 * config.js
 * Configuration utilities.
 */


// soon will be extended with custom specs


var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');
var merge = require('merge');
var log = require('./logging');


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

function customConfig(key, customDir) {
    var resultConf = {};
    var customConfDir = path.join(customDir || process.cwd(), 'config', key);
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
    


module.exports = function(optionalCustomDir) {

    var serverConf;
    var staticConf;
    var appConf;


    function serverConfig() {
        if (!serverConf) {
            serverConf = baseConfig('server');
            var customConf = customConfig('server', optionalCustomDir);
            mergeConfig(serverConf, customConf);
        }
        return serverConf;
    }

    function staticConfig() {
        if (!staticConf) {
            staticConf = staticConf || baseConfig('static');
            var customConf = customConfig('static', optionalCustomDir);
            mergeConfig(staticConf, customConf);
        }
        return staticConf;
    }

    function appConfig() {
        if (!appConf) {
            appConf = appConf || baseConfig('app');
            var customConf = customConfig('app', optionalCustomDir);
            mergeConfig(appConf, customConf);
        }
        return appConf;
    }


    function resetConfig() {
        serverConf = false;
        staticConf = false;
        appConf = false;
    }


    return {
        // API methods (contract)
        serverConfig : serverConfig,
        staticConfig : staticConfig,
        appConfig : appConfig,

        reset : resetConfig,

        // Harness methods (volatile internals)
        _serverConf : serverConf,
        _staticConf : staticConf

    }

}(process.env && process.env.CONVEYANCE_CUSTOM_DIR);

