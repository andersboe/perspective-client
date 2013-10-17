define(function(require) {

  var App = require('app/app');
  var sinon = require('sinon');

  describe('app', function () {
    var app;

    describe('start', function () {

      beforeEach(function () {
        app = new App({el: $('<div>')});
      });

      it('initialize a router', function () {
        expect(app.router).toBeUndefined();
        app.start();
        expect(app.router).toBeDefined();
      });

      it('initialize sections', function () {
        expect(app.sections).toBeUndefined();
        app.start();
        expect(app.sections).toBeDefined();
      });

      it('calls callback if defined', function() {
        var spy = sinon.spy();
        app.start(spy);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});