define(function(require) {

  var View = require('base/view'),
    listTemplate = require('hb!./list'),
    ListItemView = require('./listItemView'),
    jQuerySortable = require('jQuerySortable');

  var List = View.extend({

    template: listTemplate,

    initialize: function(options) {
      this.list = options.list;
    },

    render: function() {
      this.renderTemplate();

      var fragment = document.createDocumentFragment();
      var list = this;
      this.list.each(function(item) {
        var listItem = new ListItemView({model:item});
        listItem.on("priorityChanged", list.updateSort, list);
        fragment.appendChild(listItem.render().el);
      });

      this.$('.list').html(fragment).sortable();

      return this;
    },

    updateSort: function(item) {
      var updatedList = [],
          itemIndex = -1;

      this.$('.list > li').each(function(index) {
        var id = $(this).data('id');
        if(id === item.get('id')) {
          itemIndex = index;
        }
        updatedList.push(id);
      });

      var isFirstItem = itemIndex === 0;
      var isLastItem = itemIndex === updatedList.length - 1;
      var previousId = isFirstItem ? null : this.list.get(updatedList[itemIndex - 1]).get('id');
      var nextId = isLastItem ? null : this.list.get(updatedList[itemIndex + 1]).get('id');

      item.save(
        {
          previousId: previousId,
          nextId: nextId
        },
        {patch: true}
      );

    }

  });

  return List;

});