define(function(require) {

  var template = require('rv!./tasks.html');
  var Ractive = require('Ractive');

  return Ractive.extend({
    template: template,
    init: function() {
      this.on({
        removeTask: this.removeTask,
        addTask: this.addTask
      });
    },
    removeTask: function(e) {
      this.data.tasks.remove(e.index.i);
    },
    addTask: function(e) {
      this.data.tasks.add({title: e.node.value});
      e.node.value = "";
    }
  });
});