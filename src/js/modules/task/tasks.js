define(function(require) {
  var Collection = require('base/collection');
  var Task = require('./task');

  return Collection.extend({

    url: '/tasks',

    model: Task,

    updatePriorityForTask: function(task, newSortOrder, newIndexForItem) {
      var isFirstItem = newIndexForItem === 0;
      var isLastItem = newIndexForItem === newSortOrder.length - 1;
      var previousId = isFirstItem ? null : this.get(newSortOrder[newIndexForItem - 1]).get('id');
      var nextId = isLastItem ? null : this.get(newSortOrder[newIndexForItem + 1]).get('id');

      task.save(
        {
          previousId: previousId,
          nextId: nextId
        },
        { patch: true }
      );
    },

    getLast: function() {
      return this.at(this.length - 1);
    },

    create: function(attributes, options) {
      var last = this.getLast();

      if (last) {
        attributes.lastItemInListId = last.get('id');
      }

      return Collection.prototype.create.call(this, attributes, options);
    }

  });

});