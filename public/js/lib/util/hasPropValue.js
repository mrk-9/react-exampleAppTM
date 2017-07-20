'use strict';

/**
 * Simple module for determining if an object has a value
 * @module lib/util/hasPropValue
 * @namespace lib/util/hasPropValue
 */

/**
 * check for a property and that it has a value
 * @function hasPropValue
 * @memberof lib/util/hasPropValue
 * @param {object} obj the object to check
 * @param {string} prop the property name to check
 * @param {string} [type] type the type of check, either in or own property
 * @returns {boolean}
 */
function hasPropValue(obj, prop, type) {

    var typeCheck = type || 'own';

    if (typeCheck === 'own') {
        return obj.hasOwnProperty(prop) && obj[prop];
    } else {
        return prop in obj && obj[prop];
    }

}

module.exports = hasPropValue;