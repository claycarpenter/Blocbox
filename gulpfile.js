// Define project paths.
// Note: all of these are relative to the project root.
var projectPaths = {
    sources: {
        scss: 'src/scss/**/*.scss',
        html: 'src/html/**/*.html',
        images: 'src/images/**/*',
        jade: 'src/jade/**/*.jade'
    },
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
   return gulp.src(projectPaths.sources.scss)
        .pipe(sass())
        .pipe(gulp.dest(projectPaths.outputRoot + '/css'))
        .pipe(filter('**/*.css'))
        .pipe(browserSyncReload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync(browserSyncConfig);
});

gulp.task('jade-compile', function () {
    gulp.src(projectPaths.sources.jade)
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(projectPaths.outputRoot));
});

gulp.task('copy-html', function() {
   gulp.src(projectPaths.sources.html)
        .pipe(gulp.dest(projectPaths.outputRoot));
});

gulp.task('copy-image', function() {
   gulp.src(projectPaths.sources.images)
        .pipe(gulp.dest(projectPaths.outputRoot + '/images'));
});

gulp.task('watch', function() {
    gulp.watch(projectPaths.sources.scss, ['sass']);

    gulp.watch(projectPaths.sources.jade, ['jade-compile']);
    
    gulp.watch(projectPaths.sources.html, ['copy-html']);
    
    gulp.watch(projectPaths.sources.images, ['copy-image']);
});

gulp.task('build', ['sass', 'jade-compile', 'copy-html', 'copy-image']);

gulp.task('default', 
    ['build', 'browser-sync', 'watch']);
