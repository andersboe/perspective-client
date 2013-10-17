define(function(require) {

  var $ = require('jquery');
  var Router = require('router');
  var Sections = require('section/sections');
  var page = require('page');

  var sections = new Sections({
    "main": $("<div>")
  });

  describe('router', function() {
    describe('constructor', function() {
      it('sets sections', function() {
        var router = new Router({sections: sections});
        expect(router.sections).toBeDefined();

      });

      it('adds page callbacks', function() {
        page.callbacks.length = 0;
        var router = new Router({sections: sections});
        expect(page.callbacks.length).toBe(3);
      });
    });
  });

});
