'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    ga = require('lib/util/analytics'),
    hasProp = require('lib/util/hasPropValue'),
    config = require('../config').viewController,
    regionLoader = require('lib/util/regionLoader'),
    viewLoader = require('lib/util/viewLoader'),
    $ = require('jquery'),
    _ = require('underscore');

/**
 * View Controller for the application, coordinates models and views being shown
 * based on data from server
 * @class ViewController
 */
var ViewController = Marionette.Controller.extend({

    /**
     * listen to the statemodel for events
     * @method initialize
     * @memberof ViewController
     */
    initialize: function (options) {
        this.model = options.model;
        this.listenToOnce(this.model, 'change:isInitial', this.loadViews);
        this.listenTo(this.model, 'request:success', this.loadViews);
        this.listenTo(this.model, 'request:success', this.trackPageView);
    },

    /**
     * tracks the page view after request:success
     * @method trackPageView
     * @memberof ViewController
     */
    trackPageView: function () {
        ga.pageView(window.location.pathname);
    },

    /**
     * apply the view to a region with a model
     * @method applyViewRegion
     * @memberof ViewController
     * @param {object} regionInstance the region to use
     * @param {object} viewClass the view to either attach or show
     * @param {object} modelClass the model to apply to the view
     * @returns {jQuery.Deferred} deferred.promise a jquery promise that is resolved with the region instance
     */
    applyViewRegion: function (regionInstance, ViewClass, hasCustomModel) {

        var isInitial = this.model.get('isInitial'),
            deferred = $.Deferred(),
            ModelClass;

        ModelClass = hasCustomModel ? ViewClass.prototype.modelClass : Backbone.Model;

        if (isInitial) {
            regionInstance.attachNewView(ViewClass, new ModelClass(_.cloneDeep(this.model.toJSON())));
            deferred.resolve(regionInstance);
        } else {
            regionInstance.show(new ViewClass({
                    model: new ModelClass(_.cloneDeep(this.model.toJSON()))
                }))
                .done(function onShowDone () {
                    deferred.resolve(regionInstance);
                });
        }

        return deferred.promise();
    },

    /**
     * require the region, load the view and optionally a specific model class
     * @method applyView
     * @memberof ViewController
     * @param {string} region the region to load
     * @param {string} view the view to load
     */
    applyView: function(region, view) {

        var deferred = $.Deferred(),
            needsModel,
            model,
            modelName;


        regionLoader(region, _.bind(function onLoadRegion (err, regionInstance) {

            if (err) {
                throw new Error(err);
            } else {
                viewLoader(view, _.bind(function onLoadView (err, ViewClass) {

                    if (err) {
                        throw new Error(err);
                    } else {

                        if (!(regionInstance.currentView && regionInstance.currentView.preventShow)) {

                            needsModel = hasProp(ViewClass.prototype, 'modelClass');

                            if (needsModel) {

                                this.applyViewRegion(regionInstance, ViewClass, true)
                                    .done(function onApplyViewRegionDone () {
                                        deferred.resolve(regionInstance);
                                    });

                            } else {

                                this.applyViewRegion(regionInstance, ViewClass)
                                    .done(function onApplyViewRegionDone () {
                                        deferred.resolve(regionInstance);
                                    });
                            }
                        } else {

                            //just give the view new data
                            model = regionInstance.currentView.model;
                            model.clear({ silent: true });
                            model.set(_.cloneDeep(this.model.toJSON()));
                            deferred.resolve(regionInstance);

                        }

                    }

                }, this));
            }

        }, this));

        return deferred.promise();

    },

    /**
     * loop through the state and apply the views to the regions
     * @method loadViews
     * @memberof ViewController
     * @param {object} state the initial state from the server
     */
    loadViews: function () {

        var map = this.model.get('viewMap'),
            region;

        for (region in map) {
            this.applyView(region, map[region]);
        }

    }


});

module.exports = ViewController;