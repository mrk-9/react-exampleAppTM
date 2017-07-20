'use strict';

module.exports = function(grunt) {
    return {
        server: {
            src: [
                'routes/**/*.js',
                'services/**/*.js'
            ],
            options: {
                destination: 'server-docs'
            }
        },
        client: {
            src: [
                'public/js/**/*.js',
                '!public/js/dist/**/*.js'
            ],
            options: {
                destination: 'client-docs'
            }
        }
    };
};