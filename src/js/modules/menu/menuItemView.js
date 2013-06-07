define(function(require) {

  var View = require('base/view');

  var menuItemTemplate = require('hb!./menuItem');

  return View.extend({

    template: menuItemTemplate,

    tagName: 'li',

    initialize: function(options) {
      this.menuItem = options.menuItem;
    },

    render: function() {
      this.renderTemplate(this.menuItem.toJSON());
      return this;
    }

  });

});