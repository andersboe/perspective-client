define(function(require) {
  var WebSocketClient = require('web-socket/web-socket-client');
  var config = require('config');
  var desktopNotifications = require('../notifications/desktop');

  return {
    listen: function() {
      if(!this.wsClient) {
        this.wsClient = new WebSocketClient(config.get().events.wsUrl);
        this.wsClient.connect();
      }

      this.wsClient.channel("events").on("event", function(event) {
        desktopNotifications.show({
          title: event.data.title,
          body: event.data.details
        });
      });
    }
  };
});