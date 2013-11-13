define(function(require) {

  var template = require('rv!./settings.html');
  var desktopNotifications = require('../notifications/desktop');
  var Ractive = require('Ractive');

  return Ractive.extend({
    template: template,
    init: function() {
      this.on({
        setupDesktopNotifications: desktopNotifications.setup
      });
    }
  });

});