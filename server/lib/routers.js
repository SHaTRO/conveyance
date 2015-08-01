

module.exports = function() {

    var routes = {};

    function registerRouter(rpath, router) {
        routes[rpath] = routes[rpath] || [];
        routes[rpath].push(router);
        return routes[rpath];
    }

    function addRouters(app) {
        var paths = routes.getOwnPropertyNames();
        paths.sort(function(a,b) { return b.localeCompare(a); }).forEach(function(rpath) {
            var routers = routes[rpath];
            routers.forEach(function(route) {
                app.use(rpath, route);
            });
        });
    }

    return {
        register : registerRouter,
        addRoutes : addRouters
    };

}();



