'use strict';

module.exports = function(grunt) {
    return {
        css: {
            files: ['public/css/**/*.less'],
            tasks: ['less:dev']
        },
        dust: {
            files: ['views/**/*.dust'],
            tasks: ['dustjs']
        }
    };
};