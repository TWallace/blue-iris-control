'use strict';

var config = require('config-yml'),
  http = require('request-promise'),
  md5 = require('./md5Hash.js'),
  logger = require('../../util/logger.js')(module),
  _ = require('lodash');

module.exports = function () {
  var options = {
    method: 'POST',
    uri: config.blueIrisUrl,
    body: {
      cmd: 'login'
    },
    json: true
  };

  logger.info('Attempting to login to Blue Iris');
  return http.post(options)
  .then(function (response) {
    if (response.result === 'fail') {
      logger.error('Blue Iris login response: ' + JSON.stringify(response));
      throw new Error('Could not login to Blue Iris: ' + response.data.reason);
    }
    var session = response.session;
    if (session) {
      options.body.session = session;
      options.body.response = md5(session);
      return http.post(options)
      .then(function (response) {
        return response.session;
      });
    }
  })
  .catch(function (error) {
    throw error;
  });
};
