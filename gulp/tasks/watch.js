var gulp           = require('gulp');
var browserifyTask = require('./browserify');

gulp.task('watch', function() {
  // Start browserify task with devMode true/false
  return browserifyTask(false);
});
