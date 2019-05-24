const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

var paths = {
    buildScripts: "./build/js",
    srcScripts: "./src/js/*.js",
    buildStyles: "./build/css",
    srcStyles: "./src/sass/*.scss",
    buildHtml: "./build",
    srcHtml: "./src/*.html"
}

function html() {
  return src(paths.srcHtml)
    .pipe(dest(paths.buildHtml))
    .pipe(browserSync.stream());
}

function css() {
  return src(paths.srcStyles)
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest(paths.buildStyles))
    .pipe(browserSync.stream());
}

function js() {
  return src(paths.srcScripts, { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest(paths.buildScripts, { sourcemaps: true }))
    .pipe(browserSync.stream());
}


function initBrowserSync(){
   browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
}

function watchFiles(){
    watch(paths.srcHtml, html);
    watch(paths.srcStyles, css);
    watch(paths.srcScripts, js);
    browserSync.reload();
}


exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(initBrowserSync,watchFiles)