'use strict';

var config = require('config');

describe('config', function () {

    it('should contain config values', function () {

        assert.strictEqual(config.analytics.prod, 'UA-xxxxxxxx-1');

    });

});