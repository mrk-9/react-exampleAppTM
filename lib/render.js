'use strict';

var _ = require('lodash');


/**
 * adds viewname from model to the viewMap main view
 *
 * @function renderHtml
 * @memberof lib/render
 * @param {object} req request object
 * @param {object} res response object
 */
function processViewMap (req, res) {

    var viewName = '';

    if (req.hasOwnProperty('model') && req.model) {
        if (req.model.hasOwnProperty('viewName') && req.model.hasOwnProperty('viewName')) {
            viewName = req.model.viewName;
        }
    }
    //tell the app what view to put in main region
    _.merge(res.locals.viewMap, {
        mainRegion: viewName
    });
}

/**
 * Generic renderer for rendering server side pages.
 *
 * @function renderHtml
 * @memberof lib/render
 * @param {object} req request object
 * @param {object} res response object
 */
function renderHtml(req, res) {

    processViewMap(req, res);

    res.render('layout', req.model);
}


/**
 * Generic renderer for supporting requests for either HTML or JSON via AJAX.
 *
 * @function renderHtmlAndJson
 * @memberof lib/render
 * @param req
 * @param res
 */
function renderHtmlAndJson(req, res) {
    res.format({
        'html': function () {renderHtml(req, res);},
        'json': function () {renderJson(req, res);}
    });
}


/**
 * Generic renderer for JSON via AJAX.
 *
 * @function renderJson
 * @memberof lib/render
 * @param req
 * @param res
 */
function renderJson(req, res) {

    processViewMap(req, res);

    res.json(_.merge(res.locals, req.model));
}


/**
 * @module lib/render
 * @namespace lib/render
 */
module.exports = {
    renderHtml: renderHtml,
    renderHtmlAndJson: renderHtmlAndJson,
    renderJson: renderJson
};