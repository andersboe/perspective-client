define(function(require) {

  var NotFound = require('not_found/notFound');
  var $ = require('jquery');
  var expect = require('chai').expect;

  describe('notFound', function() {
    it('renders a h2', function () {
      var $element = $('<div>');
      var view = new NotFound({el: $element});

      expect(view.fragment.html).to.have.string('h2');
    });
  });

});