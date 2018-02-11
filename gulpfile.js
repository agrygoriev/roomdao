
const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    cssnano = require('cssnano'),
    concatCss = require('gulp-concat-css'),
    imagemin   = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    watch = require('gulp-watch'),
    // pump = require('pump');
    // minify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');
const modules = './node_modules';

gulp.task('browser-sync', ['css', 'html', 'js', 'img'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    // gulp.task('img:watch', function() {
    //     return watch('./src/img/**', function(){
    //         gulp.src('./src/img/**')
    //             .pipe(gulp.dest('./dist/img'));
    //     });
    // });
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/img/*.{jpg,jpeg,png,gif,svg}', ['img']);
    gulp.watch('./src/*.html', ['html'])
    gulp.watch('./dist/*.html').on('change', reload);
    gulp.watch('./dist/js/*.js').on('change', reload);
    gulp.watch('./dist/css/*.css').on('change', reload);
    gulp.watch('./dist/img/**').on('change', reload);
})

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});
gulp.task('css', function() {
    var plugins = [
        cssnext(),
        cssnano()
    ];
    return gulp.src('./src/css/**/*.css')
        .pipe(concatCss('./style.min.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist/css'))
});
gulp.task('js', function(){
    return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js/'))
});
// gulp.task('js:build', function(){
//     return gulp.src(modules + '/jquery/dist/*.{js,map}')
// })
gulp.task('img', function () {
    return gulp.src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(gulp.dest('./dist/img'))
})
gulp.task('img:build', function () {
    return gulp.src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('build', ['img:build','js','css','html'])
gulp.task('default', ['js', 'css', 'html']);
gulp.task('serve', ['browser-sync']);
