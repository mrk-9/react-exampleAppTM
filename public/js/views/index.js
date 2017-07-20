'use strict';

var BaseView = require('lib/views/baseView'),
    stateModel = require('models/stateModel'),
    indexModel = require('models/indexModel'),
    IndexView;

/**
 * View for home page
 * @class IndexView
 */
IndexView = BaseView.extend({

    /**
     * template
     * @member {string} template id
     * @memberof IndexView
     */
    template: 'index',

    /**
     * template
     * @member {string} template id
     * @memberof IndexView
     */
    modelClass: indexModel,

    /**
     * initializes the view
     * @method initialize
     * @memberof IndexView
     */
    initialize: function () {

        var location = stateModel.get('location');

        if (location) {
            this.updateList(location);
        } else {
            this.listenTo(stateModel, 'change:location', this.onChangeLocation);
        }

    },

    updateList: function (coords) {

        this.model.fetch({
            data: {
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        })
            .done(_.bind(function () {
                this.render(['.local-locations']);
            }, this))
            .fail(_.bind(function () {
                console.error(arguments);
            }, this));

    },

    /**
     * handles the location changing for this view
     * @method onChangeLocation
     * @memberof IndexView
     */
    onChangeLocation: function (model, value) {

        this.updateList({
            latitude: value.latitude,
            longitude: value.longitude
        });

    },

    /**
     * custom cleanup code for stateModel
     * @method onDestroy
     * @memberof IndexView
     */
    onDestroy: function () {

        this.stopListening();

    }

});

module.exports = IndexView;