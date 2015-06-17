// Define project paths.
// Note: all of these are relative to the project root.
var projectPaths = {
    scssSources: 'src/scss',
    outputRoot: 'output'
};

// Import required dependencies.
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserSyncReload = browserSync.reload,
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade');

var browserSyncConfig = {
    server: {
        baseDir: './' + projectPaths.outputRoot
    },
    files: [
        projectPaths.outputRoot + '/css/*.css',
        projectPaths.outputRoot + '/*.html',
        projectPaths.outputRoot + '/js/*.js'
    ]
};

gulp.task('sass', function() {
   return gulp.src(projectPaths.scssSources + '/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(projectPaths.outputRoot + '/css'))
        .pipe(filter('**/*.css'))
        .pipe(browserSyncReload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync(browserSyncConfig);
});

gulp.task('jade-compile', function () {
    gulp.src('./src/jade/**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./output/'));
});

gulp.task('copy-html', function() {
   gulp.src(['./src/html/**/*.html'])
        .pipe(gulp.dest('./output/'));
});

gulp.task('copy-image', function() {
   gulp.src(['./src/images/**/*'])
        .pipe(gulp.dest('./output/images'));
});

gulp.task('watch', function() {
    gulp.watch(projectPaths.scssSources + '/*.scss', ['sass']);

    gulp.watch('src/jade/**/*.jade', ['jade-compile']);
    
    gulp.watch('src/html/**/*.html', ['copy-html']);
});

gulp.task('default', 
    ['sass', 'jade-compile', 'copy-html', 'copy-image', 'browser-sync', 'watch']);
