'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    ga = require('lib/util/analytics'),
    stopEvent = require('lib/util/stopEvent'),
    isExternalLink = require('lib/util/isExternalLink'),
    isAnchorLink = require('lib/util/isAnchorLink'),
    scrollToAnchor = require('lib/util/scrollToAnchor'),
    config = require('config').applicationView;
    _ = require('underscore');

/**
 * Global view of the application, handles global app ui events
 * @class ApplicationView
 */
var ApplicationView = Marionette.View.extend({

    /**
     * el for the application
     * @member {string} el jquery selector
     * @memberof ApplicationView
     * @default 'body'
     */
    el: $(config.el || 'body'),

    /**
     * events hash - used for cancelling propagation of link clicks
     * @member {object} events events hash
     * @memberof ApplicationView
     */
    events: {
        'click a': 'stopEvent'
    },

    /**
     * ui hash for caching selectors
     * @member {object} ui
     * @memberof ApplicationView
     */
    ui: {
        wrapper: '.wrapper',
        spinner: '.spinner'
    },

    /**
     * hammerEvents hash for touch based events
     * @member {object} hammerEvents events hash
     * @memberof ApplicationView
     */
    hammerEvents: {
        'tap a': 'onTapLink'
    },

    /**
     * maps methods to model events
     * @member modelEvents
     * @memberof ApplicationView
     */
    modelEvents: {
        'request:success': 'onRequestSuccess',
        'request:start': 'onRequest'
    },

    initialize: function () {
        this.bindUIElements();
    },

    /**
     * stopEvent - alias for stopEvent module
     * @method stopEvent
     * @memberof ApplicationView
     * @param {e} the event to stop
     */
    stopEvent: stopEvent,

    /**
     * send tracking information for external and anchor links
     * @method onTapLink
     * @memberof ApplicationView
     * @param {event} e the event
     */
    onTapLink: function (e) {

        var currentTarget = e.currentTarget,
            $target = $(currentTarget),
            bypass = currentTarget.getAttribute('data-bypass'),
            href = currentTarget.getAttribute('href'),
            target = currentTarget.getAttribute('target'),
            isExternalLink = this.isExternalLink(href),
            isAnchorLink = this.isAnchorLink($target);

        if (href.indexOf('javascript') === -1) {

            this.trackLink($target, href, isExternalLink, isAnchorLink);

            if (!isAnchorLink) {
                if (isExternalLink || bypass) {
                    return target ? window.open(href, target) : window.location.assign(href);
                } else {
                    Backbone.history.navigate(href, true);
                }
            } else {
                if (!bypass) {
                    this.scrollToAnchor(href);
                }
            }

        }

    },

    /**
     * Scroll the page manually to an anchor link
     * @method scrollToAnchor
     * @memberof ApplicationView
     * @param href
     */
    scrollToAnchor: scrollToAnchor,

    /**
     * send tracking information for external and anchor links
     * @method trackLink
     * @memberof ApplicationView
     * @param {jQuery} $target the target of the event
     * @param {string} href the url of the link
     * @param {boolean} isExternalLink whether the link is external
     * @param {boolean} isAnchorLink whether it is an anchor or not
     */
    trackLink: function ($target, href, isExternalLink, isAnchorLink) {

        if ($target.attr('data-disable-tracking') === 'true') {
            return;
        } else if (isExternalLink) {
            ga.event('externalLink', href, $target.text());
        } else if (isAnchorLink) {
            ga.event('inPageAnchor', 'click', $target[0].hash);
        }

    },

    /**
     * detect if the link is external or not
     * @method isExternalLink
     * @memberof ApplicationView
     * @param {string} url the url to check
     * @returns {boolean}
     */
    isExternalLink: isExternalLink,

    /**
     * detect if the link is an in page anchor link
     * @method isAnchorLink
     * @memberof ApplicationView
     * @param {jQuery} link the link as a jQuery object
     * @returns {boolean}
     */
    isAnchorLink: isAnchorLink,

    /**
     * updates the page title and scrolls to top
     * @method onRequestSuccess
     * @memberof ApplicationView
     */
    onRequestSuccess: function () {

        this.updatePageTitle();
        $(window).scrollTop(0);
        this.onRequest();
    },
    /**
     * when a new page request starts, toggle the loader,
     * also called onRequestSuccess
     * @method onRequest
     * @memberof ApplicationView
     */
    onRequest: function () {

        var wrapper = this.ui.wrapper,
            spinner = this.ui.spinner;

        if (wrapper.hasClass('loading')) {
            spinner.velocity('reverse', {
                complete: function (elements) {
                    wrapper.removeClass('loading');
                },
                display: 'none'
            });
        } else {
            spinner.velocity({ opacity: 1}, {
                duration: 200,
                begin: function (elements) {
                    wrapper.addClass('loading');
                },
                display: 'block'
            });
        }

    },

    /**
     * updates the page title after request:success
     * @method updatePageTitle
     * @memberof ApplicationView
     */
    updatePageTitle: function () {
        $('title').html(this.model.get('data').pageTitle + ' | TasteMade');
    },

    /**
     * request users geoLocation
     * @method requestLocation
     * @memberof ApplicationView
     */
    requestLocation: function () {

        if (!'geolocation' in navigator) {
            onError();
            return;
        }

        function onSuccess (position) {
            this.model.set('location', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

        }

        function onError () {
            //setting to austin as the default location
            this.model.set('location', {
                latitude: 30.321505199999997,
                longitude: -97.73890329999999
            });
        }

        navigator.geolocation.getCurrentPosition(_.bind(onSuccess, this), _.bind(onError, this));

    }

});

module.exports = ApplicationView;
