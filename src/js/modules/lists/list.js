define(function(require) {
  var Collection = require('base/collection');

  var List = Collection.extend({
    comparator: 'priority',

    updatePriorityForItem: function(item, newSortOrder, newIndexForItem) {
      var isFirstItem = newItemIndex === 0;
      var isLastItem = newItemIndex === newSortOrder.length - 1;
      var previousId = isFirstItem ? null : this.get(newSortOrder[newItemIndex - 1]).get('id');
      var nextId = isLastItem ? null : this.get(newSortOrder[newItemIndex + 1]).get('id');

      item.save(
        {
          previousId: previousId,
          nextId: nextId
        },
        { patch: true }
      );
    }
  });

  return List;
});