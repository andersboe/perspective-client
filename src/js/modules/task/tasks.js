define(function(require) {
  var Collection = require('base/collection');
  var Task = require('./task');
  var _ = require('underscore');

  return Collection.extend({

    url: '/tasks',

    model: Task,

    updatePriorityForTask: function(task, newSortOrder) {
      var newIndexForItem = _.indexOf(newSortOrder, task.get("id"));
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

    create: function(modelAttributes, options) {
      var last = this.getLast();

      if (last) {
        modelAttributes.lastItemInListId = last.get('id');
      }

      return Collection.prototype.create.call(this, modelAttributes, options);
    }

  });

});