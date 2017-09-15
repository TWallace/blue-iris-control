'use strict';

var winston = require('winston'),
  _ = require('lodash'),
  tsFormat = function () {
    return new Date().toLocaleTimeString('en-US', {
      weekDay: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

function getModuleName(filename) {
  return _.last(filename.split(/\\|\//)).replace('.js', '').toUpperCase();
}

module.exports = function (src) {
  var logger = new (winston.Logger)({
    transports: [
      // colorize the output to the console
      new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        label: getModuleName(src.filename)
      })
    ]
  });

  // need to allow env var to override this
  logger.level = 'debug';
  return logger;
};
