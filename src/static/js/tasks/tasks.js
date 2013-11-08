define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var Model = require('perspective-core').Model;
  var Task = require('tasks/task');
  var _ = require('underscore');

  var Tasks = Model.extend({
    getAll: function() {
      var tasks = this;
      request.get(getTasksUrl()).end(function(res) {
        if (res.error) {
          //TODO ned error handling
          console.log("Get all tasks failed");
          return;
        }
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

    get: function(id) {
    	var task = new Task();
      request.get(getTasksUrl(id)).end(function(res) {
      	task.setAttributes(res.body);
      });


      return task;
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

  function getTasksUrl(id) {
    var url = config.getConfig().tasksUrl + "/tasks";

    if(id) {
      url += '/' + id;
    }

    return url;
  }

  return new Tasks();

});