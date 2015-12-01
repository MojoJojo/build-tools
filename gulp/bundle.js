/**
 * Created by Nikolay Glushchenko <nick@nickalie.com> on 08.09.2015.
 */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var common = require('./common');
var pkg = common.pkg;
var prod = common.prod;
var replace = require('gulp-replace');

module.exports = function() {
    return gulp.src(['dist/**/*.js', '!dist/work/**/*', 'dist/templates/*.js'])
        .pipe(common.replaceAll())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpif(prod, uglify({mangle: false})))
        .pipe(concat(pkg.mainFile + ".js"))
        .pipe(sourcemaps.write('.', {includeContent: !prod}))
        .pipe(gulp.dest('build'))
        .pipe(gzip())
        .pipe(gulp.dest('build/'));
};
