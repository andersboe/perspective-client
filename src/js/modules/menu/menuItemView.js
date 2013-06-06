define(function(require) {

  var View = require('base/view');

  var menuItemTemplate = require('hb!./menuItem');

  return View.extend({

    template: menuItemTemplate,

    tagName: 'li',

    render: function() {
      this.renderTemplate();
      return this;
    }

  });

});