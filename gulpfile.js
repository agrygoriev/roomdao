const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const cssnano = require("cssnano");
const concatCss = require("gulp-concat-css");
const imagemin = require("gulp-imagemin");
const svgmin = require("gulp-svgmin");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const watch = require("gulp-watch");
const sourcemaps = require("gulp-sourcemaps");
const modules = "./node_modules";

gulp.task("browser-sync", ["css", "html", "js", "img"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  // gulp.task('img:watch', function() {
  //     return watch('./src/img/**', function(){
  //         gulp.src('./src/img/**')
  //             .pipe(gulp.dest('./dist/img'));
  //     });
  // });
  gulp.watch("./src/css/*.css", ["css"]);
  gulp.watch("./src/js/*.js", ["js"]);
  gulp.watch("./src/img/*.{jpg,jpeg,png,gif,svg}", ["img"]);
  gulp.watch("./src/*.html", ["html"]);
  gulp.watch("./dist/*.html").on("change", reload);
  gulp.watch("./dist/js/*.js").on("change", reload);
  gulp.watch("./dist/css/*.css").on("change", reload);
  gulp.watch("./dist/img/**").on("change", reload);
});

gulp.task("html", () => {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
});
gulp.task("css", () => {
  const plugins = [cssnext(), cssnano()];
  return gulp
    .src("./src/css/**/*.css")
    .pipe(concatCss("./style.min.css"))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist/css"));
});
gulp.task("js", () => {
  return gulp.src("./src/js/*.js").pipe(gulp.dest("./dist/js/"));
});
// gulp.task('js:build', function(){
//     return gulp.src(modules + '/jquery/dist/*.{js,map}')
// })
gulp.task("img", () =>
  gulp
    .src("./src/img/**/*.{jpg,jpeg,png,gif,svg}")
    .pipe(gulp.dest("./dist/img"))
);
gulp.task("img:build", () => {
  return gulp
    .src("./src/img/**/*.{jpg,jpeg,png,gif}")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"));
});
gulp.task("svg:build", () => {
  return gulp
    .src("./src/img/**/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("./dist/img"));
});
gulp.task("build", ["img:build", "svg:build", "js", "css", "html"]);
gulp.task("default", ["js", "css", "html"]);
gulp.task("serve", ["browser-sync"]);
