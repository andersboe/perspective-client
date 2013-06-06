define(function(require) {

  var View = require('base/view');
  var menuTemplate = require('hb!./menu');
  var MenuItemView = require('./menuItemView');

  return View.extend({

    template: menuTemplate,

    initialize: function() {
      this.listView = new MenuItemView();
      this.boardView = new MenuItemView();

      this.addSubView(this.listView);
      this.addSubView(this.boardView);
    },

    render: function() {
      this.renderTemplate();

      this.$('.menu-list').html([this.listView.render().el, this.boardView.render().el]);

      return this;
    }

  });

});