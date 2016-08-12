'use strict';

var gulp         = require('gulp');
var less         = require('gulp-less');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var copy         = require('gulp-copy');
var runSequence  = require('run-sequence');
var browserSync  = require('browser-sync');

gulp.task('js', function(){
  return gulp.src([
    './bower_components/angular/angular.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',

    './assets/js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
  
  gulp.watch("./less/default/*.less", ['less']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('less', [], function() {
  return gulp.src('./less/default/styles.less')
  .pipe(less())
  .pipe(gulp.dest('./css'))
  .on('end', browserSync.reload);
});

gulp.task('setup', [], function() {
  /* Set up awesome font. */
  gulp.src('./bower_components/components-font-awesome/fonts/*.*')
  .pipe(gulp.dest('./fonts'));

  gulp.src('./bower_components/components-font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('./css'));

  /* Set up bootstrap css.  */
  gulp.src('./bower_components/bootstrap-css-only/css/bootstrap.min.css')
  .pipe(gulp.dest('./css'));
})

gulp.task('build', [], function() {
  runSequence('js', 'less');
});

gulp.task('default', ['build'], function() {});