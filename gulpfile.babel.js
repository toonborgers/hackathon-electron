'use strict';

let karma = require('karma');
let childProcess = require('child_process');
let electron = require('electron');
let gulp = require('gulp');
let concat = require('gulp-concat');
let concatCss = require('gulp-concat-css');
let plumber = require('gulp-plumber');
let uglify = require('gulp-uglify');
let order = require('gulp-order');
let rename = require('gulp-rename');
let sourceMaps = require('gulp-sourcemaps');
let runSequence = require('run-sequence');
let mainBowerFiles = require('main-bower-files');
let extReplace = require('gulp-ext-replace');
let ngAnnotate = require('gulp-ng-annotate');
let del = require('del');

const targetDir = 'target';
const appDir = 'app';
const distDir = `${targetDir}/dist/`;
const vendorDir = `${distDir}/vendor`;

const files = {
    js: `${appDir}/scripts/**/*.js`,
    html: `${appDir}/**/*.html`,
    assets: `${appDir}/assets/**/*`,
    electronMain: `${appDir}/main.js`,
    electronPackage: `${appDir}/package.json`,
    iconfontFiles: 'bower_components/material-design-icons/iconfont/*.+(css|eot|woff2|woff|ttf)'
};

gulp.task('clean', ()=> {
    del.sync(`${distDir}`);
});

gulp.task('run', callback => {
    runSequence(
        'build',
        'run:electron',
        callback
    )
});

gulp.task('test', callback => {
    runSequence(
        'build:test',
        'test:unit',
        callback
    )
});

gulp.task('run:electron', ()=> {
    childProcess.spawn(electron, ['--debug=5858', distDir], {stdio: 'inherit'})
});

gulp.task('build', callback=> {
    runSequence(
        'clean',
        ['build:app'],
        callback
    );
});

gulp.task('build:test', callback=> {
    runSequence(
        'clean',
        ['build:app:test'],
        callback
    );
});

gulp.task('build:app', ['build:app:js', 'build:app:electron', 'build:app:html', 'build:app:assets', 'build:vendor:bower']);
gulp.task('build:app:test', ['build:app:js', 'build:vendor:bower:js']);

gulp.task('build:app:js', () => {
    return gulp.src(files.js)
        .pipe(order([
            '**/*.module.js',
            '**/*.js'
        ]))
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(`${distDir}/scripts`));
});

gulp.task('build:app:electron', ()=> {
    gulp.src([files.electronMain, files.electronPackage])
        .pipe(gulp.dest(`${distDir}`));
});

gulp.task('build:app:html', () =>
    gulp
        .src(files.html)
        .pipe(gulp.dest(`${distDir}`))
);

gulp.task('build:app:assets', () =>
    gulp
        .src(files.assets)
        .pipe(gulp.dest(`${distDir}/assets`))
);

gulp.task('build:vendor:bower', ['build:vendor:bower:js', 'build:vendor:bower:iconfont', 'build:vendor:bower:css']);

gulp.task('build:vendor:bower:js', ()=> {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: '**/*.js'
        }))
        .pipe(extReplace('.js', '.src.js'))
        .pipe(sourceMaps.init())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(vendorDir));
});

gulp.task('build:vendor:bower:css', ()=> {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: path => path.endsWith('.css')
        }))
        .pipe(concatCss('vendor.css'))
        .pipe(gulp.dest(vendorDir + '/css'));
});

gulp.task('build:vendor:bower:iconfont', ()=> {
    return gulp.src(files.iconfontFiles)
        .pipe(gulp.dest(vendorDir + '/css/iconfont'))
});

gulp.task('test:unit', callback => {
    new karma.Server(
        {
            configFile: __dirname + '/test/unit/karma.conf.js',
            singleRun: true
        },
        function () {
            callback();
        })
        .start();
});