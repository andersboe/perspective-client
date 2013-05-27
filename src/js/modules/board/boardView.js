define(function(require) {

  var View = require('base/view');

  return View.extend({

    initialize: function(options) {
      this.boardView = options.boardView;
    },

    render: function() {
      this.renderTemplate();
    }

  });

});