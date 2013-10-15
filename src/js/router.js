define(function(require) {

  var page = require('page');
  var NotFound = require('not_found/notFound');
  var _ = require('underscore');

  var Router = function(options) {
    this.sections = options.sections;

    page('/', _.bind(this.index, this));
    page('/list', _.bind(this.list, this));
    page('/*', _.bind(this.notFound, this));
    page();
  };

  Router.prototype.index = function(context, next) {
    this.sections.main.show(NotFound)
  };

  Router.prototype.notFound = function(context, next) {
    this.sections.main.show(NotFound)
  };

  Router.prototype.list = function(context, next) {
    console.log("dhdhdh");
    this.sections.main.show(NotFound)
  };


  return Router;

});