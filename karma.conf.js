// Karma configuration

var path = require('path'),
    webpack = require('webpack');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai'],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: 'test/**/*Test.js'
            }
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*Test.js': ['webpack']
        },

        webpack: {
            resolve: {
                root: [
                    path.resolve('public'),
                    path.resolve('public/js'),
                    path.resolve('public/components')
                ],
                modulesDirectories: [
                    'components',
                    'node_modules',
                    'templates'
                ],
                alias: {
                    jquery: 'jquery/dist/jquery.js',
                    backbone: 'backbone/backbone.js',
                    underscore: 'lodash/dist/lodash.compat.js',
                    'backbone.marionette': 'marionette/lib/core/backbone.marionette.js',
                    'backbone.hammerjs': 'backbone.hammer.js/backbone.hammer.js',
                    'hammerjs' : 'jquery-hammerjs/jquery.hammer-full.js',
                    'dustjs-linkedin': 'dustjs-linkedin/dist/dust-core.js',
                    'dustjs-helpers': 'dustjs-helpers/dist/dust-helpers.js',
                    velocity: 'velocity/jquery.velocity.js',
                    transition: 'bootstrap/js/transition',
                    collapse: 'bootstrap/js/collapse'
                },
                extensions: ['', '.js', '.json']
            },
            module: {
                loaders: [
                    {
                        test: /jquery\.js$/,
                        loader: "expose?jQuery!expose?$"
                    }
                ]
            },
            stats: {
                colors: true,
                reasons: true
            },
            progress: true,
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    dust: 'dustjs-linkedin',
                    _: 'underscore',
                    Backbone: 'backbone',
                    Marionette: 'backbone.marionette'
                })
            ]
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false

    });
};
