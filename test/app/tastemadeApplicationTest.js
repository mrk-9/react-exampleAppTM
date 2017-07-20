'use strict';

var TastemadeApplication = require('app/tastemadeApplication'),
    Marionette = require('backbone.marionette'),
    app,
    $ = require('jquery'),
    stateModel = require('models/stateModel');

describe('Tastemad Application', function () {

    beforeEach(function () {
        app = new TastemadeApplication();
    });

    it('can be instantiated', function () {

        assert.isTrue(app instanceof Marionette.Application);

    });

    it('can get the initial state from the page', function () {

        var object = JSON.stringify({
                viewMap: {
                    header: 'header'
                }
            }),
            scriptTag = $('<script id="initialState" type="application/json">' + object + '</script>'),
            state;

        $('body').append(scriptTag);
        state = app.getInitialState();

        assert.strictEqual(state.viewMap.header, 'header');

    });

    describe('starts up', function () {

        it('and calls configure when it is started', function () {

            var spy = sinon.spy(TastemadeApplication.prototype, 'configure'),
                app2 = new TastemadeApplication();

            app2.start();

            expect(spy).to.have.been.called;
            assert.isTrue(Backbone.History.started);

            spy.restore();

            Backbone.History.started = null;
            Backbone.history.stop();

        });
    });

});