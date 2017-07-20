'use strict';

/**
 * Simple module for preventing default and stopping propagation on an event
 * @module lib/util/stopEvent
 * @namespace lib/util/stopEvent
 */

/**
 * @function stopEvent
 * @memberof lib/util/stopEvent
 * @param {event} e the event
 */
function stopEvent (e) {
    var target = e.currentTarget,
        bypass = target.getAttribute('data-bypass');

    if (!bypass) {
        e.preventDefault();
        e.stopPropagation();

        if (e.hasOwnProperty('gesture')) {
            e.gesture.preventDefault();
            e.gesture.stopPropagation();
        }
    }

}
module.exports = stopEvent;
