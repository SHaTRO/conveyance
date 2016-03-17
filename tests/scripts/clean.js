

// utils
var fs = require('fs-extra');
var path = require('path');

var istanbulConfig = require('../config/istanbul-config.json');

var rundir = path.join('tests', 'run');
console.log('Cleaning up ' + rundir);
if (fs.existsSync(rundir)) fs.removeSync(rundir);
fs.ensureDirSync(path.join(rundir, 'resources'));

var coveragedir = istanbulConfig.reporting && istanbulConfig.reporting.dir || path.join('tests', 'coverage');
console.log('Cleaning up ' + coveragedir);
if (fs.existsSync(coveragedir)) fs.removeSync(coveragedir);
fs.ensureDirSync(coveragedir);

