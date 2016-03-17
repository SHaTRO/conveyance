


module.exports = function(iconConf) {
    var path = require('path');

    if (!iconConf) {
        return;
    }
    var favicon = require('serve-favicon');
    if (typeof iconConf !== 'string') {
        iconConf = path.join(__dirname, '..', 'resources/img/favicon.png');
    }
    return favicon(iconConf);
}


