'use strict';

var Backbone = require('backbone'),
    BackboneHammer = require('backbone.hammerjs'),
    renderer = require('lib/util/renderer'),
    velocity = require('velocity'),
    TasteMadeApplication = require('app/tastemadeApplication'),
    ApplicationView = require('app/applicationView'),
    ApplicationRouter = require('routers/applicationRouter'),
    ApplicationController = require('controllers/applicationController'),
    ViewController = require('controllers/viewController'),
    stateModel = require('models/stateModel'),
    BaseRegion = require('lib/regions/baseRegion'),
    headerRegion = require('regions/headerRegion'),
    mainRegion = require('regions/mainRegion'),
    searchRegion = require('regions/searchRegion'),
    appView,
    viewController,
    app,
    appRouter;

app = new TasteMadeApplication();

appView = new ApplicationView({
    model: stateModel
});

viewController = new ViewController({
    model: stateModel
});

appRouter = new ApplicationRouter({
    controller: new ApplicationController()
});

app.addRegions({
    header: headerRegion,
    main: mainRegion,
    search: searchRegion
});

app.on('start', function () {
    appView.requestLocation();
});

app.start();