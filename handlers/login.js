'use strict';

var config = require('config-yml'),
    http = require('request-promise'),
    md5 = require('../helpers/md5Hash.js');

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
                options.body.response = md5(session);
                return http.post(options)
                    .then(function(response) {
                        return response.session;
                    });
            }
            throw new Error('Could not login to Blue Iris');
        })
        .catch(function(error) {
            throw error;
        });
};
