var gulp = require('gulp'),
coffee = require('gulp-coffee'),
gutil = require('gulp-util');

var coffeeSources = ['/components/coffee/*.coffee'];

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