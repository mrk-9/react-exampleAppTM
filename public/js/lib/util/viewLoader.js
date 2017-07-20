'use strict';

/**
 * sets up webpack to load views async
 * @module lib/util/viewLoader
 * @namespace lib/util/viewLoader
 */
module.exports = function loadView (expr, callback) {

    require(['bundle!views/' + expr + '.js'], function(bundledResult) {

        bundledResult(function(result) {

            callback(null, result);

        });

    });

};