'use strict';

var Marionette = require('backbone.marionette'),
    _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    BaseView;

/**
 * Base View for the application
 * @class BaseView
 */
BaseView = Marionette.ItemView.extend({

    /**
     * construtctor method, overriding marionette's constructor to
     * normalize ui keys on hammer events
     * @method constructor
     * @memberof BaseView
     * @param options
     */
    constructor: function(options) {
        this.normalizeHammerEvents();
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
    },

    /**
     * normalizing hammer events to be able to use @ui syntax, separate method
     * to allow for code reuse in baseCompositeView
     * @method normalizeHammerEvents
     * @memberof BaseView
     */
    normalizeHammerEvents: function () {
        this.hammerEvents = this.normalizeUIKeys(_.result(this, 'hammerEvents'));
    },

    /**
     * called when a view is shown in a region
     * @method onShow
     * @memberof BaseView
     * @param {event} e the event
     */
    onShow: function (e) {
    },

    /**
     * called when a view is shown in a region,
     * show calls render if in single page app mode
     * and calls onRender if the view is just being attached
     * @method onRender
     * @memberof BaseView
     * @param {event} e the event
     */
    onRender: function (e) {
    },

    /**
     * render the view, overriding built-in render to handle rendering dust asynchronously
     * @method render
     * @memberof BaseView
     * @param {string | array} selector or an array of selectors to update the contents of instead of the entire view
     * @returns {$.Deferred} deferred A jQuery deferred object to allow chaining
     */
    render: function (selector) {

        var deferred = $.Deferred();

        if (selector) {

            this.update(selector)
                .then(_.bind(function onUpdate () {
                    deferred.resolve(this);
                }, this));

        } else {

            this._ensureViewIsIntact();

            this.triggerMethod('before:render', this);

            var data = this.serializeData();
            data = this.mixinTemplateHelpers(data);

            var template = this.getTemplate();

            Marionette.Renderer.render(template, data, _.bind(function onRenderSuccess (html) {

                this.attachElContent(html);
                this.bindUIElements();

                this.triggerMethod('render', this);

                deferred.resolve(this);

            }, this));

        }

        return deferred.promise();

    },

    /**
     * update all or a part of the view
     * @method update
     * @memberof BaseView
     * @param {string | array} selector or an array of selectors to update the contents of instead of the entire view
     * @returns {$.Deferred} deferred A jQuery deferred object to allow chaining
     */
    update: function (selector) {

        var deferred = $.Deferred(),
            l,
            fragment;


        function getUpdatedFragment (selector, html) {

            return $('<div>' + html + '</div>').find(selector);

        }

        if (!selector) {

            this.render();

        } else {

            this.triggerMethod('before:update', this);

            var data = this.serializeData();
            data = this.mixinTemplateHelpers(data);

            var template = this.getTemplate();

            Marionette.Renderer.render(template, data, _.bind(function onRenderSuccess (html) {

                if (_.isArray(selector)) {
                    l = selector.length;
                    while (l--) {
                        this.$(selector[l])
                            .replaceWith(getUpdatedFragment(selector[l], html));
                    }
                } else {
                    this.$(selector)
                        .replaceWith(getUpdatedFragment(selector, html));
                }

                this.triggerMethod('update', this);

                deferred.resolve();

            }, this));

        }

        return deferred.promise();

    }


});

module.exports = BaseView;
