'use strict';

/**
 * sets up webpack to load templates async
 * @module lib/util/templateLoader
 * @namespace lib/util/templateLoader
 */
module.exports = function loadTemplate (expr, callback) {

    require(['bundle!templates/' + expr + '.js'], function(bundledResult) {

        bundledResult(function(result) {

            callback(null, result);

        });

    });

};