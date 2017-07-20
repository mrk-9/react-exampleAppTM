'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    stateModel = require('models/stateModel'),
    querystring = require('querystring');

/**
 * Controller for basic page level navigation
 * @class ApplicationController
 * @see ApplicationRouter
 */
var ApplicationController = Marionette.Controller.extend({

    /**
     * navigates the app to a new url
     * @method navigate
     * @memberof ApplicationController
     * @param  {string} url URL to navigate to
     */
    navigate: function (url, query) {

        var params;

        if (query) {
            params = querystring.parse(query);
        }

        /* don't want to fire a change event on this
           only unsetting specific things so that new attributes added
           to the stateModel persist throughout the app
        */
        stateModel.unset('data', { silent: true });
        stateModel.unset('viewMap', { silent: true });
        stateModel.unset('isInitial', { silent: true});

        stateModel.request(url, params);


    }

});


module.exports = ApplicationController;