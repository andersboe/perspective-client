define(function(require) {

  var View = require('base/view');
  var menuTemplate = require('hb!./menu');

  return View.extend({

    template: menuTemplate,

    initialize: function() {

    },

    render: function() {
      this.renderTemplate();

      return this;
    }

  });

});