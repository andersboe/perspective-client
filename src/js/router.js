define(function(require) {

  var BaseRouter = require('base/router');
  var TaskListView = require('modules/task/list/taskListView');
  var Task = require('modules/task/task');
  var Tasks = require('modules/task/tasks');
  var TaskDetailView = require('modules/task/detail/taskDetailView');

  var OverlayView = require('modules/overlay/overlayView');

  var Router = BaseRouter.extend({

    initialize: function(sections) {
      this.sections = sections;
    },

    routes: {
      '': 'list',
      'task/:id': 'taskDetail'
    },

    list: function() {
      var tasks = new Tasks();
      var listView = new TaskListView({tasks: tasks});
      this.sections.main.show(listView).render();
      tasks.fetch({reset: true});
    },

    taskDetail: function(id) {
      var task = new Task({id: id});
      var taskDetailView = new TaskDetailView({task: task});

      this.showInOverlay(taskDetailView);

      task.fetch();
    },

    showInOverlay: function(view) {

      if (!this.overlayView) {
        this.overlayView = new OverlayView({hideFunction: function() {
          window.history.back();
        }});

        this.sections.overlay.show(this.overlayView);
      }

      this.overlayView.render();
      this.overlayView.show(view);
    }

  });

  return Router;

});