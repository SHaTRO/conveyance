/**
 * Error handlers
 */

var log = require('./logging');
var serverConfig = require('../config/server/base.json');


var errct = 0;

function defaultRequestHandler(req, res, next) {
	var err = new Error(req.path + ' not found');
	err.status = 404;
	next(err);
}


function logErrors(err, req, res, next) {
	++errct;
	if (err.status) {
		log.error(err.status + ' ERROR #' + errct);
		log.error(err.stack);
	} else {
		log.error('UNHANDLED ERROR #'+errct);
		log.error(err.stack);
	}
	next(err);
}


function apiErrorResponse(err, req, res, next) {
	if (req.xhr ||
		 req.path===serverConfig.apiRoute 
		 || req.path.indexOf(serverConfig.apiRoute + '/')===1) {
		var errorMsg = err.status ?
				{
					error : (err.message||'ERROR') 
					        + '(code:'+err.status + ', #' + errct + ')',
					code : err.status
				}
				:
				{
					error : 'An unhandled server error has occurred. (' + errct + ')',
					code : 500
				};
		var msg = JSON.stringify(errorMsg);
		res.status(500)
		   .type('json')
		   .send(msg);
	} else {
		next(err);
	}
}

function errorResponse(err, req, res, next) {
	var ecode = err.status || 500;
	var emsg = err.message ? err.message 
						   : err.status ? 'An unknown error has occurred.'
								        : 'An unhandled server exception has occurred.';
	res.status(ecode)
	   .send(emsg + ' (' + errct + ')');
}

module.exports = function(app) {
	log.debug('Initializing server error handlers...')
	app.all('*', defaultRequestHandler);
	app.use(logErrors);
	app.use(apiErrorResponse);
	app.use(errorResponse);
};
