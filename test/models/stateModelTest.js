'use strict';

var Backbone = require('backbone'),
    stateModel = require('models/stateModel');

describe('State Model', function () {

    it('can be instantiated', function () {

        assert.isTrue(stateModel instanceof Backbone.Model);

    });

});