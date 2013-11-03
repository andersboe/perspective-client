define(function(require) {
  var request = require('request');
  var config = require('config');

  var Model = require('perspective-core').Model;

  var Tasks = Model.extend({
    getAll: function() {
      var tasks = this;
      request.get(config.getConfig().tasksUrl + "/tasks", function(res) {
        tasks.attr.list = res.body;
      });
    }
  });

  return new Tasks();

});