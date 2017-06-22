var gulp = require('gulp'),
coffee = require('gulp-coffee'),
concat = require('gulp-concat'),
browserify = require('gulp-browserify'),
compass = require('gulp-compass'),
connect = require('gulp-connect'),
uglify = require('gulp-uglify'),
gulpif = require('gulp-if'),
gutil = require('gulp-util');

var env,
    coffeeSources,
    jsSources,
    htmlSources,
    jsonSources,
    sassSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/*.coffee'];
jsSources = ['components/scripts/*.js'];

htmlSources = ['outputDir' + '*.html'];
jsonSources = ['outputDir' + 'js/*.json'];
sassSources = ['components/sass/style.scss'];



gulp.task('json', function() {
    gulp.src(jsonSources)
        .pipe(connect.reload())
})

gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        .pipe(connect.reload())
});


// this task called connect, uses the
// the connect variable you created
// to access the method called server
// then creates a server for you
// the root specifies what info to pull from
// the livereload setting needs to be true

gulp.task('connect', function(){
  connect.server({
    root: outputDir,
    livereload: true});
});



// this task is designed to watch for changes made
// to the coffee script, js, or sass files.
// basically, all of our components. We primarily
// will be working out of those folders then sending
// them to the development folder for review.

// when a change has been made it will rerun that task
// so that the dev folder updates

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch(jsonSources, ['json']);
})

// compass process sass and converts it to css
// we then move it to the dev folder for css
// it also creates a css folder in your main folder
gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      css: outputDir + 'css',
      image: outputDir + 'images', //why is the images here?
      style: sassStyle,
      comments: true
    }))
    .on('error', gutil.log)
    .pipe(connect.reload())
    .pipe(gulp.dest(outputDir + 'css'))
});

// This task takes all of your js code in your 
// scripts folder and concatenates them then
// moves them to the dev/js folder

//this pipes in our libraries like jquery and mustache
//this reloads every time there's a change to js
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify()) 
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(connect.reload()) 
        .pipe(gulp.dest(outputDir + 'js'))
});

// this task converts our coffee script code and
// converts it to js. Then it sends it to the scripts
// folder
gulp.task('coffee', function() {
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

// multi-task
gulp.task('default', ['json', 'html', 'coffee', 'js', 'compass','connect', 'watch']);