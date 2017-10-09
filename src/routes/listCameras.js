'use strict';

/**
 * @api {post} /listCameras List Cameras
 * @apiName List Cameras
 * @apiGroup Camera
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */

var listCameras = require('../handlers/listCameras.js'),
    uuid = require('uuid'),
    logger = require('../../util/logger.js')(module);

module.exports = function(app) {
  app.post('/listCameras', function(req, res) {
    req.headers.correlationId = req.headers.correlationId || uuid.v4();
    return listCameras(req)
      .then(function(response) {
        if (response) {
          res.status(200).send(response);
        }
        res.status(500).send();
      })
      .catch(function(error) {
        logger.error(error.message);
        res.status(error.statusCode || 500).send(error.message);
      });
  });
};
