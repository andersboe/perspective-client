define(function(require) {

  var template = require('rv!./tasks.html');
  var Ractive = require('Ractive');
  var tasksController = require('./tasksController');
  var _ = require('underscore');


  return Ractive.extend(_.extend({
    template: template,
    init: function() {
      this.on({
        removeTask: this.task.remove,
        addTask: this.task.add
      });
    }
  }, tasksController));
});