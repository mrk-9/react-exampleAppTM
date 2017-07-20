'use strict';

/**
 * adds viewmap for common views to res.locals
 * @module lib/middleware/viewMap
 * @namespace lib/middleware/viewMap
 */
module.exports = function () {

    /**
     * Set common views for client app
     * @function setViewMap
     * @memberof lib/middleware/viewMap
     * @param {object} req request object
     * @param {object} res response object
     * @param {function} next the middleware callback
     */
    function setViewMap(req, res, next) {
        res.locals.viewMap = {
            headerRegion: 'header'
        };
        next();
    }

    return setViewMap;
};