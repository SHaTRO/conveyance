

var path = require('path');
var testrunner = require('nodeunit').reporters.default;

testrunner.run([path.join('tests', 'cases', 'test_suite1.js')]);


