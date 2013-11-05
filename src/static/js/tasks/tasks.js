define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var Model = require('perspective-core').Model;

  var Tasks = Model.extend({
    getAll: function() {
      var tasks = this;
      request.get(getTasksUrl(), function(res) {
        tasks.attr.list = res.body;
      });
    },

    last: function() {
      var list = this.attr.list;

      if(list.length > 0) {
        return list[list.length - 1];
      } else {
        return null;
      }
    },

    remove: function(index) {
      var tasks = this;
      var task = tasks.attr.list[index];

      request.del(getTasksUrl() + "/" + task.id).end(function() {
        tasks.attr.list.splice(index, 1);
      });
    },

    add: function(task) {
      var tasks = this;
      var last = tasks.last();

      if(last) {
        task.lastItemInListId = last.id;
      }

      request.post(getTasksUrl())
        .send(task)
        .end(function(res) {
          tasks.attr.list.push(res.body);
        });
    }
  });

  function getTasksUrl() {
    return config.getConfig().tasksUrl + "/tasks";
  }

  return new Tasks();

});