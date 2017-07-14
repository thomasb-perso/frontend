var gulp = require('gulp');

module.exports = function () {

            return gulp.src('style/assets/*')
                .pipe(gulp.dest('dist/img'));

}