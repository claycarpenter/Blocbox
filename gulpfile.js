// Define project paths.
// Note: all of these are relative to the project root.
var projectPaths = {
    sources: {
        scss: 'src/scss/**/*.scss',
        html: 'src/html/**/*.html',
        images: 'src/images/**/*',
        jade: 'src/jade/**/*.jade',
        fonts: 'src/fonts/**/*'
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

// TODO: This should probably just use a single static folder...
gulp.task('copy-static', function() {
    // Copy html
   gulp.src(projectPaths.sources.html)
        .pipe(gulp.dest(projectPaths.outputRoot));
    
    // Copy images
   gulp.src(projectPaths.sources.images)
        .pipe(gulp.dest(projectPaths.outputRoot + '/images'));
    
    // Copy fonts
   gulp.src(projectPaths.sources.fonts)
        .pipe(gulp.dest(projectPaths.outputRoot + '/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(projectPaths.sources.scss, ['sass']);

    gulp.watch(projectPaths.sources.jade, ['jade-compile']);
    
    gulp.watch(projectPaths.sources.html, ['copy-static']);
    
    gulp.watch(projectPaths.sources.images, ['copy-image']);
});

gulp.task('build', ['sass', 'jade-compile', 'copy-static']);

gulp.task('default', 
    ['build', 'browser-sync', 'watch']);
