define(function(require) {

  var Section = require('section/section');
  var expect = require('chai').expect;

  describe('Section', function() {
    describe('constructor', function() {
      it('sets selector', function() {
        var section = new Section('main');
        expect(section.selector).to.not.be.undefined;
      });
    });

    describe('show', function() {
      it('sets currentView', function() {
        var section = new Section('main');
        var View = function() {};
        section.show(View);
        expect(section.currentView).to.not.be.undefined;
      });

      it('passes options to view', function() {

      });

      it('extend options with el', function() {

      });

      it('closes the current we when defined', function() {

      });
    });

    describe('close a view', function() {



    });
  });

});
