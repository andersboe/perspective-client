define(function(require) {
  var _ = require("underscore");

  return {
    task: {
      remove: function(e) {
        this.data.tasks.remove(e.context.id);
      },
      add: function(e) {
        var task = {
          title: e.node.value
        };
        task = _.defaults(task, e.context.newTaskProperties || {});
        this.data.tasks.add(task);
        e.node.value = "";
      },
      save: function(e) {
      	var button = $(e.node);
    		var title = button.parent().find(".title").text();
    		if (e.context.task.attr.title !=  title) {
    			this.data.task.save({title: title});
    		};

      }
    },
    data: {
      filterTasks: function(tasks, filter) {
        return filter ? tasks.filter(filter) : tasks;
      }
    }
  };
});