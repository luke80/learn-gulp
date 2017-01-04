// require gulp
var gulp = require('gulp');

//browser-sync!!!
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

//default task
gulp.task('default', ['browser-sync', 'html']);

//Browser sync!!!
var config1 = {
    server: {
        baseDir: "./GitHub/learn-gulp/Learn%20Gulp/dist/"
    },
    startPath: "index.html",
    host: "localhost.byu.edu"
    //proxy: "localhost.byu.edu"
};
var config2 = {
    proxy: "localhost.byu.edu",
    startPath: "./GitHub/learn-gulp/Learn%20Gulp/dist/index.html"
};
var config3 = {
    proxy: "is.byu.edu",
    startPath: "./"
};
gulp.task('browser-sync', function() {
    browserSync.init(config2);
    
    gulp.watch('./src/js/**\/*.js', ['scripts-browser-reload']);
    gulp.watch('./src/sass/*.scss', ['styles']);
    gulp.watch("**\/*.html").on("change", reload);
});

//styles task
gulp.task('styles', function() {
    return gulp.src('./src/sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./dist/css/'))
      .pipe(cssmin())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.stream({match: '**\/*.css'}));
});

//scripts task
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'))
    //	.pipe(browserSync.stream({match: '**\/*.js'}))
    ;
});
gulp.task('scripts-browser-reload', ['scripts'], function() {
    browserSync.reload();
});

//html task
gulp.task('html', function() {
    return gulp.src('./src/**\/*.html')
    .pipe(gulp.dest('./dist/'))
    //.pipe(reload)
    ;
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('./src/**\/*.html', ['html']);
});
