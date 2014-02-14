var gulp = require("gulp"),
    log = require("gulp-util").log,
    nodemon = require("gulp-nodemon"),
    jshint = require("gulp-jshint"),
    autoprefixer = require("gulp-autoprefixer"),
    recess = require("gulp-recess"),
    less = require("gulp-less");

var jsfiles = ["*.js", "app/js/**.js"];
var lessfiles = ["app/less/**.less"];

gulp.task("lint", function() {
  log("checking JavaScript files with jshint...");
  gulp.src(jsfiles)
  .pipe(jshint())
  .pipe(jshint.reporter("default"));
});

gulp.task("less", function() {
  log("compiling less files...");
  gulp.src(lessfiles)
  .pipe(less())
  .pipe(autoprefixer("last 2 versions", "Firefox ESR", "> 1%", "ie 8"))
  .pipe(gulp.dest("app/css"));
});

gulp.task("server", function() {
  nodemon({
    script: "./index.js",
    options: "-e html,js,css"
  });
});

gulp.task("watch", function() {
  gulp.watch(jsfiles, ["lint"]);
  gulp.watch(lessfiles, ["less"]);
});

gulp.task("default", ["lint", "less"]);

gulp.task("dev", ["watch", "server"]);