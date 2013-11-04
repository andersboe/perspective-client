define(function(require) {

  var Squire = require('squire');
  var $ = require('jquery');
  var expect = require('chai').expect;
  var sinon = require('sinon');

  var testContext = {};
  testContext.injector = new Squire();
  testContext.injector.mock('jenkins/wsJenkins', {createConnection: sinon.spy()});
  var app;
  var options = {config: {jenkinsWebSocket: {href: ""}}, sections: {"main": $("<div>")}};

  describe('app', function () {
    beforeEach(function(done) {
      testContext.injector.require(['app/app'], function(App) {
        testContext.App = App;
        done();
      });
    });

    it('has section markup', function() {
      var $element = $('<div>');
      app = new testContext.App({el: $element});

      expect(app.el.innerHTML).to.have.string('id="app"');
      expect(app.el.innerHTML).to.have.string('id="main"');
      expect(app.el.innerHTML).to.have.string('id="overlay"');
    });

    describe('start', function () {

      beforeEach(function () {
        app = new testContext.App({el: $('<div>')});
      });

      it('should have called createConnection on wsJenkins', testContext.injector.run(['jenkins/wsJenkins'], function(wsJenkins) {
        app.start(options);
        expect(wsJenkins.createConnection).to.have.been.calledOnce;
      }));

      it('initialize a router', function () {
        expect(app.router).to.be.an('undefined');
        app.start(options);
        expect(app.router).to.not.be.an('undefined');
      });

      it('initialize sections', function () {
        expect(app.sections).to.be.an('undefined');
        app.start(options);
        expect(app.sections).to.not.be.an('undefined');
      });
    });
  });
});