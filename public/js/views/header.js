'use strict';

var BaseView = require('lib/views/baseView'),
    Backbone = require('backbone'),
    stateModel = require('models/stateModel'),
    SearchView = require('views/search'),
    HeaderView;

/**
 * View for header
 * @class HeaderView
 */
HeaderView = BaseView.extend({

    /**
     * template
     * @member {string} template
     * @memberof HeaderView
     */
    template: 'header',

    /**
     * ui hash for header
     * @member {object} ui hash of key:'jquery selector'
     * @memberof HeaderView
     */
    ui: {
        searchIcon: '.glyphicon-search'
    },

    /**
     * events for hammerjs
     * @member {object} hammerEvents
     * @memberof HeaderView
     */
    hammerEvents: {
        'tap @ui.searchIcon': 'onTapSearch'
    },

    preventShow: true,

    /**
     * handles search tap event
     * @method onTapSearch
     * @memberof HeaderView
     * @param {event} e
     */
    onTapSearch: function (e) {
        var searchView = new SearchView({
            model: new Backbone.Model()
        });

        stateModel.trigger('search', searchView);
    }

});

module.exports = HeaderView;