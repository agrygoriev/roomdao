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

// const sourcemaps = require("gulp-sourcemaps");
// const modules = "./node_modules";

gulp.task("default", ["css", "html", "js", "img"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    browser: "firefox"
  });
  gulp.watch("./src/css/*.css", ["css"]);
  gulp.watch("./src/js/*.js", ["js"]);
  gulp.watch("./src/img/**/*.{jpg,jpeg,png,gif,svg}", ["img"]);
  gulp.watch("./src/*.html", ["html"]);
  gulp.watch("./dist/*.html", reload);
  gulp.watch("./dist/js/*.js", reload);
  gulp.watch("./dist/css/*.css", reload);
  gulp.watch("./dist/img/**", reload);
  // gulp.task('img:watch', function() {
  //     return watch('./src/img/**', function(){
  //         gulp.src('./src/img/**')
  //             .pipe(gulp.dest('./dist/img'));
  //     });
  // });
});

gulp.task("html", () =>
  gulp
    .src("./src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeAttributeQuotes: true
      })
    )
    .pipe(gulp.dest("./dist"))
);
gulp.task("css", () => {
  const plugins = [cssnext(), cssnano({ preset: "advanced" })];
  gulp
    .src("./src/css/**/*.css")
    .pipe(concatCss("./style.min.css"))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist/css"));
});
gulp.task("js", () => gulp.src("./src/js/*.js").pipe(gulp.dest("./dist/js/")));
gulp.task("img", () =>
  gulp
    .src("./src/img/**/*.{jpg,jpeg,png,gif,svg}")
    .pipe(gulp.dest("./dist/img"))
);
gulp.task("img:build", () =>
  gulp
    .src("./src/img/**/*.{jpg,jpeg,png,gif}")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"))
);
gulp.task("svg:build", () =>
  gulp
    .src("./src/img/**/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("./dist/img"))
);
gulp.task("build", ["img:build", "svg:build", "js", "css", "html"]);
