'use strict';

var BaseView = require('lib/views/baseView'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    stateModel = require('models/stateModel'),
    SearchView;

/**
 * View for header
 * @class SearchView
 */
SearchView = BaseView.extend({

    /**
     * template
     * @member {string} template
     * @memberof SearchView
     */
    template: 'search',

    /**
     * ui hash for search
     * @member {object} ui hash of key:'jquery selector'
     * @memberof SearchView
     */
    ui: {
        close: '.glyphicon-remove',
        q: '#q'
    },

    /**
     * events for hammerjs
     * @member {object} hammerEvents
     * @memberof SearchView
     */
    hammerEvents: {
        'tap @ui.close': 'onTapClose',
        'tap ul li a': 'onTapClose'
    },

    /**
     * setting up change handler for input here in order to debounce it,
     * can't debounce in the events hash
     * @method onRender
     * @memberof SearchView
     */
    onRender: function () {
        this.ui.q.on('keydown', _.debounce(_.bind(this.onChangeQ, this), 300));
        this.ui.q.focus();
    },

    /**
     * handles closing search view
     * @method onTapClose
     * @memberof SearchView
     * @param {event} e
     */
    onTapClose: function (e) {

        this.$el.parents('#search').removeClass('search-open');

        //destroy after the search view animates, should prob use transitionEnd
        setTimeout(_.bind(function () {

            this.destroy();

        }, this), 350);

    },

    onChangeQ: function () {

        var val = this.ui.q.val().trim();

        if (!val || val.length < 3) {
            return;
        }

        this.model.fetch({
            url: '/api-proxy/autocomplete/locations',
            data: {
                q: this.ui.q.val()
            }
        })
            .done(_.bind(function onDone () {
                this.render('.search-results');
            }, this));

    },

    onDestroy: function () {
        this.ui.q.off();
    }

});

module.exports = SearchView;