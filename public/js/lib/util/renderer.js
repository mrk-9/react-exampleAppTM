'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    dust = require('dustjs-linkedin'),
    dustHelpers = require('dustjs-helpers'),
    dustLoader = require('lib/util/dustLoader');

/**
 * Overriding render method of Marionette.Renderer
 * @class Marionette.Renderer
 */
Marionette.Renderer = {

    /**
     * render method for all templates
     * @method render
     * @memberof Marionette.Renderer
     * @param template
     * @param data
     * @param callback
     */
    render: function (template, data, callback) {

        var html;
        dust.render(template, data, function onDustRender (err, out) {
            html = out;
            callback(html);
        });

    }

};