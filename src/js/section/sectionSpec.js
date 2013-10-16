define(function(require) {

  var Section = require('section/section');
  //var sinon = require('sinon');

  describe('Section', function() {
    describe('constructor', function() {
      it('sets selector', function() {
        var section = new Section('main');
        expect(section.selector).toBeDefined();
      });
    });

    describe('show', function() {
      it('sets currentView', function() {
        var section = new Section('main');
        var View = function() {};
        section.show(View);
        expect(section.currentView).toBeDefined();
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
