/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    connect = require('gulp-connect');

gulp.task('default', ['connect'], function () {
  shell.task([
  'tsc'
  ], { verbose: true });
});

// connect web server with live reload
gulp.task('connect', function () {
  connect.server({
    root: ".",
    port: 5000
  });
});