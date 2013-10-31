define(function(require) {
  var request = require('request');
  var config = require('config');

  var Tasks = function() {
    this.list = [];
  };

  Tasks.prototype = {
    getAll: function() {
      var tasks = this;
      request.get(config.getConfig().tasksUrl + "/tasks", function(res) {
         tasks.list = res.body;
      });
    }
  };

  return new Tasks();
});