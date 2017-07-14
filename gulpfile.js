var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
// =========== LOAD MODULES ============ //


gulp.task('html',require('./gulp-task/html'));
gulp.task('style',require('./gulp-task/style'));
gulp.task('js',require('./gulp-task/js'));
gulp.task('assets', require('./gulp-task/assets'));

gulp.task('webserver',function(){
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            fallback: 'index.html',
            open: true
        }));
});


gulp.task('default', ['html', 'style','js','webserver','assets']);
