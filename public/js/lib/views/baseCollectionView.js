'use strict';

var Marionette = require('backbone.marionette'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    hasProp = require('lib/util/hasPropValue'),
    BaseView = require('lib/views/baseView'),
    modelUtil = require('lib/util/modelUtil'),
    BaseCollectionView;

/**
 * Base Collectin View for the application
 * @class BaseCollectinView
 */
BaseCollectionView = Marionette.CollectionView.extend({

    /**
     * calling composite view constructor and baseView normalizeHammerEvents
     * @method constructor
     * @memberof BaseCollectionView
     */
    constructor: function (options) {

        if (options && options.model) {
            this.initData(options.model);
        }

        Marionette.CollectionView.prototype.constructor.apply(this, arguments);
        BaseView.prototype.normalizeHammerEvents.apply(this, arguments);

    },

    /**
     * sets the data for the collection view to a subset of the data if needed
     * @method initData
     * @memberof BaseCollectionView
     * @param model
     */
    initData: function (model) {

        if (hasProp(this, 'collectionFilter', 'in')) {

            if (typeof this.collectionFilter !== 'string') {
                throw new Error('collection filter must be a string');
            }

            if (hasProp(this, 'collectionClass', 'in')) {
                this.collection = new this.collectionClass(this.getModelData(this.collectionFilter, model));
            } else {
                this.collection = new Backbone.Collection(this.getModelData(this.collectionFilter, model));
            }

        } else {

            this.collection = new Backbone.Collection(model);

        }

    },

    /**
     * looks at the elements in the view el, creates views with the appropriate models for each item
     * @method bindChildViews
     * @memberof BaseCollectionView
     */
    bindChildViews: function () {

        this._ensureViewIsIntact();
        this.triggerMethod('before:render', this);
        this._bindChildren();
        this.triggerMethod('render', this);
        return this;

    },

    /**
     * cleans up any existing views first to make sure its a clean slate, then calls attachCollection
     * @method _bindChildren
     * @memberof BaseCollectionView
     * @private
     */
    _bindChildren: function () {

        this.destroyEmptyView();
        this.destroyChildren();

        if (this.isEmpty(this.collection)) {
            return;
        } else {
            this.triggerMethod('before:render:collection', this);
            this.attachCollection();
            this.triggerMethod('render:collection', this);
        }

    },

    /**
     * returns collection of child nodes in the view's el
     * @method getChildNodes
     * @memberof BaseCollectionview
     * @returns {jQuery} collection of child nodes
     */
    getChildNodes: function () {

        return this.$el.children();

    },

    /**
     * loops through the collection, then gathers the data necessary for each model
     * and view to be created
     * @method attachCollection
     * @memberof BaseCollectionView
     */
    attachCollection: function () {

        var ChildView,
            childNodes = this.getChildNodes();
        this.collection.each(function(child, index) {
            ChildView = this.getChildView(child);
            this.attachChild(child, ChildView, index, childNodes.eq(index));
        }, this);

    },

    /**
     * attaches one child view to one dom node
     * @method attachChild
     * @memberof BaseCollectionView
     * @param {Backbone.Model} child
     * @param {Backbone.View} ChildView
     * @param {number} index
     * @param {dom} childNode
     * @returns {Backbone.View} view
     */
    attachChild: function (child, ChildView, index, childNode) {

        var childViewOptions = this.getOption('childViewOptions');

        if (_.isFunction(childViewOptions)) {
            childViewOptions = childViewOptions.call(this, child, index);
        }

        childViewOptions = _.extend({ el: childNode }, childViewOptions);

        var view = this.buildChildView(child, ChildView, childViewOptions);

        view.bindUIElements();

        // increment indices of views after this one
        this._updateIndices(view, true, index);

        this._addAttachedChild(view, index);

        return view;
    },


    /**
     * adds the view to the childViewContainer, calls show, etc on the view
     * @method _addAttachedChild
     * @memberof BaseCollectionView
     * @private
     */
    _addAttachedChild: function (view, index) {

        this.proxyChildEvents(view);

        this.triggerMethod('before:add:child', view);

        // Store the child view itself so we can properly
        // remove and/or destroy it later
        this.children.add(view);

        if (this._isShown && !this.isBuffering){
            if (_.isFunction(view.triggerMethod)) {
                view.triggerMethod('show');
            } else {
                Marionette.triggerMethod.call(view, 'show');
            }
        }

        this.triggerMethod('add:child', view);
    },

    /**
     * render the view, overriding built-in render to handle rendering dust asynchronously
     * @method render
     * @memberof BaseCollectionView
     * @returns {jQuery.Deferred} deferred A jQuery deferred object to allow chaining
     */
    render: function (collection, options) {

        var deferred = $.Deferred();

        //if a collection is being passed to render, it's coming from a reset event
        //we need to sync up the model with the new collection, so that the render will work
        //with the way we're rendering collections in dust

        if (collection) {
            this.updateModelCollection(collection);
        }

        this._ensureViewIsIntact();
        this.triggerMethod('before:render', this);

        BaseView.prototype.render.call(this)
            .done(_.bind(function onRender () {
                this.triggerMethod('render', this);
                this._bindChildren();
                deferred.resolve(this);
            }, this));

        return deferred.promise();

    },

    /**
     * update the collection with new models before render occurs
     * @method updateModelCollection
     * @memberof BaseCollectionView
     */
    updateModelCollection: function (collection) {

        if (hasProp(this, 'collectionFilter', 'in')) {
            this.setModelData(this.collectionFilter, collection.toJSON(), this.model);
        }

    },

    /**
     * gets nested model data if needed,
     * parses string to build the path
     * @method getModelData
     * @memberof BaseCollectionView
     */
    getModelData: modelUtil.getModelData,

    /**
     * sets nested model data if needed,
     * parses string to build the path
     * @method setModelData
     * @memberof BaseCollectionView
     */
    setModelData: modelUtil.setModelData,

    /**
     * importing methods from itemView due to inheritance chain issues
     * @method serializeData
     * @memberof BaseCollectionView
     */
    serializeData: Marionette.ItemView.prototype.serializeData,

    /**
     * importing methods from itemView due to inheritance chain issues
     * @method attachElContent
     * @memberof BaseCollectionView
     */
    attachElContent: Marionette.ItemView.prototype.attachElContent,

    /**
     * overriding marionette.collectionview method to hander async render
     * @method _addChildView
     * @memberof BaseCollectionView
     * @param view
     * @param index
     * @private
     */
    _addChildView: function(view, index) {
        // set up the child view event forwarding
        this.proxyChildEvents(view);

        this.triggerMethod('before:add:child', view);

        // Store the child view itself so we can properly
        // remove and/or destroy it later
        this.children.add(view);
        this.renderChildView(view, index)
            .done(_.bind(function onDone () {

                if (this._isShown && !this.isBuffering){
                    if (_.isFunction(view.triggerMethod)) {
                        view.triggerMethod('show');
                    } else {
                        Marionette.triggerMethod.call(view, 'show');
                    }
                }

                this.triggerMethod('add:child', view);

            }, this));
    },

    /**
     * overriding marionette to handle async render
     * @method renderChildView
     * @memberof BaseCollectionView
     * @param {object} view
     * @param {number} index
     * @returns {jQuery.Deferred}
     */
    renderChildView: function(view, index) {

        var deferred = $.Deferred();

        view.render()
            .done(_.bind(function onRenderDone () {

                this.attachHtml(this, view, index);
                deferred.resolve(view);

            }, this));

        return deferred.promise();
    }

});

module.exports = BaseCollectionView;
