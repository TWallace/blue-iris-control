'use strict';

var config = require('config-yml'),
  http = require('request-promise'),
  listCameras = require('../helpers/listCameras.js'),
  login = require('../helpers/login.js'),
  errors = require('../errors.js');

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
  return http.post(options).then(function (response) {
    if (response.result === 'fail') {
      return listCameras(options)
        .then(function(response) {
          throw new errors.CameraNotFound('Could not trigger camera ' + camera + '. Valid camera names are: ' + response.join(', '));
        });
    }
    return true;
  });
}

module.exports = function (req) {
  return login()
    .then(function (response) {
      return trigger(req, response);
    });
};
