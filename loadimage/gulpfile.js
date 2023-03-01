
var gulp          = require('gulp'),
    babel         = require("gulp-babel"),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    gp_concat     = require('gulp-concat'),
    del           = require('del');




const sass = require('gulp-sass')(require('sass'));



var browserSync   = require('browser-sync').create();

// Specify the Source files
var SRC_JS        = 'src/js/*.js';
var SRC_CSS       = 'src/css/*.scss';

// Specify the Destination folders
var DEST       = 'dist';
var DEST_TOP      = '../dist';

// Example pages
var EXAMPLE_HTML  = 'examples/*.html';

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
 
        .pipe(gp_concat('loadimage.css'))
        .pipe(gulp.dest(DEST))
        .pipe(gulp.dest(DEST_TOP));
 
   gulp.src(['src/photos/*']).pipe(gulp.dest('dist/photos'))

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
exports.watch   = watch;
exports.serve   = serve;
exports.default = serve;