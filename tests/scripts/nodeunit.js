

var path = require('path');
var testrunner = require('nodeunit').reporters.default;


var suitefiles = [ 'test_suite1.js', 'test_suite2.js' ];
var testsuites = suitefiles.map(function(fname) { return path.join('tests', 'cases', fname); });

testrunner.run(testsuites);


