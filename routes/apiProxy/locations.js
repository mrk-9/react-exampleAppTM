'use strict';

var config = require('../../config'),
    tastemade = require('../../services/tastemade')(config.apiKey),
    _ = require('lodash'),
    geolib = require('geolib');

function locations (req, res, next) {

    var coords = req.query;

    tastemade.get('locations', {
        lat: coords.latitude,
        long: coords.longitude,
        maxDistance: 321869,
        limit: 6
    }, function onGet(err, results) {
        if (err) {
            res.status(500);
            res.send({
                error: 'an error has occured'
            });
        } else {

            var resultsCoords = results.map(function (result) {

                var coords = {
                    latitude: result.coordinate[1],
                    longitude: result.coordinate[0]
                };

                return coords;

            });

            resultsCoords = geolib.orderByDistance(coords, resultsCoords);

            resultsCoords.forEach(function (result) {
                delete result.key;
                delete result.distance;
            });

            results.sort(function (a, b) {
                var coordA = {
                   latitude: a.coordinate[1],
                   longitude: a.coordinate[0]
                };

                var coordB = {
                    latitude: b.coordinate[1],
                    longitude: b.coordinate[0]
                };

                var indexA = _.findIndex(resultsCoords, coordA);
                var indexB = _.findIndex(resultsCoords, coordB);

                return indexA - indexB;

            });

            if (results.length % 2 !== 0) {
                results.pop();
            }

            res.json({
                data: {
                    localLocations: results
                }
            });
        }
    });

}

module.exports = locations;