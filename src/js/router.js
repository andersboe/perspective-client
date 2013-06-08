define(function(require) {

  var BaseRouter = require('base/router');

  var TaskListView = require('modules/task/list/taskListView');
  var Task = require('modules/task/task');
  var Tasks = require('modules/task/tasks');
  var TaskDetailView = require('modules/task/detail/taskDetailView');

  var OverlayView = require('modules/overlay/overlayView');

  var MenuView = require('modules/menu/menuView');
  var MenuItem = require('modules/menu/menuItem');
  var MenuItems = require('modules/menu/menuItems');

  var Router = BaseRouter.extend({

    initialize: function(sections) {
      this.sections = sections;

      var menuItems = new MenuItems([
        new MenuItem({
          iconClass: 'icon-th-list',
          link: '#list'
        }),
        new MenuItem({
          iconClass: 'icon-columns',
          link: '#board'
        })
      ]);

      this.menuView = new MenuView({menuItems: menuItems});
      this.sections.menu.show(this.menuView);
      this.menuView.render();
    },

    routes: {
      '': 'list',
      'list': 'list',
      'board': 'boards',
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

    boards: function() {

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