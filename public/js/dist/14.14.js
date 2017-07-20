webpackJsonp([14,18],{

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';
	
	var BaseView = __webpack_require__(75),
	    stateModel = __webpack_require__(8),
	    indexModel = __webpack_require__(74),
	    IndexView;
	
	/**
	 * View for home page
	 * @class IndexView
	 */
	IndexView = BaseView.extend({
	
	    /**
	     * template
	     * @member {string} template id
	     * @memberof IndexView
	     */
	    template: 'index',
	
	    /**
	     * template
	     * @member {string} template id
	     * @memberof IndexView
	     */
	    modelClass: indexModel,
	
	    /**
	     * initializes the view
	     * @method initialize
	     * @memberof IndexView
	     */
	    initialize: function () {
	
	        var location = stateModel.get('location');
	
	        if (location) {
	            this.updateList(location);
	        } else {
	            this.listenTo(stateModel, 'change:location', this.onChangeLocation);
	        }
	
	    },
	
	    updateList: function (coords) {
	
	        this.model.fetch({
	            data: {
	                latitude: coords.latitude,
	                longitude: coords.longitude
	            }
	        })
	            .done(_.bind(function () {
	                this.render(['.local-locations']);
	            }, this))
	            .fail(_.bind(function () {
	                console.error(arguments);
	            }, this));
	
	    },
	
	    /**
	     * handles the location changing for this view
	     * @method onChangeLocation
	     * @memberof IndexView
	     */
	    onChangeLocation: function (model, value) {
	
	        this.updateList({
	            latitude: value.latitude,
	            longitude: value.longitude
	        });
	
	    },
	
	    /**
	     * custom cleanup code for stateModel
	     * @method onDestroy
	     * @memberof IndexView
	     */
	    onDestroy: function () {
	
	        this.stopListening();
	
	    }
	
	});
	
	module.exports = IndexView;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Backbone = __webpack_require__(14),
	    _ = __webpack_require__(30),
	    IndexModel;
	/**
	 * Model for the index page
	 * @class IndexModel
	 */
	IndexModel = Backbone.Model.extend({
	
	    /**
	     * url
	     * @member {string} url the url to call for xhr actions
	     * @memberof IndexModel
	     */
	    url: '/api-proxy/locations'
	
	
	});
	
	
	module.exports = IndexModel;

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Marionette = __webpack_require__(26),
	    _ = __webpack_require__(30),
	    $ = __webpack_require__(32),
	    Backbone = __webpack_require__(14),
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


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21vZGVscy9pbmRleE1vZGVsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9saWIvdmlld3MvYmFzZVZpZXcuanM/MTM0OSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7O0FBRWIsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVCxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFDOztBQUVELDRCOzs7Ozs7OztBQ3hGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7OztBQUdBLEVBQUM7OztBQUdELDZCOzs7Ozs7O0FDdEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxlQUFlO0FBQzlCLGtCQUFpQixXQUFXO0FBQzVCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCOztBQUVqQixVQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxjQUFhOztBQUViOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxlQUFlO0FBQzlCLGtCQUFpQixXQUFXO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxjQUFhOztBQUViOztBQUVBOztBQUVBOzs7QUFHQSxFQUFDOztBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQmFzZVZpZXcgPSByZXF1aXJlKCdsaWIvdmlld3MvYmFzZVZpZXcnKSxcbiAgICBzdGF0ZU1vZGVsID0gcmVxdWlyZSgnbW9kZWxzL3N0YXRlTW9kZWwnKSxcbiAgICBpbmRleE1vZGVsID0gcmVxdWlyZSgnbW9kZWxzL2luZGV4TW9kZWwnKSxcbiAgICBJbmRleFZpZXc7XG5cbi8qKlxuICogVmlldyBmb3IgaG9tZSBwYWdlXG4gKiBAY2xhc3MgSW5kZXhWaWV3XG4gKi9cbkluZGV4VmlldyA9IEJhc2VWaWV3LmV4dGVuZCh7XG5cbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0ZVxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGVtcGxhdGUgaWRcbiAgICAgKiBAbWVtYmVyb2YgSW5kZXhWaWV3XG4gICAgICovXG4gICAgdGVtcGxhdGU6ICdpbmRleCcsXG5cbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0ZVxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGVtcGxhdGUgaWRcbiAgICAgKiBAbWVtYmVyb2YgSW5kZXhWaWV3XG4gICAgICovXG4gICAgbW9kZWxDbGFzczogaW5kZXhNb2RlbCxcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemVzIHRoZSB2aWV3XG4gICAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAgICogQG1lbWJlcm9mIEluZGV4Vmlld1xuICAgICAqL1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgbG9jYXRpb24gPSBzdGF0ZU1vZGVsLmdldCgnbG9jYXRpb24nKTtcblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdChsb2NhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKHN0YXRlTW9kZWwsICdjaGFuZ2U6bG9jYXRpb24nLCB0aGlzLm9uQ2hhbmdlTG9jYXRpb24pO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlTGlzdDogZnVuY3Rpb24gKGNvb3Jkcykge1xuXG4gICAgICAgIHRoaXMubW9kZWwuZmV0Y2goe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjb29yZHMubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBjb29yZHMubG9uZ2l0dWRlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShfLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKFsnLmxvY2FsLWxvY2F0aW9ucyddKTtcbiAgICAgICAgICAgIH0sIHRoaXMpKVxuICAgICAgICAgICAgLmZhaWwoXy5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9LCB0aGlzKSk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlcyB0aGUgbG9jYXRpb24gY2hhbmdpbmcgZm9yIHRoaXMgdmlld1xuICAgICAqIEBtZXRob2Qgb25DaGFuZ2VMb2NhdGlvblxuICAgICAqIEBtZW1iZXJvZiBJbmRleFZpZXdcbiAgICAgKi9cbiAgICBvbkNoYW5nZUxvY2F0aW9uOiBmdW5jdGlvbiAobW9kZWwsIHZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiB2YWx1ZS5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogdmFsdWUubG9uZ2l0dWRlXG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGN1c3RvbSBjbGVhbnVwIGNvZGUgZm9yIHN0YXRlTW9kZWxcbiAgICAgKiBAbWV0aG9kIG9uRGVzdHJveVxuICAgICAqIEBtZW1iZXJvZiBJbmRleFZpZXdcbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcblxuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5kZXhWaWV3O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wdWJsaWMvanMvdmlld3MvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAxNFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKSxcbiAgICBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgIEluZGV4TW9kZWw7XG4vKipcbiAqIE1vZGVsIGZvciB0aGUgaW5kZXggcGFnZVxuICogQGNsYXNzIEluZGV4TW9kZWxcbiAqL1xuSW5kZXhNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG5cbiAgICAvKipcbiAgICAgKiB1cmxcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHVybCB0aGUgdXJsIHRvIGNhbGwgZm9yIHhociBhY3Rpb25zXG4gICAgICogQG1lbWJlcm9mIEluZGV4TW9kZWxcbiAgICAgKi9cbiAgICB1cmw6ICcvYXBpLXByb3h5L2xvY2F0aW9ucydcblxuXG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEluZGV4TW9kZWw7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3B1YmxpYy9qcy9tb2RlbHMvaW5kZXhNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDc0XG4gKiogbW9kdWxlIGNodW5rcyA9IDE0XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgTWFyaW9uZXR0ZSA9IHJlcXVpcmUoJ2JhY2tib25lLm1hcmlvbmV0dGUnKSxcbiAgICBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgICQgPSByZXF1aXJlKCdqcXVlcnknKSxcbiAgICBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJyksXG4gICAgQmFzZVZpZXc7XG5cbi8qKlxuICogQmFzZSBWaWV3IGZvciB0aGUgYXBwbGljYXRpb25cbiAqIEBjbGFzcyBCYXNlVmlld1xuICovXG5CYXNlVmlldyA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcblxuICAgIC8qKlxuICAgICAqIGNvbnN0cnV0Y3RvciBtZXRob2QsIG92ZXJyaWRpbmcgbWFyaW9uZXR0ZSdzIGNvbnN0cnVjdG9yIHRvXG4gICAgICogbm9ybWFsaXplIHVpIGtleXMgb24gaGFtbWVyIGV2ZW50c1xuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubm9ybWFsaXplSGFtbWVyRXZlbnRzKCk7XG4gICAgICAgIE1hcmlvbmV0dGUuSXRlbVZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIG5vcm1hbGl6aW5nIGhhbW1lciBldmVudHMgdG8gYmUgYWJsZSB0byB1c2UgQHVpIHN5bnRheCwgc2VwYXJhdGUgbWV0aG9kXG4gICAgICogdG8gYWxsb3cgZm9yIGNvZGUgcmV1c2UgaW4gYmFzZUNvbXBvc2l0ZVZpZXdcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZUhhbW1lckV2ZW50c1xuICAgICAqIEBtZW1iZXJvZiBCYXNlVmlld1xuICAgICAqL1xuICAgIG5vcm1hbGl6ZUhhbW1lckV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhhbW1lckV2ZW50cyA9IHRoaXMubm9ybWFsaXplVUlLZXlzKF8ucmVzdWx0KHRoaXMsICdoYW1tZXJFdmVudHMnKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIGEgdmlldyBpcyBzaG93biBpbiBhIHJlZ2lvblxuICAgICAqIEBtZXRob2Qgb25TaG93XG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICogQHBhcmFtIHtldmVudH0gZSB0aGUgZXZlbnRcbiAgICAgKi9cbiAgICBvblNob3c6IGZ1bmN0aW9uIChlKSB7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIGEgdmlldyBpcyBzaG93biBpbiBhIHJlZ2lvbixcbiAgICAgKiBzaG93IGNhbGxzIHJlbmRlciBpZiBpbiBzaW5nbGUgcGFnZSBhcHAgbW9kZVxuICAgICAqIGFuZCBjYWxscyBvblJlbmRlciBpZiB0aGUgdmlldyBpcyBqdXN0IGJlaW5nIGF0dGFjaGVkXG4gICAgICogQG1ldGhvZCBvblJlbmRlclxuICAgICAqIEBtZW1iZXJvZiBCYXNlVmlld1xuICAgICAqIEBwYXJhbSB7ZXZlbnR9IGUgdGhlIGV2ZW50XG4gICAgICovXG4gICAgb25SZW5kZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbmRlciB0aGUgdmlldywgb3ZlcnJpZGluZyBidWlsdC1pbiByZW5kZXIgdG8gaGFuZGxlIHJlbmRlcmluZyBkdXN0IGFzeW5jaHJvbm91c2x5XG4gICAgICogQG1ldGhvZCByZW5kZXJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5fSBzZWxlY3RvciBvciBhbiBhcnJheSBvZiBzZWxlY3RvcnMgdG8gdXBkYXRlIHRoZSBjb250ZW50cyBvZiBpbnN0ZWFkIG9mIHRoZSBlbnRpcmUgdmlld1xuICAgICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBkZWZlcnJlZCBBIGpRdWVyeSBkZWZlcnJlZCBvYmplY3QgdG8gYWxsb3cgY2hhaW5pbmdcbiAgICAgKi9cbiAgICByZW5kZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuXG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGUoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgLnRoZW4oXy5iaW5kKGZ1bmN0aW9uIG9uVXBkYXRlICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fZW5zdXJlVmlld0lzSW50YWN0KCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlck1ldGhvZCgnYmVmb3JlOnJlbmRlcicsIHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc2VyaWFsaXplRGF0YSgpO1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMubWl4aW5UZW1wbGF0ZUhlbHBlcnMoZGF0YSk7XG5cbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMuZ2V0VGVtcGxhdGUoKTtcblxuICAgICAgICAgICAgTWFyaW9uZXR0ZS5SZW5kZXJlci5yZW5kZXIodGVtcGxhdGUsIGRhdGEsIF8uYmluZChmdW5jdGlvbiBvblJlbmRlclN1Y2Nlc3MgKGh0bWwpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoRWxDb250ZW50KGh0bWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFVJRWxlbWVudHMoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlck1ldGhvZCgncmVuZGVyJywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMpO1xuXG4gICAgICAgICAgICB9LCB0aGlzKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIGFsbCBvciBhIHBhcnQgb2YgdGhlIHZpZXdcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBtZW1iZXJvZiBCYXNlVmlld1xuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXl9IHNlbGVjdG9yIG9yIGFuIGFycmF5IG9mIHNlbGVjdG9ycyB0byB1cGRhdGUgdGhlIGNvbnRlbnRzIG9mIGluc3RlYWQgb2YgdGhlIGVudGlyZSB2aWV3XG4gICAgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IGRlZmVycmVkIEEgalF1ZXJ5IGRlZmVycmVkIG9iamVjdCB0byBhbGxvdyBjaGFpbmluZ1xuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cbiAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgbCxcbiAgICAgICAgICAgIGZyYWdtZW50O1xuXG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0VXBkYXRlZEZyYWdtZW50IChzZWxlY3RvciwgaHRtbCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJCgnPGRpdj4nICsgaHRtbCArICc8L2Rpdj4nKS5maW5kKHNlbGVjdG9yKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWxlY3Rvcikge1xuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlck1ldGhvZCgnYmVmb3JlOnVwZGF0ZScsIHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc2VyaWFsaXplRGF0YSgpO1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMubWl4aW5UZW1wbGF0ZUhlbHBlcnMoZGF0YSk7XG5cbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMuZ2V0VGVtcGxhdGUoKTtcblxuICAgICAgICAgICAgTWFyaW9uZXR0ZS5SZW5kZXJlci5yZW5kZXIodGVtcGxhdGUsIGRhdGEsIF8uYmluZChmdW5jdGlvbiBvblJlbmRlclN1Y2Nlc3MgKGh0bWwpIHtcblxuICAgICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGwgPSBzZWxlY3Rvci5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJChzZWxlY3RvcltsXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZVdpdGgoZ2V0VXBkYXRlZEZyYWdtZW50KHNlbGVjdG9yW2xdLCBodG1sKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiQoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZVdpdGgoZ2V0VXBkYXRlZEZyYWdtZW50KHNlbGVjdG9yLCBodG1sKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyTWV0aG9kKCd1cGRhdGUnLCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXG4gICAgfVxuXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VWaWV3O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3B1YmxpYy9qcy9saWIvdmlld3MvYmFzZVZpZXcuanNcbiAqKiBtb2R1bGUgaWQgPSA3NVxuICoqIG1vZHVsZSBjaHVua3MgPSAxMyAxNCAxNSAxNiAxN1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IjE0LjE0LmpzIn0=