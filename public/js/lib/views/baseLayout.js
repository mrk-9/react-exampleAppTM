'use strict';

var Marionette = require('backbone.marionette'),
    BaseView = require('lib/views/baseView'),
    BaseLayoutView;
/**
 * Base Layout for all other layouts to inherit from to share functionality
 * @class BaseLayoutView
 */
BaseLayoutView = Marionette.LayoutView.extend({

    /**
     * construtctor method, overriding marionette's constructor to
     * normalize ui keys on hammer events, calling baseView's constructor override at the end
     * @method constructor
     * @memberof BaseLayoutView
     * @param options
     */
    constructor: function(options) {

        BaseView.prototype.normalizeHammerEvents.apply(this, arguments);
        Marionette.LayoutView.prototype.constructor.apply(this, arguments);

    },

    /**
     * render the view, overriding built-in render to handle rendering dust asynchronously
     * calling baseViews render method to stay DRY
     * @method render
     * @memberof BaseLayoutView
     * @returns {$.Deferred} deferred A jQuery deferred object to allow chaining
     */
    render: function () {

        this._ensureViewIsIntact();

        if (this._firstRender) {
            // if this is the first render, don't do anything to
            // reset the regions
            this._firstRender = false;
        } else {
            // If this is not the first render call, then we need to
            // re-initialize the `el` for each region
            this._reInitializeRegions();
        }

        return BaseView.prototype.render.apply(this, arguments);

    }

});

module.exports = BaseLayoutView;