'use strict';

var BaseView = require('lib/views/baseView'),
    LocationVideoView;

/**
 * view for video detail page
 * @class LocationVideoView
 */
LocationVideoView = BaseView.extend({

    /**
     * template
     * @member {string} template id
     * @memberof LocationVideoView
     */
    template: 'locationVideo'

});

module.exports = LocationVideoView;