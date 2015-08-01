

// utils
var fs = require('fs-extra');
var path = require('path');

var istanbulConfig = require('../config/istanbul-config.json');

var coveragedir = istanbulConfig.reporting && istanbulConfig.reporting.dir || path.join('tests', 'coverage');
console.log('Cleaning up ' + coveragedir);
if (fs.existsSync(coveragedir)) fs.removeSync(coveragedir);
fs.ensureDirSync(coveragedir);

