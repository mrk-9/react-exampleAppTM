'use strict';

/**
 * Simple module for determining if a link is an anchor link
 * @module lib/util/isAnchorLink
 * @namespace lib/util/isAnchorLink
 */

/**
 * detect if the link is an in page anchor link
 * @function isAnchorLink
 * @memberof lib/util/isAnchorLink
 * @param {jQuery} link the link as a jQuery object
 * @returns {boolean}
 */
function isAnchorLink (link) {
    return link[0].hash && link.attr('href').charAt(0) === '#';
}

module.exports = isAnchorLink;