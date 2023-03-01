// Include the required tools used on tasks
var gulp          = require('gulp'),
    babel         = require("gulp-babel"),
    postcss       = require('gulp-postcss'),

    cssbeautify   = require('gulp-cssbeautify'),
    autoprefixer  = require('autoprefixer'),
    del           = require('del');


var browserSync   = require('browser-sync').create();


var SRC_JS        = 'src/js/*.js';
var SRC_CSS       = 'src/css/*';
var DEST       = 'dist';
var DEST_TOP      = '../dist';


var EXAMPLE_HTML  = 'examples/*.html';


const sass = require('gulp-sass')(require('sass'));


// BUILD JS
function build_js(cb) {
  gulp.src(SRC_JS)
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(gulp.dest(DEST))
        .pipe(gulp.dest(DEST_TOP));

  cb();
}

// BUILD CSS
function build_css(cb) {
  gulp.src(SRC_CSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss( [autoprefixer()] ))
        .pipe(cssbeautify({ autosemicolon: true }))
        .pipe(gulp.dest(DEST))
        .pipe(gulp.dest(DEST_TOP));

  cb();
}


// CLEAN
function clean_js(cb) {
  del.sync([DEST]);

  cb();
}

function clean_css(cb) {
  del.sync([DEST]);

  cb();
}

// WATCH
function watch(cb) {
  gulp.watch(SRC_JS, build_js);
  gulp.watch(SRC_CSS, build_css);

  cb();
}

// SERVE
function serve(cb) {
  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: ["examples", "dist"],
          index: "index.html"
      }
  });

  gulp.watch(SRC_JS, build_js);
  gulp.watch(SRC_CSS, build_css);

  gulp.watch([DEST, EXAMPLE_HTML]).on("change", browserSync.reload);

  cb();
}


// EXPORT methods
exports.clean   = gulp.parallel(clean_js, clean_css);
exports.build   = gulp.parallel(gulp.series(clean_js, build_js), gulp.series(clean_css, build_css));

exports.serve   = serve;
exports.default = serve;
