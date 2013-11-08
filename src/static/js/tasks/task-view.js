define(function(require) {

  var template = require('rv!./task.html');
  var Ractive = require('Ractive');
  var tasksController = require('./tasks-controller');
  var _ = require('underscore');


  return Ractive.extend(_.extend({
    template: template,
    init: function() {
      this.on({
      	save: this.task.save
      });
    }
  }, tasksController));
});