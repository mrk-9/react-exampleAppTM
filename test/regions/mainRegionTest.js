'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    BaseRegion = require('lib/regions/baseRegion'),
    mainRegion = require('regions/mainRegion'),
    TastemadeApplication = require('app/tastemadeApplication'),
    app;

describe('Main Region', function () {

    beforeEach(function () {
        app = new TastemadeApplication();

    });

    it('can be instantiated', function () {

        assert.isTrue(mainRegion instanceof Marionette.Region);

    });

    it('can be added to an application', function () {

        app.addRegions({
            main: mainRegion
        });

        assert.strictEqual(app.main, mainRegion);

    });

});