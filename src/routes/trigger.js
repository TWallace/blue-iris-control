'use strict';

/**
 * @api {post} /trigger Trigger Camera
 * @apiName Trigger Cameras
 * @apiGroup Camera
 *
 * @apiParam {String} camera - Camera name
 *
 * @apiSuccess {String} firstname Firstname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
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
