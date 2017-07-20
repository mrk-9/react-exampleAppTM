webpackJsonp([13,17,18],{

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var BaseView = __webpack_require__(75),
	    Backbone = __webpack_require__(14),
	    stateModel = __webpack_require__(8),
	    SearchView = __webpack_require__(52),
	    HeaderView;
	
	/**
	 * View for header
	 * @class HeaderView
	 */
	HeaderView = BaseView.extend({
	
	    /**
	     * template
	     * @member {string} template
	     * @memberof HeaderView
	     */
	    template: 'header',
	
	    /**
	     * ui hash for header
	     * @member {object} ui hash of key:'jquery selector'
	     * @memberof HeaderView
	     */
	    ui: {
	        searchIcon: '.glyphicon-search'
	    },
	
	    /**
	     * events for hammerjs
	     * @member {object} hammerEvents
	     * @memberof HeaderView
	     */
	    hammerEvents: {
	        'tap @ui.searchIcon': 'onTapSearch'
	    },
	
	    preventShow: true,
	
	    /**
	     * handles search tap event
	     * @method onTapSearch
	     * @memberof HeaderView
	     * @param {event} e
	     */
	    onTapSearch: function (e) {
	        var searchView = new SearchView({
	            model: new Backbone.Model()
	        });
	
	        stateModel.trigger('search', searchView);
	    }
	
	});
	
	module.exports = HeaderView;

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var BaseView = __webpack_require__(75),
	    Backbone = __webpack_require__(14),
	    _ = __webpack_require__(30),
	    stateModel = __webpack_require__(8),
	    SearchView;
	
	/**
	 * View for header
	 * @class SearchView
	 */
	SearchView = BaseView.extend({
	
	    /**
	     * template
	     * @member {string} template
	     * @memberof SearchView
	     */
	    template: 'search',
	
	    /**
	     * ui hash for search
	     * @member {object} ui hash of key:'jquery selector'
	     * @memberof SearchView
	     */
	    ui: {
	        close: '.glyphicon-remove',
	        q: '#q'
	    },
	
	    /**
	     * events for hammerjs
	     * @member {object} hammerEvents
	     * @memberof SearchView
	     */
	    hammerEvents: {
	        'tap @ui.close': 'onTapClose',
	        'tap ul li a': 'onTapClose'
	    },
	
	    /**
	     * setting up change handler for input here in order to debounce it,
	     * can't debounce in the events hash
	     * @method onRender
	     * @memberof SearchView
	     */
	    onRender: function () {
	        this.ui.q.on('keydown', _.debounce(_.bind(this.onChangeQ, this), 300));
	        this.ui.q.focus();
	    },
	
	    /**
	     * handles closing search view
	     * @method onTapClose
	     * @memberof SearchView
	     * @param {event} e
	     */
	    onTapClose: function (e) {
	
	        this.$el.parents('#search').removeClass('search-open');
	
	        //destroy after the search view animates, should prob use transitionEnd
	        setTimeout(_.bind(function () {
	
	            this.destroy();
	
	        }, this), 350);
	
	    },
	
	    onChangeQ: function () {
	
	        var val = this.ui.q.val().trim();
	
	        if (!val || val.length < 3) {
	            return;
	        }
	
	        this.model.fetch({
	            url: '/api-proxy/autocomplete/locations',
	            data: {
	                q: this.ui.q.val()
	            }
	        })
	            .done(_.bind(function onDone () {
	                this.render('.search-results');
	            }, this));
	
	    },
	
	    onDestroy: function () {
	        this.ui.q.off();
	    }
	
	});
	
	module.exports = SearchView;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3MvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy92aWV3cy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2xpYi92aWV3cy9iYXNlVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLGlCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRCw2Qjs7Ozs7OztBQ3pEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLGlCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxNQUFNO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxVQUFTOztBQUVULE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLGNBQWE7O0FBRWIsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRCw2Qjs7Ozs7OztBQ2pHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsZUFBZTtBQUM5QixrQkFBaUIsV0FBVztBQUM1QjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjs7QUFFakIsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsY0FBYTs7QUFFYjs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsZUFBZTtBQUM5QixrQkFBaUIsV0FBVztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsY0FBYTs7QUFFYjs7QUFFQTs7QUFFQTs7O0FBR0EsRUFBQzs7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnbGliL3ZpZXdzL2Jhc2VWaWV3JyksXG4gICAgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpLFxuICAgIHN0YXRlTW9kZWwgPSByZXF1aXJlKCdtb2RlbHMvc3RhdGVNb2RlbCcpLFxuICAgIFNlYXJjaFZpZXcgPSByZXF1aXJlKCd2aWV3cy9zZWFyY2gnKSxcbiAgICBIZWFkZXJWaWV3O1xuXG4vKipcbiAqIFZpZXcgZm9yIGhlYWRlclxuICogQGNsYXNzIEhlYWRlclZpZXdcbiAqL1xuSGVhZGVyVmlldyA9IEJhc2VWaWV3LmV4dGVuZCh7XG5cbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0ZVxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGVtcGxhdGVcbiAgICAgKiBAbWVtYmVyb2YgSGVhZGVyVmlld1xuICAgICAqL1xuICAgIHRlbXBsYXRlOiAnaGVhZGVyJyxcblxuICAgIC8qKlxuICAgICAqIHVpIGhhc2ggZm9yIGhlYWRlclxuICAgICAqIEBtZW1iZXIge29iamVjdH0gdWkgaGFzaCBvZiBrZXk6J2pxdWVyeSBzZWxlY3RvcidcbiAgICAgKiBAbWVtYmVyb2YgSGVhZGVyVmlld1xuICAgICAqL1xuICAgIHVpOiB7XG4gICAgICAgIHNlYXJjaEljb246ICcuZ2x5cGhpY29uLXNlYXJjaCdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZXZlbnRzIGZvciBoYW1tZXJqc1xuICAgICAqIEBtZW1iZXIge29iamVjdH0gaGFtbWVyRXZlbnRzXG4gICAgICogQG1lbWJlcm9mIEhlYWRlclZpZXdcbiAgICAgKi9cbiAgICBoYW1tZXJFdmVudHM6IHtcbiAgICAgICAgJ3RhcCBAdWkuc2VhcmNoSWNvbic6ICdvblRhcFNlYXJjaCdcbiAgICB9LFxuXG4gICAgcHJldmVudFNob3c6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGVzIHNlYXJjaCB0YXAgZXZlbnRcbiAgICAgKiBAbWV0aG9kIG9uVGFwU2VhcmNoXG4gICAgICogQG1lbWJlcm9mIEhlYWRlclZpZXdcbiAgICAgKiBAcGFyYW0ge2V2ZW50fSBlXG4gICAgICovXG4gICAgb25UYXBTZWFyY2g6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBzZWFyY2hWaWV3ID0gbmV3IFNlYXJjaFZpZXcoe1xuICAgICAgICAgICAgbW9kZWw6IG5ldyBCYWNrYm9uZS5Nb2RlbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YXRlTW9kZWwudHJpZ2dlcignc2VhcmNoJywgc2VhcmNoVmlldyk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJWaWV3O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wdWJsaWMvanMvdmlld3MvaGVhZGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCYXNlVmlldyA9IHJlcXVpcmUoJ2xpYi92aWV3cy9iYXNlVmlldycpLFxuICAgIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKSxcbiAgICBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgIHN0YXRlTW9kZWwgPSByZXF1aXJlKCdtb2RlbHMvc3RhdGVNb2RlbCcpLFxuICAgIFNlYXJjaFZpZXc7XG5cbi8qKlxuICogVmlldyBmb3IgaGVhZGVyXG4gKiBAY2xhc3MgU2VhcmNoVmlld1xuICovXG5TZWFyY2hWaWV3ID0gQmFzZVZpZXcuZXh0ZW5kKHtcblxuICAgIC8qKlxuICAgICAqIHRlbXBsYXRlXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSB0ZW1wbGF0ZVxuICAgICAqIEBtZW1iZXJvZiBTZWFyY2hWaWV3XG4gICAgICovXG4gICAgdGVtcGxhdGU6ICdzZWFyY2gnLFxuXG4gICAgLyoqXG4gICAgICogdWkgaGFzaCBmb3Igc2VhcmNoXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSB1aSBoYXNoIG9mIGtleTonanF1ZXJ5IHNlbGVjdG9yJ1xuICAgICAqIEBtZW1iZXJvZiBTZWFyY2hWaWV3XG4gICAgICovXG4gICAgdWk6IHtcbiAgICAgICAgY2xvc2U6ICcuZ2x5cGhpY29uLXJlbW92ZScsXG4gICAgICAgIHE6ICcjcSdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZXZlbnRzIGZvciBoYW1tZXJqc1xuICAgICAqIEBtZW1iZXIge29iamVjdH0gaGFtbWVyRXZlbnRzXG4gICAgICogQG1lbWJlcm9mIFNlYXJjaFZpZXdcbiAgICAgKi9cbiAgICBoYW1tZXJFdmVudHM6IHtcbiAgICAgICAgJ3RhcCBAdWkuY2xvc2UnOiAnb25UYXBDbG9zZScsXG4gICAgICAgICd0YXAgdWwgbGkgYSc6ICdvblRhcENsb3NlJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBzZXR0aW5nIHVwIGNoYW5nZSBoYW5kbGVyIGZvciBpbnB1dCBoZXJlIGluIG9yZGVyIHRvIGRlYm91bmNlIGl0LFxuICAgICAqIGNhbid0IGRlYm91bmNlIGluIHRoZSBldmVudHMgaGFzaFxuICAgICAqIEBtZXRob2Qgb25SZW5kZXJcbiAgICAgKiBAbWVtYmVyb2YgU2VhcmNoVmlld1xuICAgICAqL1xuICAgIG9uUmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudWkucS5vbigna2V5ZG93bicsIF8uZGVib3VuY2UoXy5iaW5kKHRoaXMub25DaGFuZ2VRLCB0aGlzKSwgMzAwKSk7XG4gICAgICAgIHRoaXMudWkucS5mb2N1cygpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGVzIGNsb3Npbmcgc2VhcmNoIHZpZXdcbiAgICAgKiBAbWV0aG9kIG9uVGFwQ2xvc2VcbiAgICAgKiBAbWVtYmVyb2YgU2VhcmNoVmlld1xuICAgICAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAgICAgKi9cbiAgICBvblRhcENsb3NlOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIHRoaXMuJGVsLnBhcmVudHMoJyNzZWFyY2gnKS5yZW1vdmVDbGFzcygnc2VhcmNoLW9wZW4nKTtcblxuICAgICAgICAvL2Rlc3Ryb3kgYWZ0ZXIgdGhlIHNlYXJjaCB2aWV3IGFuaW1hdGVzLCBzaG91bGQgcHJvYiB1c2UgdHJhbnNpdGlvbkVuZFxuICAgICAgICBzZXRUaW1lb3V0KF8uYmluZChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuXG4gICAgICAgIH0sIHRoaXMpLCAzNTApO1xuXG4gICAgfSxcblxuICAgIG9uQ2hhbmdlUTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnVpLnEudmFsKCkudHJpbSgpO1xuXG4gICAgICAgIGlmICghdmFsIHx8IHZhbC5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKHtcbiAgICAgICAgICAgIHVybDogJy9hcGktcHJveHkvYXV0b2NvbXBsZXRlL2xvY2F0aW9ucycsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcTogdGhpcy51aS5xLnZhbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShfLmJpbmQoZnVuY3Rpb24gb25Eb25lICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcignLnNlYXJjaC1yZXN1bHRzJyk7XG4gICAgICAgICAgICB9LCB0aGlzKSk7XG5cbiAgICB9LFxuXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudWkucS5vZmYoKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaFZpZXc7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3B1YmxpYy9qcy92aWV3cy9zZWFyY2guanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAxMyAxN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIE1hcmlvbmV0dGUgPSByZXF1aXJlKCdiYWNrYm9uZS5tYXJpb25ldHRlJyksXG4gICAgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKSxcbiAgICAkID0gcmVxdWlyZSgnanF1ZXJ5JyksXG4gICAgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpLFxuICAgIEJhc2VWaWV3O1xuXG4vKipcbiAqIEJhc2UgVmlldyBmb3IgdGhlIGFwcGxpY2F0aW9uXG4gKiBAY2xhc3MgQmFzZVZpZXdcbiAqL1xuQmFzZVZpZXcgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1dGN0b3IgbWV0aG9kLCBvdmVycmlkaW5nIG1hcmlvbmV0dGUncyBjb25zdHJ1Y3RvciB0b1xuICAgICAqIG5vcm1hbGl6ZSB1aSBrZXlzIG9uIGhhbW1lciBldmVudHNcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZUhhbW1lckV2ZW50cygpO1xuICAgICAgICBNYXJpb25ldHRlLkl0ZW1WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBub3JtYWxpemluZyBoYW1tZXIgZXZlbnRzIHRvIGJlIGFibGUgdG8gdXNlIEB1aSBzeW50YXgsIHNlcGFyYXRlIG1ldGhvZFxuICAgICAqIHRvIGFsbG93IGZvciBjb2RlIHJldXNlIGluIGJhc2VDb21wb3NpdGVWaWV3XG4gICAgICogQG1ldGhvZCBub3JtYWxpemVIYW1tZXJFdmVudHNcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKi9cbiAgICBub3JtYWxpemVIYW1tZXJFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5oYW1tZXJFdmVudHMgPSB0aGlzLm5vcm1hbGl6ZVVJS2V5cyhfLnJlc3VsdCh0aGlzLCAnaGFtbWVyRXZlbnRzJykpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiBhIHZpZXcgaXMgc2hvd24gaW4gYSByZWdpb25cbiAgICAgKiBAbWV0aG9kIG9uU2hvd1xuICAgICAqIEBtZW1iZXJvZiBCYXNlVmlld1xuICAgICAqIEBwYXJhbSB7ZXZlbnR9IGUgdGhlIGV2ZW50XG4gICAgICovXG4gICAgb25TaG93OiBmdW5jdGlvbiAoZSkge1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiBhIHZpZXcgaXMgc2hvd24gaW4gYSByZWdpb24sXG4gICAgICogc2hvdyBjYWxscyByZW5kZXIgaWYgaW4gc2luZ2xlIHBhZ2UgYXBwIG1vZGVcbiAgICAgKiBhbmQgY2FsbHMgb25SZW5kZXIgaWYgdGhlIHZpZXcgaXMganVzdCBiZWluZyBhdHRhY2hlZFxuICAgICAqIEBtZXRob2Qgb25SZW5kZXJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKiBAcGFyYW0ge2V2ZW50fSBlIHRoZSBldmVudFxuICAgICAqL1xuICAgIG9uUmVuZGVyOiBmdW5jdGlvbiAoZSkge1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgdGhlIHZpZXcsIG92ZXJyaWRpbmcgYnVpbHQtaW4gcmVuZGVyIHRvIGhhbmRsZSByZW5kZXJpbmcgZHVzdCBhc3luY2hyb25vdXNseVxuICAgICAqIEBtZXRob2QgcmVuZGVyXG4gICAgICogQG1lbWJlcm9mIEJhc2VWaWV3XG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheX0gc2VsZWN0b3Igb3IgYW4gYXJyYXkgb2Ygc2VsZWN0b3JzIHRvIHVwZGF0ZSB0aGUgY29udGVudHMgb2YgaW5zdGVhZCBvZiB0aGUgZW50aXJlIHZpZXdcbiAgICAgKiBAcmV0dXJucyB7JC5EZWZlcnJlZH0gZGVmZXJyZWQgQSBqUXVlcnkgZGVmZXJyZWQgb2JqZWN0IHRvIGFsbG93IGNoYWluaW5nXG4gICAgICovXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgIC50aGVuKF8uYmluZChmdW5jdGlvbiBvblVwZGF0ZSAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2Vuc3VyZVZpZXdJc0ludGFjdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ2JlZm9yZTpyZW5kZXInLCB0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnNlcmlhbGl6ZURhdGEoKTtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1peGluVGVtcGxhdGVIZWxwZXJzKGRhdGEpO1xuXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKCk7XG5cbiAgICAgICAgICAgIE1hcmlvbmV0dGUuUmVuZGVyZXIucmVuZGVyKHRlbXBsYXRlLCBkYXRhLCBfLmJpbmQoZnVuY3Rpb24gb25SZW5kZXJTdWNjZXNzIChodG1sKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaEVsQ29udGVudChodG1sKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRVSUVsZW1lbnRzKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ3JlbmRlcicsIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzKTtcblxuICAgICAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSBhbGwgb3IgYSBwYXJ0IG9mIHRoZSB2aWV3XG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVZpZXdcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5fSBzZWxlY3RvciBvciBhbiBhcnJheSBvZiBzZWxlY3RvcnMgdG8gdXBkYXRlIHRoZSBjb250ZW50cyBvZiBpbnN0ZWFkIG9mIHRoZSBlbnRpcmUgdmlld1xuICAgICAqIEByZXR1cm5zIHskLkRlZmVycmVkfSBkZWZlcnJlZCBBIGpRdWVyeSBkZWZlcnJlZCBvYmplY3QgdG8gYWxsb3cgY2hhaW5pbmdcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuXG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBmcmFnbWVudDtcblxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFVwZGF0ZWRGcmFnbWVudCAoc2VsZWN0b3IsIGh0bWwpIHtcblxuICAgICAgICAgICAgcmV0dXJuICQoJzxkaXY+JyArIGh0bWwgKyAnPC9kaXY+JykuZmluZChzZWxlY3Rvcik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ2JlZm9yZTp1cGRhdGUnLCB0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnNlcmlhbGl6ZURhdGEoKTtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1peGluVGVtcGxhdGVIZWxwZXJzKGRhdGEpO1xuXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKCk7XG5cbiAgICAgICAgICAgIE1hcmlvbmV0dGUuUmVuZGVyZXIucmVuZGVyKHRlbXBsYXRlLCBkYXRhLCBfLmJpbmQoZnVuY3Rpb24gb25SZW5kZXJTdWNjZXNzIChodG1sKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5pc0FycmF5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBsID0gc2VsZWN0b3IubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiQoc2VsZWN0b3JbbF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VXaXRoKGdldFVwZGF0ZWRGcmFnbWVudChzZWxlY3RvcltsXSwgaHRtbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VXaXRoKGdldFVwZGF0ZWRGcmFnbWVudChzZWxlY3RvciwgaHRtbCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlck1ldGhvZCgndXBkYXRlJywgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuICAgIH1cblxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wdWJsaWMvanMvbGliL3ZpZXdzL2Jhc2VWaWV3LmpzXG4gKiogbW9kdWxlIGlkID0gNzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTMgMTQgMTUgMTYgMTdcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiIxMy4xMy5qcyJ9