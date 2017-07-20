'use strict';

var Marionette = require('backbone.marionette');

/**
 * Router for basic page level navigation
 * @class ApplicationRouter
 */
var ApplicationRouter = Marionette.AppRouter.extend({

    /**
     * route for page navigation
     * @member {object} appRoutes
     * @memberof ApplicationRouter
     */
    appRoutes: {
        '*url': 'navigate'
    }

});

module.exports = ApplicationRouter;