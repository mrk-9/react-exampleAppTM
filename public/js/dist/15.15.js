webpackJsonp([15,18],{

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var BaseView = __webpack_require__(75),
	    LocationDetailView;
	
	/**
	 * view for location detail page
	 * @class LocationDetailView
	 */
	LocationDetailView = BaseView.extend({
	
	    /**
	     * template
	     * @member {string} template id
	     * @memberof LocationDetailView
	     */
	    template: 'locationDetail'
	
	});
	
	module.exports = LocationDetailView;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3MvbG9jYXRpb25EZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2xpYi92aWV3cy9iYXNlVmlldy5qcz8xMzQ5KiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQscUM7Ozs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGVBQWU7QUFDOUIsa0JBQWlCLFdBQVc7QUFDNUI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGNBQWE7O0FBRWI7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGVBQWU7QUFDOUIsa0JBQWlCLFdBQVc7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGNBQWE7O0FBRWI7O0FBRUE7O0FBRUE7OztBQUdBLEVBQUM7O0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9iYXNlVmlldycpLFxuICAgIExvY2F0aW9uRGV0YWlsVmlldztcblxuLyoqXG4gKiB2aWV3IGZvciBsb2NhdGlvbiBkZXRhaWwgcGFnZVxuICogQGNsYXNzIExvY2F0aW9uRGV0YWlsVmlld1xuICovXG5Mb2NhdGlvbkRldGFpbFZpZXcgPSBCYXNlVmlldy5leHRlbmQoe1xuXG4gICAgLyoqXG4gICAgICogdGVtcGxhdGVcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHRlbXBsYXRlIGlkXG4gICAgICogQG1lbWJlcm9mIExvY2F0aW9uRGV0YWlsVmlld1xuICAgICAqL1xuICAgIHRlbXBsYXRlOiAnbG9jYXRpb25EZXRhaWwnXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvY2F0aW9uRGV0YWlsVmlldztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHVibGljL2pzL3ZpZXdzL2xvY2F0aW9uRGV0YWlsLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTVcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBNYXJpb25ldHRlID0gcmVxdWlyZSgnYmFja2JvbmUubWFyaW9uZXR0ZScpLFxuICAgIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG4gICAgJCA9IHJlcXVpcmUoJ2pxdWVyeScpLFxuICAgIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKSxcbiAgICBCYXNlVmlldztcblxuLyoqXG4gKiBCYXNlIFZpZXcgZm9yIHRoZSBhcHBsaWNhdGlvblxuICogQGNsYXNzIEJhc2VWaWV3XG4gKi9cbkJhc2VWaWV3ID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuXG4gICAgLyoqXG4gICAgICogY29uc3RydXRjdG9yIG1ldGhvZCwgb3ZlcnJpZGluZyBtYXJpb25ldHRlJ3MgY29uc3RydWN0b3IgdG9cbiAgICAgKiBub3JtYWxpemUgdWkga2V5cyBvbiBoYW1tZXIgZXZlbnRzXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBtZW1iZXJvZiBCYXNlVmlld1xuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ub3JtYWxpemVIYW1tZXJFdmVudHMoKTtcbiAgICAgICAgTWFyaW9uZXR0ZS5JdGVtVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogbm9ybWFsaXppbmcgaGFtbWVyIGV2ZW50cyB0byBiZSBhYmxlIHRvIHVzZSBAdWkgc3ludGF4LCBzZXBhcmF0ZSBtZXRob2RcbiAgICAgKiB0byBhbGxvdyBmb3IgY29kZSByZXVzZSBpbiBiYXNlQ29tcG9zaXRlVmlld1xuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplSGFtbWVyRXZlbnRzXG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICovXG4gICAgbm9ybWFsaXplSGFtbWVyRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaGFtbWVyRXZlbnRzID0gdGhpcy5ub3JtYWxpemVVSUtleXMoXy5yZXN1bHQodGhpcywgJ2hhbW1lckV2ZW50cycpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbGVkIHdoZW4gYSB2aWV3IGlzIHNob3duIGluIGEgcmVnaW9uXG4gICAgICogQG1ldGhvZCBvblNob3dcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKiBAcGFyYW0ge2V2ZW50fSBlIHRoZSBldmVudFxuICAgICAqL1xuICAgIG9uU2hvdzogZnVuY3Rpb24gKGUpIHtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbGVkIHdoZW4gYSB2aWV3IGlzIHNob3duIGluIGEgcmVnaW9uLFxuICAgICAqIHNob3cgY2FsbHMgcmVuZGVyIGlmIGluIHNpbmdsZSBwYWdlIGFwcCBtb2RlXG4gICAgICogYW5kIGNhbGxzIG9uUmVuZGVyIGlmIHRoZSB2aWV3IGlzIGp1c3QgYmVpbmcgYXR0YWNoZWRcbiAgICAgKiBAbWV0aG9kIG9uUmVuZGVyXG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICogQHBhcmFtIHtldmVudH0gZSB0aGUgZXZlbnRcbiAgICAgKi9cbiAgICBvblJlbmRlcjogZnVuY3Rpb24gKGUpIHtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIHRoZSB2aWV3LCBvdmVycmlkaW5nIGJ1aWx0LWluIHJlbmRlciB0byBoYW5kbGUgcmVuZGVyaW5nIGR1c3QgYXN5bmNocm9ub3VzbHlcbiAgICAgKiBAbWV0aG9kIHJlbmRlclxuICAgICAqIEBtZW1iZXJvZiBCYXNlVmlld1xuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXl9IHNlbGVjdG9yIG9yIGFuIGFycmF5IG9mIHNlbGVjdG9ycyB0byB1cGRhdGUgdGhlIGNvbnRlbnRzIG9mIGluc3RlYWQgb2YgdGhlIGVudGlyZSB2aWV3XG4gICAgICogQHJldHVybnMgeyQuRGVmZXJyZWR9IGRlZmVycmVkIEEgalF1ZXJ5IGRlZmVycmVkIG9iamVjdCB0byBhbGxvdyBjaGFpbmluZ1xuICAgICAqL1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cbiAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShzZWxlY3RvcilcbiAgICAgICAgICAgICAgICAudGhlbihfLmJpbmQoZnVuY3Rpb24gb25VcGRhdGUgKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLl9lbnN1cmVWaWV3SXNJbnRhY3QoKTtcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTWV0aG9kKCdiZWZvcmU6cmVuZGVyJywgdGhpcyk7XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5zZXJpYWxpemVEYXRhKCk7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5taXhpblRlbXBsYXRlSGVscGVycyhkYXRhKTtcblxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy5nZXRUZW1wbGF0ZSgpO1xuXG4gICAgICAgICAgICBNYXJpb25ldHRlLlJlbmRlcmVyLnJlbmRlcih0ZW1wbGF0ZSwgZGF0YSwgXy5iaW5kKGZ1bmN0aW9uIG9uUmVuZGVyU3VjY2VzcyAoaHRtbCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hFbENvbnRlbnQoaHRtbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kVUlFbGVtZW50cygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyTWV0aG9kKCdyZW5kZXInLCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcyk7XG5cbiAgICAgICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgYWxsIG9yIGEgcGFydCBvZiB0aGUgdmlld1xuICAgICAqIEBtZXRob2QgdXBkYXRlXG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheX0gc2VsZWN0b3Igb3IgYW4gYXJyYXkgb2Ygc2VsZWN0b3JzIHRvIHVwZGF0ZSB0aGUgY29udGVudHMgb2YgaW5zdGVhZCBvZiB0aGUgZW50aXJlIHZpZXdcbiAgICAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gZGVmZXJyZWQgQSBqUXVlcnkgZGVmZXJyZWQgb2JqZWN0IHRvIGFsbG93IGNoYWluaW5nXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgZnJhZ21lbnQ7XG5cblxuICAgICAgICBmdW5jdGlvbiBnZXRVcGRhdGVkRnJhZ21lbnQgKHNlbGVjdG9yLCBodG1sKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAkKCc8ZGl2PicgKyBodG1sICsgJzwvZGl2PicpLmZpbmQoc2VsZWN0b3IpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTWV0aG9kKCdiZWZvcmU6dXBkYXRlJywgdGhpcyk7XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5zZXJpYWxpemVEYXRhKCk7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5taXhpblRlbXBsYXRlSGVscGVycyhkYXRhKTtcblxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy5nZXRUZW1wbGF0ZSgpO1xuXG4gICAgICAgICAgICBNYXJpb25ldHRlLlJlbmRlcmVyLnJlbmRlcih0ZW1wbGF0ZSwgZGF0YSwgXy5iaW5kKGZ1bmN0aW9uIG9uUmVuZGVyU3VjY2VzcyAoaHRtbCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheShzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgbCA9IHNlbGVjdG9yLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGwtLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kKHNlbGVjdG9yW2xdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlV2l0aChnZXRVcGRhdGVkRnJhZ21lbnQoc2VsZWN0b3JbbF0sIGh0bWwpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJChzZWxlY3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlV2l0aChnZXRVcGRhdGVkRnJhZ21lbnQoc2VsZWN0b3IsIGh0bWwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ3VwZGF0ZScsIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICB9LCB0aGlzKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG5cbiAgICB9XG5cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVZpZXc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHVibGljL2pzL2xpYi92aWV3cy9iYXNlVmlldy5qc1xuICoqIG1vZHVsZSBpZCA9IDc1XG4gKiogbW9kdWxlIGNodW5rcyA9IDEzIDE0IDE1IDE2IDE3XG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiMTUuMTUuanMifQ==