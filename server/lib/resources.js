
var fs = require('fs-extra');
var path = require('path');

var log = require('./logging');

module.exports = function() {
    var config = require('./config');

    var runDir;
    var baseDir;
    var coreDir;

    function copyResources() {
        runDir = process.cwd();
        baseDir = path.join(runDir, 'resources');
        coreDir = path.join(path.dirname(__filename), '..', 'resources');
        if (!fs.existsSync(baseDir)) {
            log.info("Using core directory for resources (create 'resources' dir for custom resources)");
            baseDir = coreDir;
        } else {
            if (!config.serverConfig().noResourceCopy) {
                log.debug("Copying resources from " + coreDir + " to " + baseDir);
                fs.copy(coreDir, baseDir, { clobber: config.serverConfig().forceResourceCopy ? true : false }, function(err) {
                    if (err) log.error(err.stack);
                    log.info("Resource copy complete.");
                });            
            } else {
                log.info("Skipping resource copy (noResourceCopy set)");
            }
        }
    }
    
    return {
        // API methods (contract)
        init : copyResources,

        // exposed internals (volatile)
        _runDir : function() { return runDir; },
        _baseDir : function() { return baseDir; },
        _coreDir : function() { return coreDir; }
    };

}();

