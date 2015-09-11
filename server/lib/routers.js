

var log = require('./logging');

module.exports = function() {

    var routes = {};

    function registerRouter(rpath, router) {
        log.debug("Registering router, " + router + ", to " + rpath);
        routes[rpath] = routes[rpath] || [];
        routes[rpath].push(router);
        log.debug("New routes for " + rpath + " : " + routes[rpath]);
        return routes[rpath];
    }

    function addRouters(app) {
        var paths = Object.keys(routes);
        paths.sort(function(a,b) { return b.localeCompare(a); }).forEach(function(rpath) {
            var routers = routes[rpath];
            routers.forEach(function(route) {
                log.debug("Using ROUTER:" + route + " at " + rpath);
                app.use(rpath, route);
            });
        });
    }

    return {
        register : registerRouter,
        addRoutes : addRouters
    };

}();



