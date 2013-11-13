define(function(require) {

  var webSocketHelper = require('web-socket-helper');

  function WebSocketClient(url) {
    this.url = url;
  }

  WebSocketClient.prototype.connect = function() {
    var wsClient = this;
    var socket = this.socket = new WebSocket(wsClient.url, "perspective-protocol");

    socket.onopen = function() {
      console.log("WebSocket connected to " + wsClient.url);
    };

    socket.onclose = function() {
      console.log("WebSocket connection closed to " + wsClient.url + " - Reconnecting...");
      window.setTimeout(function() {
        wsClient.connect();
      }, 2000);
    };

    socket.onmessage = function(message) {
      var errors = webSocketHelper.callCallbacksForMessage(message.data);

      if (errors) {
        console.log(errors);
      }
    };

    socket.onerror = function(error) {
      console.log('WebSocket error against ' + wsClient.url, error);
    };
  };

  WebSocketClient.prototype.channel = function(channel) {
    var socket = this.socket;
    return {
      send: function(event, object) {
        var jsonString = webSocketHelper.createJSONString(channel, event, object);
        socket.send(jsonString);
      },
      on: function(event, callback) {
        webSocketHelper.addCallbackToEventOnChannel(channel, event, callback);
      },
      off: function(event, callback) {
        webSocketHelper.removeCallbackForEventOnChannel(channel, event, callback);
      }
    };
  };

  return WebSocketClient;

});