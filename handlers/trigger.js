'use strict';

var config = require('config-yml'),
    http = require('request-promise'),
    login = require('./login.js'),
    md5 = require('../helpers/md5Hash.js'),
    session;

function trigger(req, session) {
    var camera = req.body.camera,
        options = {
        method: 'POST',
        uri: config.blueIrisUrl,
        body: {
            cmd: 'trigger',
            camera: camera,
            session: session
        },
        json: true
    };
    return http.post(options).
        then(function(response) {
            if (response.result === 'fail') {
                throw new Error('Could not trigger camera ' + camera);
            }
        })
        .catch(function(error) {
            console.error(error);
            throw new Error('Could not trigger camera ' + camera);
        });
}

module.exports = function(req) {
    return !session
        ? login().then(function(loginResponse) {
                return trigger(req, loginResponse);
            })
        : trigger();
};
