'use strict';

var express = require('express'),
  handlers = require('require-all')(__dirname + '/handlers'),
  app = express(),
  bodyParser = require('body-parser');

function handleErrors(error, req, res) {
  console.error(error.stack);
  return res.status(505).send('Internal Server Error');
}

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('port', process.env.port || 3000);

app.post('/trigger', function (req, res) {
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
  console.error(error.stack);
  res.status(505).send('Internal Server Error');
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000');
});
