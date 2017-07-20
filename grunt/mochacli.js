'use strict';

module.exports = function(grunt) {

    return {
        options: {
            globals: ['chai'],
            timeout: 12000,
            ignoreLeaks: false,
            ui: 'bdd',
            reporter: 'spec',
            colors: true
        },
        all: ['test/*.js']
    }
};
