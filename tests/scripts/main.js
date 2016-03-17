
// utils
var path = require('path');
var fs = require('fs-extra');

// istanbul coverage generator
var istanbul = require('../../node_modules/istanbul/lib/cli');


var configfile = path.join('tests', 'config', 'istanbul-config.json');
if (fs.existsSync(configfile)) {
    var testfile = path.join('tests', 'scripts', 'nodeunit.js');

    istanbul.runToCompletion([ 'cover', '--config', configfile, testfile]);
}


