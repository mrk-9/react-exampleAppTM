'use strict';

var config = require('config').analytics;


/**
 * Requirejs wrapper for google analytics
 * @class GATracker
 */
function GATracker() {
    this.configure();
}


GATracker.prototype = {

    /**
     * configure the analytics account and initialize GA
     * @method configure
     * @memberof GATracker
     */
    configure: function () {

        /* jshint ignore:start */
        // intialize GA
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        /* jshint ignore:end */

        //assign proper account
        if (window.location.hostname === config.url) {
            window.ga('create', config.prod);
        } else {
            window.ga('create', config.dev, {
                'cookieDomain': 'none'
            });
        }

    },


    /**
     * Wrapper for tracking pageviews
     * @method pageView
     * @memberof GATracker
     * @param {string} url url of the page to track
     * @param {string} [title] title of the page
     */
    pageView: function (url, title) {

        if (url.indexOf('/') !== 0) {
            url = '/' + url;
        }
        window.ga('send', {
            'hitType': 'pageview',
            'page': url,
            'title': title || document.title
        });

    },

    /**
     * Wrapper for tracking custom events
     * @method event
     * @memberof GATracker
     * @param {string} cat category of the event
     * @param {string} action action of the event
     * @param {string} label label of the event
     * @param {number} [value] value of the event
     */
    event: function (cat, action, label, value) {
        window.ga('send', {
            'hitType': 'event',
            'eventCategory': cat,
            'eventAction': action,
            'eventLabel': label,
            'eventValue': value
        });
    }

};

var tracker = new GATracker();

module.exports = tracker;
