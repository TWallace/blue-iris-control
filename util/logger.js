'use strict';

var winston = require('winston'),
  _ = require('lodash'),
  tsFormat = function () {
    return new Date().toLocaleTimeString();
  };

function getModuleName(filename) {
  return _.last(filename.split('\\')).replace('.js', '').toUpperCase();
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
      // new (winston.transports.File)({
      //   timestamp: tsFormat,
      //   colorize: true,
      //   label: getModuleName(src.filename),
      //   filename: 'app.log'
      // })
    ]
  });

  // need to allow env var to override this
  logger.level = 'debug';
  return logger;
};
