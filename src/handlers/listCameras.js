'use strict';

var http = require('request-promise'),
  _ = require('lodash'),
  login = require('../helpers/login.js'),
  config = require('config-yml');

function listCameras(session) {
  var options = {
      method: 'POST',
      uri: config.blueIrisUrl,
      body: {
        cmd: 'camlist',
        session: session
      },
      json: true
    };
  return http.post(options)
    .then(function(response) {
      var cameras = [];
      _.map(response.data, function(camera) {
        if (camera.isEnabled && camera.optionValue !== '@index' && camera.isOnline && !camera.isNoSignal && camera.optionValue) {
          cameras.push(camera.optionValue);
        }
      });
      return cameras;
    });
}

module.exports = function() {
  return login()
    .then(function(response) {
      return listCameras(response);
    });
};
