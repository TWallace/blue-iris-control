'use strict';

/**
 * @api {post} /trigger Trigger Camera
 * @apiName Trigger Cameras
 * @apiGroup Camera
 *
 * @apiParam {Array} camera - Camera name. Can be passed in as an array of cameras names, or just a string for one camera.
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
    try {
      logger.info('Trigger called with body: %s', JSON.stringify(req.body));
    } catch(error) {
      logger.info('Could not JSON.stringify(req.body): %s', req.body);
    }
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
