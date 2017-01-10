var gulp = require('gulp');
var exec = require('child_process').exec;
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint')
var combiner = require('stream-combiner2')
var gutil = require('gulp-util')
var cleanCSS = require('gulp-clean-css')
var autoprefixer = require('gulp-autoprefixer')

var pjson = require('./package.json');
var name = pjson.name;
var version = pjson.version;
var projectName = "ju-" + name;

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

console.log("Release Project:" + projectName);

var paths = {
    html: [
        "src/**/*.html",
    ],
    images: [
        "src/images/**/*",
    ],
    js: [
        "src/js/**/*.js",
    ],
    sass: [
        "src/sass/**/*.sass",
    ],
    font: [
        "src/fonts/*.ttf",
    ]
};

var output = "build"; // 文件构建输出地址
var dist = "dist"; // dist目录

/**
 *  Task
 */

gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(gulp.dest(output + "/images"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    gulp.src(paths.html)
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    var combined = combiner.obj([
        gulp.src(paths.js),
        eslint(),
        eslint.format(),
        babel(),
        concat(projectName + ".js"),
        sourcemaps.init(),
        sourcemaps.write('./'),
        gulp.dest(output + "/js"),
        browserSync.stream(),
    ])
    combined.on('error', handleError)
});

gulp.task('font', function() {
    gulp.src(paths.font)
        .pipe(gulp.dest(output + "/css/fonts"));
});

gulp.task('sass', function() {
    var combined = combiner.obj([
        gulp.src(paths.sass),
        sass().on('error', sass.logError),
        sourcemaps.init(),
        autoprefixer({
            browsers: 'last 5 versions'
        }),
        cleanCSS(),
        sourcemaps.write('./'),
        gulp.dest(output + '/css'),
        browserSync.stream(),
    ])
    combined.on('error', handleError)
});

// =============压缩合并build资源============== //
gulp.task('dist', ['images', 'sass', 'html', 'js', 'font'], function() {

    gulp.src(output + "/js/**/*.js")
        .pipe(clean({force: true}))
        .pipe(gulp.dest(dist))

    gulp.src(output + "/css/**/*.css")
        .pipe(clean({force: true}))
        .pipe(concat(projectName + ".css"))
        .pipe(gulp.dest(dist))

    gulp.src(output + "/js/**/*.js")
        .pipe(clean({force: true}))
        .pipe(concat(projectName + ".min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(dist))

    gulp.src(output + "/css/**/*.css")
        .pipe(clean({force: true}))
        .pipe(concat(projectName + ".min.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest(dist))
});

// 默认构建
gulp.task('default', ['images', 'sass', 'html', 'js', 'font'], function() {

    browserSync.init({
        server: __dirname + "/" + output
    });

    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.js, ['js']);
});
