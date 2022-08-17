import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";

var paths = {
  pages: ["src/*.html"],
};
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("docs"));
});

gulp.task('copy-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('docs/css'));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("copy-html", "copy-css"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/ts/main.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("docs"));
  })
);