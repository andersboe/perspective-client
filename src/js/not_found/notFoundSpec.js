define(function(require) {

  var NotFound = require('not_found/notFound');
  var $ = require('jquery');

  describe('notFound', function() {
    it('renders a h2', function () {
      var $element = $('<div>');
      var view = new NotFound({el: $element});

      expect(view.fragment.html).toContain('h2');
    });
  });

});