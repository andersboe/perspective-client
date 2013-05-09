define(function(require) {

  var View = require('base/view'),
    listTemplate = require('hb!./list'),
    ListItemView = require('./listItemView');

  var List = View.extend({

    template: listTemplate,

    initialize: function(options) {
      this.list = options.list;
    },

    render: function() {
      this.renderTemplate();

      var fragment = document.createDocumentFragment();
      this.list.each(function(item) {
        var listItem = new ListItemView({model:item});
        fragment.appendChild(listItem.render().el);
      });

      this.$('.list').html(fragment);

      return this;
    }

  });

  return List;

});