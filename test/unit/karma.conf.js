var basePath = '../../';

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            basePath + 'bower_components/angular/angular.min.js',
            basePath + 'bower_components/angular-mocks/angular-mocks.js',
            basePath + 'bower_components/angular-animate/angular-animate.js',
            basePath + 'bower_components/angular-aria/angular-aria.js',
            basePath + 'bower_components/angular-material/angular-material.js',
            basePath + 'bower_components/angular-base64/angular-base64.min.js',
            basePath + 'target/dist/scripts/app.min.js',
            'specs/**/*spec.js'
        ],

        reporters: ['progress'],
        port: 9876,
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: 1
    })
};
