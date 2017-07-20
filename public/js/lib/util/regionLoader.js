'use strict';

/**
 * sets up webpack to load regions async
 * @module lib/util/regionLoader
 * @namespace lib/util/regionLoader
 */
module.exports = function loadRegion (expr, callback) {

        require(['bundle!regions/' + expr + '.js'], function(bundledResult) {

            bundledResult(function(result) {

                callback(null, result);

            });

        });

};