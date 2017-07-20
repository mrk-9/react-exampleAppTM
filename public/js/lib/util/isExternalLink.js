'use strict';

/**
 * Simple module for determining if a link is considered external or not
 * @module lib/util/isExternalLink
 * @namespace lib/util/isExternalLink
 */

/**
 * detect if the link is external or not
 * @function isExternalLink
 * @memberof lib/util/isExternalLink
 * @param {string} url the url to check
 * @returns {boolean} true if the link is external
 */
function isExternalLink (url) {

    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
    if (typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
        return true;
    }
    if (typeof match[2] === 'string' && match[2].length > 0 && match[2].replace(new RegExp(':('+{'http:':80,'https:':443}[location.protocol]+')?$'), '') !== location.host) {
        return true;
    }
    return false;

}

module.exports = isExternalLink;