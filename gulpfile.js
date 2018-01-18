var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');



gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
        .pipe(sass({outputStyle: 'uncompressed'}).on('error', sass.logError))
    .pipe(sourcemaps.init())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch(['./css/style.css', './js/*.js', '*.html'], function (files){
        livereload.changed(files)
    });
});


gulp.task('default', ['sass', 'watch', 'webserver']);
