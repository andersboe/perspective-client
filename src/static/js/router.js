define(function(require) {

  var page = require('page');
  var NotFound = require('not_found/notFound');
  var JenkinsController = require('jenkins/jenkinsController');
  var _ = require('underscore');
  var jenkins = require('jenkins/jenkins');
  var TasksView = require('tasks/tasksView');
  var tasks = require('tasks/tasks');
  var BoardController = require('board/boardController');

  var Router = function(options) {
    this.sections = options.sections;

    page('/', _.bind(this.index, this));
    page('/board', _.bind(this.board, this));
    page('/jenkins', _.bind(this.jenkins, this));

    page('/*', _.bind(this.notFound, this));
    page();
  };

  Router.prototype.index = function() {
    this.sections.main.show(TasksView, {tasks: tasks});
    tasks.getAll();
  };

  Router.prototype.board = function() {
    var columnConfig = [
      {
        title: "Backlog",
        filter: function(task) {
          return _.isUndefined(task.labels);
        }
      },
      {
        title: "Todo",
        newTaskProperties: {
          labels: [1]
        },
        filter: function(task) {
          return _.contains(task.labels, 1);
        }
      },
      {
        title: "In progress",
        newTaskProperties: {
          labels: [2]
        },
        filter: function(task) {
          return _.contains(task.labels, 2);
        }
      }

    ];

    this.sections.main.show(BoardController, {tasks: tasks, columns: columnConfig});
    tasks.getAll();
  };

  Router.prototype.jenkins = function() {
    jenkins.listen();
    this.sections.main.show(JenkinsController, {jenkins: jenkins});
    jenkins.getAll();
  };

  Router.prototype.notFound = function() {
    this.sections.main.show(NotFound);
  };

  return Router;

});