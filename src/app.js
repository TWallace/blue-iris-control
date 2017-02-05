'use strict';

var express = require('express'),
  handlers = require('require-all')(__dirname + '/handlers'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('../util/logger.js')(module),
  uuid = require('uuid');

function handleErrors(error, req, res) {
  logger.error(error.stack);
  return res.status(500).send(error.message);
}

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('port', process.env.port || 3000);

app.post('/trigger', function (req, res) {
  req.headers.correlationId = req.headers.correlationId || uuid.v4();
  return handlers.trigger(req)
    .then(function (success) {
      if (success) {
        res.status(200).send();
      }
      res.status(500).send();
    })
    .catch(function(error) {
      return handleErrors(error, req, res);
    });
});

app.use(function (req, res) {
  res.status(404).send('File Not Found');
});

app.use(function (error, req, res, next) {
  logger.error(error.stack);
  res.status(505).send('Internal Server Error');
});

app.listen(app.get('port'), function () {
  logger.info('Example app listening on port 3000');
});
