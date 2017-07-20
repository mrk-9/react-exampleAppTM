'use strict';

var allJs = [
    'grunt/**/*.js',
    'controllers/**/*.js',
    'lib/**/*.js',
    'models/**/*.js',
    'public/js/**/*.js',
    'services/**/*.js'
];

module.exports = function(grunt) {

    return {
        options: {
            jshintrc: '.jshintrc'
        },
        files: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {
                src: allJs
            }
        }
    };
};