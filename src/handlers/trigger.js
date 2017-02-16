'use strict';

var config = require('config-yml'),
  Promise = require('bluebird'),
  http = require('request-promise'),
  logger = require('../../util/logger.js')(module),
  listCameras = require('./listCameras.js'),
  login = require('../helpers/login.js'),
  errors = require('../errors.js');

function trigger(req, session) {
  var camera = req.camera,
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
  return http.post(options)
    .then(function (response) {
      if (response.result === 'fail') {
        return listCameras(session)
          .then(function (response) {
            throw new errors.CameraNotFound('Could not trigger camera ' + camera + '. Valid camera names are: ' + response.join(', '));
          });
      }
      return true;
    });
}

module.exports = function (req) {
  return login()
    .then(function (session) {
      var cameras = Array.isArray(req.body.camera) ? req.body.camera : [req.body.camera];
      return Promise.map(cameras, function (camera) {
        return trigger({ camera: camera }, session);
      });
    });
};
