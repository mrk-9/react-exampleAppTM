webpackJsonp([16,18],{

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var BaseView = __webpack_require__(75),
	    LocationVideoView;
	
	/**
	 * view for video detail page
	 * @class LocationVideoView
	 */
	LocationVideoView = BaseView.extend({
	
	    /**
	     * template
	     * @member {string} template id
	     * @memberof LocationVideoView
	     */
	    template: 'locationVideo'
	
	});
	
	module.exports = LocationVideoView;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3MvbG9jYXRpb25WaWRlby5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbGliL3ZpZXdzL2Jhc2VWaWV3LmpzPzEzNDkqKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQsb0M7Ozs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGVBQWU7QUFDOUIsa0JBQWlCLFdBQVc7QUFDNUI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGNBQWE7O0FBRWI7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGVBQWU7QUFDOUIsa0JBQWlCLFdBQVc7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGNBQWE7O0FBRWI7O0FBRUE7O0FBRUE7OztBQUdBLEVBQUM7O0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9iYXNlVmlldycpLFxuICAgIExvY2F0aW9uVmlkZW9WaWV3O1xuXG4vKipcbiAqIHZpZXcgZm9yIHZpZGVvIGRldGFpbCBwYWdlXG4gKiBAY2xhc3MgTG9jYXRpb25WaWRlb1ZpZXdcbiAqL1xuTG9jYXRpb25WaWRlb1ZpZXcgPSBCYXNlVmlldy5leHRlbmQoe1xuXG4gICAgLyoqXG4gICAgICogdGVtcGxhdGVcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHRlbXBsYXRlIGlkXG4gICAgICogQG1lbWJlcm9mIExvY2F0aW9uVmlkZW9WaWV3XG4gICAgICovXG4gICAgdGVtcGxhdGU6ICdsb2NhdGlvblZpZGVvJ1xuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2NhdGlvblZpZGVvVmlldztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHVibGljL2pzL3ZpZXdzL2xvY2F0aW9uVmlkZW8uanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAxNlxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIE1hcmlvbmV0dGUgPSByZXF1aXJlKCdiYWNrYm9uZS5tYXJpb25ldHRlJyksXG4gICAgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKSxcbiAgICAkID0gcmVxdWlyZSgnanF1ZXJ5JyksXG4gICAgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpLFxuICAgIEJhc2VWaWV3O1xuXG4vKipcbiAqIEJhc2UgVmlldyBmb3IgdGhlIGFwcGxpY2F0aW9uXG4gKiBAY2xhc3MgQmFzZVZpZXdcbiAqL1xuQmFzZVZpZXcgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1dGN0b3IgbWV0aG9kLCBvdmVycmlkaW5nIG1hcmlvbmV0dGUncyBjb25zdHJ1Y3RvciB0b1xuICAgICAqIG5vcm1hbGl6ZSB1aSBrZXlzIG9uIGhhbW1lciBldmVudHNcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZUhhbW1lckV2ZW50cygpO1xuICAgICAgICBNYXJpb25ldHRlLkl0ZW1WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBub3JtYWxpemluZyBoYW1tZXIgZXZlbnRzIHRvIGJlIGFibGUgdG8gdXNlIEB1aSBzeW50YXgsIHNlcGFyYXRlIG1ldGhvZFxuICAgICAqIHRvIGFsbG93IGZvciBjb2RlIHJldXNlIGluIGJhc2VDb21wb3NpdGVWaWV3XG4gICAgICogQG1ldGhvZCBub3JtYWxpemVIYW1tZXJFdmVudHNcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKi9cbiAgICBub3JtYWxpemVIYW1tZXJFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5oYW1tZXJFdmVudHMgPSB0aGlzLm5vcm1hbGl6ZVVJS2V5cyhfLnJlc3VsdCh0aGlzLCAnaGFtbWVyRXZlbnRzJykpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiBhIHZpZXcgaXMgc2hvd24gaW4gYSByZWdpb25cbiAgICAgKiBAbWV0aG9kIG9uU2hvd1xuICAgICAqIEBtZW1iZXJvZiBCYXNlVmlld1xuICAgICAqIEBwYXJhbSB7ZXZlbnR9IGUgdGhlIGV2ZW50XG4gICAgICovXG4gICAgb25TaG93OiBmdW5jdGlvbiAoZSkge1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiBhIHZpZXcgaXMgc2hvd24gaW4gYSByZWdpb24sXG4gICAgICogc2hvdyBjYWxscyByZW5kZXIgaWYgaW4gc2luZ2xlIHBhZ2UgYXBwIG1vZGVcbiAgICAgKiBhbmQgY2FsbHMgb25SZW5kZXIgaWYgdGhlIHZpZXcgaXMganVzdCBiZWluZyBhdHRhY2hlZFxuICAgICAqIEBtZXRob2Qgb25SZW5kZXJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKiBAcGFyYW0ge2V2ZW50fSBlIHRoZSBldmVudFxuICAgICAqL1xuICAgIG9uUmVuZGVyOiBmdW5jdGlvbiAoZSkge1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgdGhlIHZpZXcsIG92ZXJyaWRpbmcgYnVpbHQtaW4gcmVuZGVyIHRvIGhhbmRsZSByZW5kZXJpbmcgZHVzdCBhc3luY2hyb25vdXNseVxuICAgICAqIEBtZXRob2QgcmVuZGVyXG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheX0gc2VsZWN0b3Igb3IgYW4gYXJyYXkgb2Ygc2VsZWN0b3JzIHRvIHVwZGF0ZSB0aGUgY29udGVudHMgb2YgaW5zdGVhZCBvZiB0aGUgZW50aXJlIHZpZXdcbiAgICAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gZGVmZXJyZWQgQSBqUXVlcnkgZGVmZXJyZWQgb2JqZWN0IHRvIGFsbG93IGNoYWluaW5nXG4gICAgICovXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgIC50aGVuKF8uYmluZChmdW5jdGlvbiBvblVwZGF0ZSAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2Vuc3VyZVZpZXdJc0ludGFjdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ2JlZm9yZTpyZW5kZXInLCB0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnNlcmlhbGl6ZURhdGEoKTtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1peGluVGVtcGxhdGVIZWxwZXJzKGRhdGEpO1xuXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKCk7XG5cbiAgICAgICAgICAgIE1hcmlvbmV0dGUuUmVuZGVyZXIucmVuZGVyKHRlbXBsYXRlLCBkYXRhLCBfLmJpbmQoZnVuY3Rpb24gb25SZW5kZXJTdWNjZXNzIChodG1sKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaEVsQ29udGVudChodG1sKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRVSUVsZW1lbnRzKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ3JlbmRlcicsIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzKTtcblxuICAgICAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSBhbGwgb3IgYSBwYXJ0IG9mIHRoZSB2aWV3XG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5fSBzZWxlY3RvciBvciBhbiBhcnJheSBvZiBzZWxlY3RvcnMgdG8gdXBkYXRlIHRoZSBjb250ZW50cyBvZiBpbnN0ZWFkIG9mIHRoZSBlbnRpcmUgdmlld1xuICAgICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBkZWZlcnJlZCBBIGpRdWVyeSBkZWZlcnJlZCBvYmplY3QgdG8gYWxsb3cgY2hhaW5pbmdcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuXG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBmcmFnbWVudDtcblxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFVwZGF0ZWRGcmFnbWVudCAoc2VsZWN0b3IsIGh0bWwpIHtcblxuICAgICAgICAgICAgcmV0dXJuICQoJzxkaXY+JyArIGh0bWwgKyAnPC9kaXY+JykuZmluZChzZWxlY3Rvcik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ2JlZm9yZTp1cGRhdGUnLCB0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnNlcmlhbGl6ZURhdGEoKTtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1peGluVGVtcGxhdGVIZWxwZXJzKGRhdGEpO1xuXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKCk7XG5cbiAgICAgICAgICAgIE1hcmlvbmV0dGUuUmVuZGVyZXIucmVuZGVyKHRlbXBsYXRlLCBkYXRhLCBfLmJpbmQoZnVuY3Rpb24gb25SZW5kZXJTdWNjZXNzIChodG1sKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5pc0FycmF5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBsID0gc2VsZWN0b3IubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiQoc2VsZWN0b3JbbF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VXaXRoKGdldFVwZGF0ZWRGcmFnbWVudChzZWxlY3RvcltsXSwgaHRtbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VXaXRoKGdldFVwZGF0ZWRGcmFnbWVudChzZWxlY3RvciwgaHRtbCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlck1ldGhvZCgndXBkYXRlJywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuICAgIH1cblxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wdWJsaWMvanMvbGliL3ZpZXdzL2Jhc2VWaWV3LmpzXG4gKiogbW9kdWxlIGlkID0gNzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTMgMTQgMTUgMTYgMTdcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiIxNi4xNi5qcyJ9