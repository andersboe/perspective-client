define(function(require) {

  var Ractive = require('Ractive');
  var appTemplate = require('rv!./app.html');

  var Sections = require('section/sections');
  var Router = require('router');

  return Ractive.extend({
    template: appTemplate,
    start: function(done) {
      this.sections = new Sections({
        "main": "#main",
        "overlay": "#overlay",
        "menu": "#menu",
        "app": "#app"
      });

      this.router = new Router({sections: this.sections});

      if (done) {
        done();
      }
    }
  });

});