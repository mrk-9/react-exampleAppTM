'use strict';

var Marionette = require('backbone.marionette'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    hasProp = require('lib/util/hasPropValue'),
    BaseView = require('lib/views/baseView'),
    BaseCollectionView = require('lib/views/baseCollectionView'),
    modelUtil = require('lib/util/modelUtil'),
    BaseCompositeView;

/**
 * Base Composite View for the application
 * @class BaseCompositeView
 */
BaseCompositeView = Marionette.CompositeView.extend({

    /**
     * calling composite view constructor and baseView normalizeHammerEvents
     * @method constructor
     * @memberof BaseCompositeView
     */
    constructor: function (options) {

        BaseCollectionView.prototype.constructor.apply(this, arguments);

    },

    /**
     * aliasing method from base collection view
     * @method initData
     * @memberof BaseCompositeView
     */
    initData: BaseCollectionView.prototype.initData,

    /**
     * aliasing method from base collection view
     * @method attachChild
     * @memberof BaseCompositeView
     */
    attachChild: BaseCollectionView.prototype.attachChild,

    /**
     * aliasing method from base collection view
     * @method attachCollection
     * @memberof BaseCompositeView
     */
    attachCollection: BaseCollectionView.prototype.attachCollection,

    /**
     * aliasing method from base collection view
     * @method _addAttachedChild
     * @memberof BaseCompositeView
     */
    _addAttachedChild: BaseCollectionView.prototype._addAttachedChild,

    /**
     * looks at the elements in the view el, creates views with the appropriate models for each item
     * @method bindChildViews
     * @memberof BaseCompsiteView
     */
    bindChildViews: function () {
        this._ensureViewIsIntact();
        this.isRendered = true;
        this.triggerMethod('before:render', this);
        this._bindChildren();
        this.triggerMethod('render', this);
        return this;
    },

    /**
     * kicks off process to build child views and attach correct models
     * @method _bindChildren
     * @memberof BaseCompsiteView
     * @private
     */
    _bindChildren: function() {

        if (this.isRendered) {
            BaseCollectionView.prototype._bindChildren.call(this);
        }

    },

    /**
     * returns the already rendered list of child nodes to use to attach views and models to
     * @method getChildNodes
     * @memberof BaseCompsiteView
     */
    getChildNodes: function () {
        var container = this.getChildViewContainer(this);
        return container.children();
    },

    /**
     * renders the main template, then binds the children views
     * @method render
     * @memberof BaseCompositeView
     * @returns {jQuery.Deferred} deferred A jQuery deferred object to allow chaining
     */
    render: function (collection, options) {

        var deferred = $.Deferred();

        //if a collection is being passed to render, it's coming from a reset event
        //we need to sync up the model with the new collection, so that the render will work
        //with the way we're rendering collections in dust

        if (collection) {
            BaseCollectionView.prototype.updateModelCollection.call(this, collection);
        }

        this._ensureViewIsIntact();
        this.isRendered = true;
        this.resetChildViewContainer();

        this.triggerMethod('before:render', this);

        this._renderRoot()
            .done(_.bind(function onRenderRoot () {
                this._bindChildren();
                this.triggerMethod('render', this);
                deferred.resolve(this);
            }, this));

        return deferred.promise();

    },

    /**
     * render main template
     * @method _renderRoot
     * @memberof BaseCompositeView
     * @private
     * @returns {jQuery.Deferred} deferred A jQuery deferred object to allow chaining
     */
    _renderRoot: function () {

        var deferred = $.Deferred(),
            data = {},
            template;

        data = this.serializeData();
        data = this.mixinTemplateHelpers(data);

        this.triggerMethod('before:render:template');

        template = this.getTemplate();

        Marionette.Renderer.render(template, data, _.bind(function onRenderSuccess (html) {

            this.attachElContent(html);
            this.bindUIElements();

            this.triggerMethod('render:template');

            deferred.resolve();


        }, this));

        return deferred.promise();
    },

    /**
     * gets nested model data if needed,
     * parses string to build the path
     * @memberof BaseCompositeView
     */
    getModelData: modelUtil.getModelData,

    /**
     * sets nested model data if needed,
     * parses string to build the path
     * @memberof BaseCompositeView
     */
    setModelData: modelUtil.setModelData

});

module.exports = BaseCompositeView;
