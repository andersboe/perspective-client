define(function(require) {

  var webSocketHelper = require('web-socket-helper');

  var WebSocketClient = function(config) {
    var socket = this.socket = new WebSocket(config.href, config.protocol);

    socket.onopen = function() {
      console.log("WebSocket connection opened");
    };

    socket.onclose = function() {
      console.log("WebSocket connection closed");
    };

    socket.onmessage = function(message) {
      var errors = webSocketHelper.callCallbacksForMessage(message.data);

      if (errors) {
        console.log(errors);
      }
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