/**
 * Logging utility module
 */

module.exports = function() {
	var logging = require('bristol');
		
	function addTargetFromConfig(opt) {
		opt = opt || {};
		var target = opt && opt.name ? opt : {
			name      : 'console',
			formatter : 'human'
		};
		var targetName = target.name;
		var targetOptions = target.options || {};
		var myLogClosure = this.addTarget(targetName,targetOptions);
		var formatter = target.formatter;
		if (formatter) {
			myLogClosure = myLogClosure.withFormatter(formatter);
		}
		var lowestSeverity = target.lowestSeverity;
		if (lowestSeverity) {
			myLogClosure = myLogClosure.withLowestSeverity(lowestSeverity);
		}
		var highestSeverity = target.highestSeverity;
		if (highestSeverity) {
			myLogClosure = myLogClosure.withHighestSeverity(highestSeverity);
		}
		return myLogClosure;
	}
	
	logging.Bristol.prototype.addTargetFromConfig = addTargetFromConfig;
	
	var log = new logging.Bristol();
	log.baselog = logging;
	log.baselog.addTarget('console')
		       .withFormatter('human');
	return log;
	
}();
