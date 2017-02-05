'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

gulp.task('server', function() {
  nodemon({
    script: 'src/app.js',
    ext: 'js'
  })
    .on('restart', function() {
      console.log('restarted');
    });
});
