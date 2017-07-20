'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    config = require('config').tasteMadeApplication,
    stateModel = require('models/stateModel');

/**
 * Main application class for bootstrapping and starting the app
 * @class TasteMadeApplication
 */
var TasteMadeApplication = Marionette.Application.extend({

    /**
     * configure the application to grab context from the server,
     * then resume the normal marionette startup sequence
     * @method start
     * @memberof TasteMadeApplication
     */
    start: function () {

        this.configure();
        Marionette.Application.prototype.start.apply(this, arguments);

    },

    /**
     * get state from body data
     * @method getInitialState
     * @return {Object} Returns initial app state data
     * @memberof TasteMadeApplication
     */
    getInitialState: function () {

        var stateElement = document.getElementById(config.initialState || 'initialState'),
            state = JSON.parse($(stateElement).html());
        return state;

    },

    /**
     * grab the intial state from the server to bootstrap the application
     * and set up Backbone.history
     * @method configure
     * @memberof TasteMadeApplication
     */
    configure: function () {

        this.addInitializer(function viewInitializer (options) {

            stateModel.set(this.getInitialState(), { silent: true });
            stateModel.set({ isInitial: true });

            this.on('start', function () {

                // initialize history with silent: true because the page was rendered by the server
                if (!Backbone.History.started) {
                    Backbone.history.start({
                        pushState: true,
                        hashChange: false,
                        silent: true,
                        root: ''
                    });
                }

            });

        });

    }

});

module.exports = TasteMadeApplication;