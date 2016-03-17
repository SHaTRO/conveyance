

var path = require('path');
var testrunner = require('nodeunit').reporters.default;


process.chdir(path.join('tests', 'run'));

var suitefiles = [ 'test_suite1.js', 'test_suite2.js' ];
var testsuites = suitefiles.map(function(fname) { return path.join('..', 'cases', fname); });

testrunner.run(testsuites);


