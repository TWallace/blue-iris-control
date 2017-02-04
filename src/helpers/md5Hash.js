'use strict';

var md5 = require('md5'),
    config = require('config-yml');

module.exports = function(session) {
    return md5(config.username + ':' + session + ':' + config.password);
};
