'use strict';

var config = require('../../config'),
    tastemade = require('../../services/tastemade')(config.apiKey),
    _ = require('lodash');

function locations (req, res, next) {

    var q = req.query.q;

    tastemade.get('autocomplete/locations', {
        q: q
    }, function onGet(err, results) {
        if (err) {
            res.status(500);
            res.send({
                error: 'an error has occured'
            });
        } else {
            res.json({
                data: {
                    searchResults: results
                }
            });
        }
    });

}

module.exports = locations;