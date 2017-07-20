'use strict';

var BaseRegion = require('lib/regions/baseRegion'),
    MainRegion,
    mainRegion;
/**
 * Region in the application for the main content area
 * @class MainRegion
 */
MainRegion = BaseRegion.extend({

    /**
     * el for the region
     * @member {string} el jquery selector
     * @memberof MainRegion
     */
    el: '#main'

});

mainRegion = new MainRegion();

module.exports = mainRegion;