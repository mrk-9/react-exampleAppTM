'use strict';


var express = require('express'),
    router = express.Router(),
    locations = require('./locations'),
    autocompleteLocations = require('./autocompleteLocations');

router.get('/locations', locations);
router.get('/autocomplete/locations', autocompleteLocations);

module.exports = router;