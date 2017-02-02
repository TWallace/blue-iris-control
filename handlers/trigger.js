'use strict';

var config = require('config-yml'),
  http = require('request-promise'),
  login = require('./login.js'),
  session;

function trigger(response) {
  return http.post(config.blueIrisUrl, {
    cmd: 'trigger'
  });
}

module.exports = function(req) {
  return !session
    ? login().then(trigger)
    : trigger();
};
