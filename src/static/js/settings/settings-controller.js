define(function(require) {

  var template = require('rv!./settings.html');
  var config = require('../config');
  var desktopNotifications = require('../notifications/desktop');
  var Ractive = require('Ractive');

  return Ractive.extend({
    template: template,
    init: function() {
      this.on({
        setupDesktopNotifications: desktopNotifications.setup,
        updateEventFilter: function(e) {
          var filterName = e.node.name;
          config.get().events.filter[filterName] = e.node.value;
        }
      });
    }
  });

});