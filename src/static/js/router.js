/*jshint maxstatements:999 */
define(function(require) {

  var page = require('page');
  var NotFoundController = require('not-found/not-found-controller');
  var JenkinsController = require('jenkins/jenkins-controller');
  var _ = require('underscore');
  var jenkins = require('jenkins/jenkins');
  var TasksController = require('tasks/tasks-controller');
  var TaskController = require('tasks/task-controller');
  var tasks = require('tasks/tasks');
  var events = require('events/events');
  var statistics = require('statistics/statistics');
  var BoardController = require('board/board-controller');
  var SettingsController = require('settings/settings-controller');
  var StatisticsController = require('statistics/statistics-controller');
  var config = require('config');

  var Router = function(options) {
    this.sections = options.sections;

    page('/', _.bind(this.index, this));
    page('/tasks/:taskId', _.bind(this.task, this));
    page('/board', _.bind(this.board, this));

    if(config.get().jenkins.enabled) {
      page('/jenkins', _.bind(this.jenkins, this));
    }

    page('/settings', _.bind(this.settings, this));

    page('/statistics', _.bind(this.statistics, this));

    page('/*', _.bind(this.notFound, this));
    page();
  };

  Router.prototype.index = function() {
    this.sections.main.show(TasksController, {tasks: tasks});
    tasks.getAll();
  };

  Router.prototype.task = function(ctx) {
    var taskId = ctx.params.taskId;
    var task = tasks.get(taskId);
    this.sections.main.show(TaskController, {task: task});
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

  Router.prototype.settings = function() {
    this.sections.main.show(SettingsController, {events: events});
    events.getFilters();
  };

  Router.prototype.statistics = function() {
    statistics.listen();
    this.sections.main.show(StatisticsController, {});
  };

  Router.prototype.notFound = function() {
    this.sections.main.show(NotFoundController);
  };

  return Router;

});