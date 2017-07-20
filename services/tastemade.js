'use strict';

var request = require('request'),
    tastemade;

module.exports = function (apiKey) {

    tastemade = {

        apiKey: apiKey,

        baseUrl: 'https://api.tmade.co/v1/',

        get: function (path, params, callback) {

            var options = {};

            if (typeof params === 'function') {
               callback = params;
            } else {
                options.qs = params;
            }

            options.url = this.baseUrl + path;

            options.method = 'GET';

            options.headers = {
                'X-Api-Key': this.apiKey
            };

            options.json = true;

            request(options, function onRequest (err, response, body) {
                if (err) {
                    callback(err);
                } else if (response.statusCode === 200) {
                    callback(null, body);
                }

            });

        }

    };

    return tastemade;

};