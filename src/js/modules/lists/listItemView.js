define(function(require) {

  var View = require('base/view'),
    listItemTemplate = require('hb!./listItem');

  var ListItem = View.extend({

    tagName: 'li',

    template: listItemTemplate,

    initialize: function(options) {
      this.item = options.item;
    },

    bindings: {
      '.title': 'title'
    },

    render: function() {
      this.renderTemplate();
      this.stickit(this.item);
      return this;
    }

  });

  return ListItem;

});