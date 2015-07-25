/// Required packages.
const path = require("path");
const babelify = require("babelify");
const browserify = require("browserify");
const watchify = require("watchify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;
const sequence = require("run-sequence");
const uglify = require("gulp-uglify");



/// Gulp & Plugins.
const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");


var watch = true;

/**
 * Bundles a set of files with a path, filename and production flag.
 *
 * The flag controls whether to uglify the code and generate source maps.
 */
var bundle = function (bundler, path) {
    gutil.log("Bundling on:", gutil.colors.yellow(path));

    return bundler.bundle()
        .on("error", function (err) {
            gutil.log("Error bundling:", gutil.colors.red(err.message));
            this.emit("end");
        })
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(gulpif(process.env.isProduction, uglify({mangle: false})))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path))
        .on("end", function () {
            gutil.log("Created bundle:", gutil.colors.green(path + "/bundle.js"));
        });
};






/**
 * Creates an app build task.
 */
gulp.task("build-sources", [], function () {
    var browserifyOptions = {
        entries     : "./src/main.module.js",
        debug       : true,
        cache       : {},
        packageCache: {}
    };

    var bundler = null;
    if (watch) {
        bundler = watchify(browserify(browserifyOptions))
    } else {
        bundler = browserify(browserifyOptions);
    }

    bundler.external("angular")
        .external("ngAnimate")
        .transform(babelify.configure({
            sourceMapRelative: __dirname + "/public/src",
            optional         : ["runtime"],
            compact          : false
        }));

    if (watch) {
        bundler.on("update", function () {
            return bundle(bundler, "./dist");
        });
    }

    return bundle(bundler, "./dist");
});




