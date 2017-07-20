'use strict';

var BaseRegion = require('lib/regions/baseRegion'),
    HeaderRegion,
    headerRegion;
/**
 * Region in the application for the header
 * @class HeaderRegion
 */
HeaderRegion = BaseRegion.extend({

    /**
     * el for the region
     * @member {string} el jquery selector
     * @memberof HeaderRegion
     */
    el: 'header'

});

headerRegion = new HeaderRegion();

module.exports = headerRegion;