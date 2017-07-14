var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');


module.exports = function () {


    return gulp.src('./lib/application.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        //.pipe(highlight())
        .pipe(uglify())
        .pipe(rename('build.js'))
        .pipe(gulp.dest('dist'));
}