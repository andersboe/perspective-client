define(function(require) {

  var template = require('rv!./board.html');
  var tasksPartial = require('rv!../tasks/tasks.html');
  var tasksController = require('../tasks/tasksController');
  var Ractive = require('Ractive');
  var _ = require('underscore');

  return Ractive.extend(_.extend({
    template: template,
    init: function() {
      this.on({
        removeTask: this.task.remove,
        addTask: this.task.add
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