'use strict';

var dust = require('dustjs-linkedin'),
    dustHelpers = require('dustjs-helpers'),
    templateLoader = require('lib/util/templateLoader'),
    dustLoader;

/**
 * loads dust templates async
 * @module lib/util/dustLoader
 * @namespace lib/util/dustLoader
 */

/**
 * @function dustOnLoad
 * @memberof lib/util/dustLoader
 * @param {string} name name of the template
 * @param {function} callback the callback to execute
 */
function dustOnLoad (name, callback) {

    templateLoader(name, function onLoadTemplate (err, template) {
        setTimeout(callback, 0);
    });

}

dust.onLoad = dustOnLoad;

module.exports = dustOnLoad;