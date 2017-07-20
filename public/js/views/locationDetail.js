'use strict';

var BaseView = require('lib/views/baseView'),
    LocationDetailView;

/**
 * view for location detail page
 * @class LocationDetailView
 */
LocationDetailView = BaseView.extend({

    /**
     * template
     * @member {string} template id
     * @memberof LocationDetailView
     */
    template: 'locationDetail'

});

module.exports = LocationDetailView;