'use strict';

module.exports = function(grunt) {

    return {
        dev: {
            script: 'bin/www',
            options: {
                callback: function (nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour);
                    });
                },
                env: {
                    DEBUG: 'exampleApp'
                },
                cwd: '.',
                ignore: ['node_modules/**'],
                ext: 'js',
                watch: ['routes', 'services', 'app.js', 'lib']
            }
        }
    };
};