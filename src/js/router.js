define(function(require) {

  var page = require('page');
  var NotFound = require('not_found/notFound');
  var Jenkins = require('jenkins/jenkinsView');
  var _ = require('underscore');
  var jenkinsData = require('jenkins/jenkinsData');

  var Router = function(options) {
    this.sections = options.sections;

    page('/', _.bind(this.index, this));
    page('/list', _.bind(this.list, this));
    page('/jenkins', function(ctx, next) {

      jenkinsData.get(function() {
        next();
      });

    }, _.bind(this.jenkins, this));

    page('/*', _.bind(this.notFound, this));
    page();
  };

  Router.prototype.index = function() {

  };

  Router.prototype.notFound = function() {
    this.sections.main.show(NotFound);
  };

  Router.prototype.list = function() {

  };

  Router.prototype.jenkins = function(ctx, next) {
    this.sections.main.show(Jenkins, {data: jenkinsData.data});

    var router = this;

    jenkinsData.ws(function() {
      router.sections.main.currentView.update('jobs');
    });
  };

  return Router;

});