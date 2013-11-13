define(function(require) {

  var template = require('rv!./settings.html');
  var desktopNotifications = require('./desktop-notifications');
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