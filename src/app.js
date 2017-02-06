'use strict';

var express = require('express'),
  _ = require('lodash'),
  routes = require('require-all')(__dirname + '/routes'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('../util/logger.js')(module);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('port', process.env.port || 3000);

_.forEach(routes, function(route) {
  route(app);
});

app.use('/docs', express.static(__dirname + '/../docs'));

app.use(function (req, res) {
  res.status(404).send('File Not Found');
});

app.use(function (error, req, res) {
  logger.error(error.stack);
  res.status(505).send('Internal Server Error');
});

app.listen(app.get('port'), function () {
  logger.info('Example app listening on port 3000');
});
