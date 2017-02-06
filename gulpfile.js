'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  apiDoc = require('gulp-apidoc');

gulp.task('apiDocs', function (done) {
  apiDoc({
    src: 'src/routes/',
    dest: 'docs/'
  }, done);
});

gulp.task('server', ['apiDocs'], function () {
  nodemon({
    script: 'src/app.js',
    ext: 'js'
  })
    .on('restart', function () {
      console.log('restarted');
    });
});
