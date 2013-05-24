define(function(require) {

  var BaseRouter = require('base/router'),
    TaskListView = require('modules/taskList/taskListView'),
    Tasks = require('modules/task/tasks'),
    Task = require('modules/task/task');

  var Router = BaseRouter.extend({

    initialize: function(sections) {
      this.sections = sections;
    },

    routes: {
      '': 'list'
    },

    list: function() {
      var tasks = new Tasks();
      var listView = new TaskListView({tasks: tasks});
      this.sections.main.show(listView).render();
      tasks.fetch();
    }
  });

  return Router;

});