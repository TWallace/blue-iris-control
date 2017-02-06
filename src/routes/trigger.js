'use strict';

/**
 * @api {post} /trigger Trigger Camera
 * @apiName Trigger Cameras
 * @apiGroup Camera
 *
 * @apiParam {String} camera - Camera name
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError CameraNotFound Could not trigger camera CameraTest. Valid camera names are: camera1, camera2, etc.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CameraNotFound"
 *     }
 */

var trigger = require('../handlers/trigger.js'),
  uuid = require('uuid'),
  logger = require('../../util/logger.js')(module);

module.exports = function(app) {
  app.post('/trigger', function (req, res) {
    req.headers.correlationId = req.headers.correlationId || uuid.v4();
    return trigger(req)
      .then(function (success) {
        if (success) {
          logger.info('Successfully triggered alert for camera %s', req.body.camera);
          res.status(200).send();
        }
        res.status(500).send();
      })
      .catch(function(error) {
        logger.error(error.message);
        res.status(error.statusCode).send(error.message);
      });
  });
};
