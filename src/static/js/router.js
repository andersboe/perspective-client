define(function(require) {

  var page = require('page');
  var NotFound = require('not_found/notFound');
  var JenkinsController = require('jenkins/jenkinsController');
  var _ = require('underscore');
  var jenkins = require('jenkins/jenkins');
  var TasksController = require('tasks/tasksController');
  var tasks = require('tasks/tasks');

  var Router = function(options) {
    this.sections = options.sections;

    page('/', _.bind(this.index, this));
    page('/board', _.bind(this.board, this));
    page('/jenkins', _.bind(this.jenkins, this));

    page('/*', _.bind(this.notFound, this));
    page();
  };

  Router.prototype.index = function() {
    this.sections.main.show(TasksController, {tasks: tasks});
    tasks.getAll();
  };

  Router.prototype.board = function() {
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