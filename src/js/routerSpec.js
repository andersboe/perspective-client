define(function(require) {

  var $ = require('jquery');
  var Router = require('router');
  var Sections = require('section/sections');
  var page = require('page');
  var expect = require('chai').expect;

  var sections = new Sections({
    "main": $("<div>")
  });

  describe('router', function() {
    describe('constructor', function() {
      it('sets sections', function() {
        var router = new Router({sections: sections});
        expect(router.sections).to.not.be.undefined;

      });

      it('adds page callbacks', function() {
        page.callbacks.length = 0;
        new Router({sections: sections});
        expect(page.callbacks.length).to.equal(4);
      });
    });
  });

});
