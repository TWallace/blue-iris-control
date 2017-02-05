'use strict';

var http = require('request-promise'),
  _ = require('lodash');

module.exports = function (options) {
  options.body = {
    cmd: 'camlist',
    session: options.body.session
  };
  delete options.body.camera;
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
};
