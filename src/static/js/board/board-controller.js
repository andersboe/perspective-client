define(function(require) {

  var template = require('rv!./board.html');
  var tasksPartial = require('rv!../tasks/tasks.html');
  var tasksController = require('../tasks/tasks-controller-helper');
  var Ractive = require('Ractive');
  var _ = require('underscore');

  return Ractive.extend(_.extend({
    template: template,
    init: function() {
      this.on({
        removeTask: this.task.remove,
        addTask: this.task.add,
        'dragndrop-items': function (event) {

          console.log(event);

        }
      });
    },
    partials: {
      tasks: tasksPartial
    },
    data: {
      filterTasks: function(arr, filter) {
        return arr.filter(filter);
      }
    }
  }, tasksController));
});