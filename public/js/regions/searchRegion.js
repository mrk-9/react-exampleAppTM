'use strict';

var BaseRegion = require('lib/regions/baseRegion'),
    stateModel = require('models/stateModel'),
    SearchRegion,
    searchRegion;
/**
 * Region in the application for the search
 * @class SearchRegion
 */
SearchRegion = BaseRegion.extend({

    /**
     * el for the region
     * @member {string} el jquery selector
     * @memberof SearchRegion
     */
    el: '#search',

    /**
     * sets up listener for incoming searches
     * @method initialize
     * @memberof SearchRegion
     */
    initialize: function () {

        this.listenTo(stateModel, 'search', this.onSearch);

    },

    /**
     * shows the search View
     * @method onSearch
     * @memberof SearchRegion
     */
    onSearch: function (searchView) {

        this.show(searchView)
            .done(_.bind(function onDone () {
                setTimeout(_.bind(function () {
                    this.$el.addClass('search-open');
                }, this), 100);
            },this));

    }

});

searchRegion = new SearchRegion();

module.exports = searchRegion;