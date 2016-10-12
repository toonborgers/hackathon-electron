'use strict';

import karma from "karma";

let childProcess = require('child_process');
let electron = require('electron');
let gulp = require('gulp');
let jetpack = require('fs-jetpack');

let projectDir = jetpack;
let destDir = projectDir.cwd('./build');

gulp.task('clean', ()=> {
    return destDir.dirAsync('.', {empty: true});
});

gulp.task('run', () => {
    childProcess.spawn(electron, ['--debug=5858', './app'], {stdio: 'inherit'});
});

gulp.task("test:unit", callback => {
    new karma.Server(
        {
            configFile: __dirname + '/test/unit/karma.conf.js',
            singleRun: true
        },
        function(){
            callback();
        })
        .start();
});