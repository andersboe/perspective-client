define(function(require) {

  var page = require('page');
  var NotFound = require('not_found/notFound');
  var Jenkins = require('jenkins/jenkinsView');
  var _ = require('underscore');
  var jenkins = require('jenkins/jenkins');
  var TasksView = require('tasks/tasksView');
  var tasks = require('tasks/tasks');

  var Router = function(options) {
    this.sections = options.sections;

    page('/', _.bind(this.index, this));
    page('/list', _.bind(this.list, this));
    page('/jenkins', _.bind(this.jenkins, this));

    page('/*', _.bind(this.notFound, this));
    page();
  };

  Router.prototype.index = function() {
    this.sections.main.show(TasksView, tasks.attr);
    tasks.getAll();
  };

  Router.prototype.notFound = function() {
    this.sections.main.show(NotFound);
  };

  Router.prototype.list = function() {

  };

  Router.prototype.jenkins = function() {
    jenkins.listen();
    this.sections.main.show(Jenkins, jenkins.attr);
    jenkins.getAll();
  };

  return Router;

});