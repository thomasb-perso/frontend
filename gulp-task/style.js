
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

module.exports = function () {

    gulp.task('style', function() {
        gulp.src('./style/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('dist'));
    });
}
