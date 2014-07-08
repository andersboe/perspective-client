define(function(require) {

  var template = require('rv!./statistics.html');
  //var tasksPartial = require('rv!../tasks/tasks.html');
  //var tasksController = require('../tasks/tasks-controller-helper');
  var Ractive = require('Ractive');
  var _ = require('underscore');

  return Ractive.extend({
    template: template,
    init: function() {
      this.data.infos = [
        {
          description: "data",
          condition: "...",
        },
        {
          description: "data2",
          condition: "event.type === 'build'",
        }
      ];

      this.on({
        changeData: function(e) {
          this.data.infos = [
        {
          description: "change",
          condition: "=)",
          action: 'action'
        },
        {
          description: "change2",
          condition: "event.type === 'build'",
        }
      ];
        }
      });
    }
  });

});