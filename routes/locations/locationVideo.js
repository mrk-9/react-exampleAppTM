'use strict';


var config = require('../../config'),
    tastemade = require('../../services/tastemade')(config.apiKey),
    async = require('async');

function locationVideo (req, res, next) {
    var model = {
        data: {
            headerId: 'locations',
            pageId: 'location-detail-video',
            pageTitle: ''
        },
        viewName: 'locationVideo'
    };

    req.model = model;

//    /videos/:videoId/comments

    async.parallel({
            video: function getVideo (callback) {
                tastemade.get('videos/' + req.param('id'),
                    function onGet(err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    });
            },
            comments: function getComments (callback) {
                tastemade.get('videos/' + req.param('id') + '/comments',
                    function onGet(err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    });
            }
        },
        function(err, results) {
            if (err) {
                next(err);
            } else {
                model.data.video = results.video;
                model.data.pageTitle = results.video.title;
                model.data.comments = results.comments
                next();
            }
        });

}

module.exports = locationVideo;