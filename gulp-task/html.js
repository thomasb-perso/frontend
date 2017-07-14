var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var config = require('../lib/config');

module.exports = function () {

    gulp.task('html', function () {

        var templateData = {
                title: 'API Client',
                script: [
                    {src : './build.js'}
                ],
                style: [
                    {href: './style.css'}
                ],
                request_name:config.method
            },
            options = {
                batch : ['./templates/partials'],
            };
    templateData.version=new Date().getTime();
    return gulp.src('./templates/main.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
    });
}

