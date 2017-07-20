'use strict';


var express = require('express'),
    router = express.Router(),
    render = require('../../lib/render'),
    locationDetail = require('./locationDetail'),
    locationVideo = require('./locationVideo');

router.get('/:slug/videos/:id/:slug', locationVideo, render.renderHtmlAndJson);
router.get('/:slug', locationDetail, render.renderHtmlAndJson);

module.exports = router;