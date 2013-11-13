define(function(require) {

  var Ractive = require('Ractive');
  var appTemplate = require('rv!./app.html');
  var Sections = require('section/sections');
  var Router = require('router');
  var config = require('config');
  var events = require('events/events');

  return Ractive.extend({
    template: appTemplate,
    start: function(options) {
      this.sections = new Sections(options.sections);

      if(config.get().events.enabled) {
        events.listen();
      }

      this.router = new Router({sections: this.sections});
    },
    data: {
      config: config
    }
  });

});