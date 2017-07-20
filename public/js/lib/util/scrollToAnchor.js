'use strict';

/**
 * Simple module for scrolling manually to an anchor link
 * @module lib/util/scrollToAnchor
 * @namespace lib/util/scrollToAnchor
 */

/**
 * scroll the page manually to an anchor link
 * @function scrollToAnchor
 * @memberof lib/util/scrollToAnchor
 * @param href
 */
function scrollToAnchor (href) {

    var top = $(href).offset().top;
    $(document.body).scrollTop(top);
    window.location.hash = href;

}

module.exports = scrollToAnchor;