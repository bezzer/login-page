var gulp = require("gulp");
var connect = require("gulp-connect");
var webpack = require("webpack-stream");

gulp.task('serve', function () {
  connect.server({
    root: 'dist',
    livereload: {port: 34567},
    port: 8000
  });
});

gulp.task('webpack', function () {
  return gulp.src('./src/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.js', ['webpack']);
  gulp.watch('./src/**/*.css', ['css']);
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/images/**/*.{jpeg,jpg,gif,png,svg}', ['images']);
});

gulp.task('css', function () {
  gulp.src('./src/**/*.css')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('images', function () {
  gulp.src('./src/**/*.{jpeg,jpg,gif,png,svg}')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', ['css','html', 'images']);
gulp.task('build', ['copy', 'webpack']);
gulp.task('default', ['build', 'serve', 'watch']);