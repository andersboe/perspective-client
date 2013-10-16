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

  Router.prototype.index = function() {

  };

  Router.prototype.notFound = function() {
    this.sections.main.show(NotFound);
  };

  Router.prototype.list = function() {

  };


  return Router;

});