define(function(require) {

  var App = require('app/app');
  var sinon = require('sinon');
  var $ = require('jquery');

  describe('app', function () {
    var app;

    it('has section markup', function() {
      var $element = $('<div>');
      app = new App({el: $element});

      expect(app.el).toContain('#app');
      expect(app.el).toContain('#menu');
      expect(app.el).toContain('#main');
      expect(app.el).toContain('#overlay');
    });

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