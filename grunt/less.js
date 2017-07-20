'use strict';

module.exports = function(grunt) {
    return {
        dev: {
            options: {
                paths: ['public/stylesheets']
            },
            files: {
                'public/css/app.css': 'public/css/app.less'
            }
        },
        build: {
            options: {
                cleancss: true,
                report: 'min',
                paths: ['public/stylesheets']
            },
            files: {
                'public/css/app.css': 'public/css/app.less'
            }
        }
    };
};