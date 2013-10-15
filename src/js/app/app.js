define(function(require) {

  var _ = require('underscore');
  var Section = require('section/section');

  var appTemplate = require('rv!./app.html');
  var Ractive = require('Ractive');
  var Router = require('router');

  var sections = {};
  var router;

  function addSections(newSections) {
    _.each(newSections, function(selector, name) {
      sections[name] = new Section(selector);
    }, this);
  }


  var App = Ractive.extend({
    template: appTemplate,
    start: function(done) {
      addSections({
        "main": "#main",
        "overlay": "#overlay",
        "menu": "#menu",
        "app": "#app"
      });

      router = new Router({sections: sections});

      if (done) {
        done();
      }
    }
  });

  return App;

});