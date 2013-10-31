define(function(require) {

  var Ractive = require('Ractive');
  var appTemplate = require('rv!./app.html');

  var Sections = require('section/sections');
  var Router = require('router');

  var config = require('config');
  var wsJenkins = require('jenkins/wsJenkins');

  return Ractive.extend({
    template: appTemplate,
    start: function(options) {
      this.sections = new Sections({
        "main": "#main",
        "overlay": "#overlay",
        "menu": "#menu",
        "app": "#app"
      });

      config.setConfig(options.config);
      wsJenkins.createConnection(config.getConfig().jenkinsWebSocket);

      this.router = new Router({sections: this.sections});
    }
  });

});