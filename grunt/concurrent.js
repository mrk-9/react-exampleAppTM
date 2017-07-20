'use strict';

module.exports = function(grunt) {
    return {
        dev: {
            tasks: ['nodemon', 'webpack', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    };
};