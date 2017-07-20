'use strict';

// Configure Grunt.
module.exports = function (grunt) {

    require('load-grunt-config')(grunt);

    grunt.registerTask('test-client-unit', [
        'clean:coverage-client-unit',
        'karma:ci'
    ]);

    grunt.registerTask('test-server-unit', [
        'mochacli'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'test-client-unit',
        'test-server-unit',
        'docs'
    ]);

    grunt.registerTask('docs', [
        'clean:client-docs',
        'clean:server-docs',
        'jsdoc'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);

    grunt.registerTask('compile', [
        'less:dev',
        'dustjs'
    ]);

    grunt.registerTask('dev', [
        'compile',
        'concurrent'
    ]);

};



