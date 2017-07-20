'use strict';

/**
 * Simple module for storing config
 * @module config
 * @namespace config
 */


var config = {

    analytics: {
        prod: 'UA-xxxxxxxx-1',
        dev: 'UA-xxxxxxxx-1',
        url: 'localhost'
    },

    applicationView: {
        el: 'body'
    },

    tasteMadeApplication: {
        initialState: 'initialState'
    },

    viewController: {
        templatePath: '/templates'
    }
};

module.exports = config;