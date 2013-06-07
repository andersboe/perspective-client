define(function(require) {

  var View = require('base/view');
  var menuTemplate = require('hb!./menu');
  var MenuItemView = require('./menuItemView');

  return View.extend({

    template: menuTemplate,

    initialize: function(options) {
      this.menuItems = options.menuItems;
    },

    render: function() {
      this.destroySubViews();
      this.renderTemplate();

      var items = this.menuItems.map(function(menuItem) {
        var menuItemView = new MenuItemView( {menuItem: menuItem});
        this.addSubView(menuItemView);
        return menuItemView.render().el;
      }, this);

      this.$('.menu-list').html(items);

      return this;
    }

  });

});