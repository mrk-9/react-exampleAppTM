'use strict';

var Marionette = require('backbone.marionette'),
    _ = require('underscore'),
    BaseRegion;
/**
 * Base Region for the application
 * @class BaseRegion
 */
BaseRegion = Marionette.Region.extend({

    /**
     * create a new view with the region's el, then attach it
     * @method attachNewView
     * @memberof BaseRegion
     * @param {Object} viewClass the view to create and attach
     */
    attachNewView: function(viewClass, model) {

        var $regionEl = $(this.el),
            viewOpts = {},
            viewInstance;

        $regionEl.wrapInner($('<div>'));
        viewOpts.el = $regionEl.find('> div');

        if (model) {
            viewOpts.model = model;
        }

        viewInstance = new viewClass(viewOpts);

        viewInstance.bindUIElements();

        if ('childView' in viewInstance && viewInstance.childView) {
            viewInstance.bindChildViews();
        }

        this.currentView = viewInstance;

        this.triggerMethod('before:show', viewInstance);
        this.triggerMethod.call(viewInstance, 'before:show');

        this.triggerMethod('show', viewInstance);

        if (_.isFunction(viewInstance.triggerMethod)) {
            viewInstance.triggerMethod('show');
        } else {
            this.triggerMethod.call(viewInstance, 'show');
        }

        //triggering render here as well to keep the api consistent even though it's just being attached
        viewInstance.triggerMethod('before:render', this);
        viewInstance.triggerMethod('render', this);
    },

    /**
     * show a view in a region, overriding Marionette Region show to render view async
     * @method show
     * @memberof BaseRegion
     * @param {object} view the view to show in the region
     */
    show: function (view, options) {

        function callOpenRegion () {

            if (isChangingView) {
                this.triggerMethod('before:swap', view);
            }

            this.triggerMethod('before:show', view);
            this.triggerMethod.call(view, 'before:show');

            this.attachHtml(view);
            this.currentView = view;

            if (isChangingView) {
                this.triggerMethod('swap', view);
            }

            this.triggerMethod('show', view);

            if (_.isFunction(view.triggerMethod)) {
                view.triggerMethod('show');
            } else {
                this.triggerMethod.call(view, 'show');
            }

            deferred.resolve();

        }

        var deferred = $.Deferred();

        this._ensureElement();

        var showOptions = options || {};
        var isDifferentView = view !== this.currentView;
        var preventDestroy =  !!showOptions.preventDestroy;
        var forceShow = !!showOptions.forceShow;

        // we are only changing the view if there is a view to change to begin with
        var isChangingView = !!this.currentView;

        // only destroy the view if we don't want to preventDestroy and the view is different
        var _shouldDestroyView = !preventDestroy && isDifferentView;

        if (_shouldDestroyView) {
            this.empty();
        }

        // show the view if the view is different or if you want to re-show the view
        var _shouldShowView = isDifferentView || forceShow;

        if (_shouldShowView) {
            view.once('destroy', _.bind(this.empty, this));
            view
                .render()
                .done(_.bind(callOpenRegion, this));

        }

        return deferred.promise();

    }

});

module.exports = BaseRegion;