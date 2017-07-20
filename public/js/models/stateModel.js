'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    StateModel;
/**
 * Global state of the application, contains data from state sent by the server
 * @class StateModel
 */
StateModel = Backbone.Model.extend({

    /**
     * request new page for the application
     * @method request
     * @memberof StateModel
     * @param {string} url the url passed from the controller
     * @param {object} params any querystring parameters if there were some as an object of key/value pairs
     * @see ApplicationController
     */
    request: function (url, params) {

        var fetchOptions = {};

        if (url) {
            this.url = '/' + url;
        } else {
            this.url = '/';
        }

        if (params) {
            fetchOptions.data = params;
        }

        this.trigger('request:start');

        this.fetch(fetchOptions)
            .done(_.bind(this.broadcastRequest, this))
            .fail(_.bind(this.broadcastError, this));

    },

    /**
     * trigger request success on stateModel
     * @method broadcastRequest
     * @memberof StateModel
     * @param model
     * @param response
     * @param options
     */
    broadcastRequest: function (model, response, options) {
        this.trigger('request:success', response);
    },

    /**
     * trigger request:error on stateModel
     * @method broadcastError
     * @memberof StateModel
     * @param model
     * @param response
     * @param options
     */
    broadcastError: function (model, response, options) {
        this.trigger('request:error', response);
    }

});

var stateModel = new StateModel();

module.exports = stateModel;