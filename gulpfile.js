var gulp = require('gulp'),
coffee = require('gulp-coffee'),
concat = require('gulp-concat'),
gutil = require('gulp-util');

var coffeeSources = ['/components/coffee/*.coffee'];
var jsSources = ['/components/scripts/*.js'];

// This task takes all of your js code in your 
// scripts folder and concatenates them then
// moves them to the dev/js folder
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('builds/development/js'))
});

// this task converts our coffee script code and
// converts it to js. Then it sends it to the scripts
// folder
gulp.task('coffee', function () {
    gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
        .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('log', function() {
gutil.log('Workflows are awesome');
});