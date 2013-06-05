define(function(require) {

  var View = require('base/view');

  return View.extend({

    tagName: 'li',

    render: function() {
      this.renderTemplate();

      return this;
    }

  });

});