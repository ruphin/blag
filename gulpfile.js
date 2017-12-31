const gulp = require('gulp');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const rollup = require('gulp-rollup');
const uglify = require('gulp-uglify-es').default;

const includePathOptions = {
  include: {},
  paths: ['node_modules/gluonjs'],
  external: [],
  extensions: ['.js']
};

gulp.task('build', () => {
  return gulp
    .src('src/blag-app.js')
    .pipe(sourcemaps.init())
    .pipe(uglify({ toplevel: true, mangle: true, compress: { passes: 2 } }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

// Build production files, the default task
gulp.task('default', ['build', 'nomodule']);

// Serve from source
gulp.task('serve', () => {
  browserSync({
    port: 5000,
    notify: false,
    open: false,
    logPrefix: 'APP',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    server: {
      baseDir: ['examples', '.', 'node_modules']
    },
    middleware: function(req, res, next) {
      if (!req.url.match(/\.html|\.js/)) {
        req.url = '/';
      }
      return next();
    }
  });

  gulp.watch(['src/*.js', 'index.html'], browserSync.reload);
});
