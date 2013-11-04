define(function(require) {
  var request = require('superagent');
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