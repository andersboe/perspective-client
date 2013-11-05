define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var Model = require('perspective-core').Model;
  var _ = require('underscore');

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

    remove: function(id) {
      var tasks = this;
      var task = tasks.attr.list.filter(function(task) {
        return task.id === id;
      })[0];

      request.del(getTasksUrl() + "/" + id).end(function() {
        tasks.attr.list = _.without(tasks.attr.list, task);
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