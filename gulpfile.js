/*eslint strict:0*/
/*global require*/

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./css/scss/*.scss')
             .pipe(sass())
             .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function () {
  gulp.watch('./css/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
