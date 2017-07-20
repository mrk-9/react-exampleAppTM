'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    IndexModel;
/**
 * Model for the index page
 * @class IndexModel
 */
IndexModel = Backbone.Model.extend({

    /**
     * url
     * @member {string} url the url to call for xhr actions
     * @memberof IndexModel
     */
    url: '/api-proxy/locations'


});


module.exports = IndexModel;