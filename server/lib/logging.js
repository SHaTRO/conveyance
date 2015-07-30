/**
 * Logging utility module
 */

module.exports = function() {
	function getLogger() {
		var log = require('bristol');
		log.addTarget('console')
		   .withFormatter('human')
		   .withLowestSeverity('debug');
		return log;
	}
	return getLogger();
}();
