'use strict';


var express = require('express'),
    router = express.Router(),
    render = require('../lib/render'),
    config = require('../config'),
    tastemade = require('../services/tastemade')(config.apiKey);

function indexRoute (req, res, next) {
    var model = {
        data: {
            headerId: 'index',
            pageId: 'index',
            pageTitle: 'Locations'
        },
        viewName: 'index'
    };

    req.model = model;

    tastemade.get('locations', {
        sortFieldName: 'activationLevel',
        sortDirection: '-1',
        limit: 6
    }, function onGet(err, results) {
        if (err) {
            next(err);
        } else {
            model.data.locations = results;
            next();
        }
    });

}

/* GET home page. */
router.get('/', indexRoute, render.renderHtmlAndJson);

module.exports = router;