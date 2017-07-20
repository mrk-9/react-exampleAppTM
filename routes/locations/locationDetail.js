'use strict';


var config = require('../../config'),
    tastemade = require('../../services/tastemade')(config.apiKey),
    async = require('async'),
    slug = require('slug');

function locationDetail (req, res, next) {
    var model = {
        data: {
            headerId: 'locations',
            pageId: 'location-detail',
            pageTitle: ''
        },
        viewName: 'locationDetail'
    };

    req.model = model;

    async.waterfall([
        function getLocation (callback) {

            tastemade.get('locations/' + req.params.slug,
                function onGet(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        model.data.location = result;
                        model.data.pageTitle = result.name;
                        callback(null, result.coordinate);
                    }
                });

        },
        function getNearbyVideos (coords, callback) {

            tastemade.get('nearby/videos', {
                lat: coords[1],
                long: coords[0],
            }, function onGet(err, results) {
                   if (err) {
                       callback(err);
                   } else {
                       if (results) {
                           results
                               .sort(function sortVideos (a, b) {
                                   return a.stats.views - b.stats.views;
                               })
                               .reverse()
                               .forEach(function (result) {
                                    result.slug = slug(result.title).toLowerCase();
                                });
                       }
                       model.data.videos = results;
                       callback(null, results);
                   }
               });

        }
    ], function (err, results) {
        if (err) {
            next(err);
        } else {
            next();
        }
    });

}

module.exports = locationDetail;