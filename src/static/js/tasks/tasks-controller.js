define(function(require) {

  var template = require('rv!./tasks.html');
  var Ractive = require('Ractive');
  var tasksController = require('./tasks-controller-helper');
  var _ = require('underscore');


  return Ractive.extend(_.extend({
    template: template,
    init: function() {
      this.on({
        removeTask: this.task.remove,
        addTask: this.task.add,
        'dragndrop-items': function (event) {

          var draggedId = event.draggedElement.getAttribute('data-id');
          var nextToId = event.nextElement !== null ? event.nextElement.getAttribute('data-id') : null;
          var prevToId = event.previousElement !== null ? event.previousElement.getAttribute('data-id') : null;

          event.context.tasks.updatePriorityForTask(draggedId, nextToId, prevToId);

        }
      });
    }
  }, tasksController));
});