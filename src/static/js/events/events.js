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
        var filters = config.get().events.filter;
        var ignoreEvent = false;
        Object.keys(filters).forEach(function(key) {
          if(filters[key]) {
            if(event.data[key].indexOf(filters[key]) === -1) {
              console.log(key + " filter ignored " + event.data[key]);
              ignoreEvent = true;
            }
          }
        });

        if(ignoreEvent) {
          return;
        }

        var notification = {
          title: event.data.title,
          body: event.data.details
        };

        if(event.data.conversationId) {
          notification.tag = event.data.conversationId;
        }

        desktopNotifications.show(notification);
      });
    }
  };
});