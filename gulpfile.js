var gulp = require('gulp'),
coffee = require('gulp-coffee'),
concat = require('gulp-concat'),
browserify = require('gulp-browserify'),
compass = require('gulp-compass'),
gutil = require('gulp-util');

var sassSources = ['/components/sass/style.scss'];
var jsSources = ['/components/scripts/*.js'];
var coffeeSources = ['/components/coffee/*.coffee'];

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
           sass: 'components/sass',
           image: 'builds/development/images',
           style: 'expanded'
        })
        .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
});

// This task takes all of your js code in your 
// scripts folder and concatenates them then
// moves them to the dev/js folder
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify()) //this pipes in our libraries like jquery and mustache
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


// gutil allows you to post things in the terminal to
// troubleshoot how things are working
gulp.task('log', function() {
gutil.log('Workflows are awesome');
});