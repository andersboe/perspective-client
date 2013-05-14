define(function(require) {

  var View = require('base/view'),
    listTemplate = require('hb!./list'),
    ListItemView = require('./listItemView');

    require('jQuerySortable');

  var List = View.extend({

    template: listTemplate,

    initialize: function(options) {
      this.list = options.list;
    },

    render: function() {
      this.renderTemplate();

      var items = this.list.map(function(item) {
        var listItem = new ListItemView({model:item});
        listItem.on("priorityChanged", this.updateSort, this);
        return listItem.render().el;
      }, this);

      this.$('.list').html(items).sortable();

      return this;
    },

    updateSort: function(item) {
      var newSortOrder = [],
          newIndexForItem = -1;

      this.$('.list > li').each(function(index) {
        var id = $(this).data('id');
        if(id === item.get('id')) {
          newIndexForItem = index;
        }
        newSortOrder.push(id);
      });

      this.list.updatePriorityForItem(item, newSortOrder, newIndexForItem);

    }

  });

  return List;

});