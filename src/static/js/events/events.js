define(function(require) {
  var WebSocketClient = require('web-socket/web-socket-client');
  var config = require('config');

  return {
    listen: function() {
      if(!this.wsClient) {
        this.wsClient = new WebSocketClient(config.get().events.wsUrl);
        this.wsClient.connect();
      }

      this.wsClient.channel("events").on("event", function(event) {
        var notification = new window.Notification(event.data.title);
        notification.onshow = function() {
          window.setTimeout(function() {
            notification.close();
          }, 2000);
        };
      });
    }
  };
});