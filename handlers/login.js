'use strict';

var config = require('config-yml'),
    http = require('request-promise'),
    md5 = require('md5');

module.exports = function() {
    var options = {
        method: 'POST',
        uri: config.blueIrisUrl,
        body: {
            cmd: 'login'
        },
        json: true
    };
    return http.post(options)
        .then(function(response) {
            var session = response.session;
            if (session) {
                options.body.session = session;
                options.body.response = md5(config.username
                    + ':' + session
                    + ':' + config.password);
                return http.post(options)
                    .then(function(response) {
                        console.log(response);
                    });
            }
        })
        .catch(function(error) {
            console.error(error);
        });
};
