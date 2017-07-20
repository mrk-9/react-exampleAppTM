'use strict';

module.exports = function(grunt) {
    return {
        options: {
            configFile: 'karma.conf.js',
            browsers: ['PhantomJS']
        },
        ci: {
            singleRun: true
        },
        dev: {
            singleRun: false
        }
    };
};