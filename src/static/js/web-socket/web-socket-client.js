define(function(require) {

  var webSocketHelper = require('web-socket-helper');

  var WebSocketClient = function(config) {
    var self = this;

    var initConnection = function(config) {
      var socket = self.socket = new WebSocket(config.href, config.protocol);

      var onCloseCallback = function() {
        initConnection(config);
      };

      initEvents(socket, onCloseCallback);
    };

    initConnection(config);
  };

  var initEvents = function (socket, onCloseCallback) {
    socket.onopen = function() {
      console.log("WebSocket connection opened");
    };

    socket.onclose = function() {
      console.log("WebSocket connection closed - Reconnecting...");
      setTimeout(function () {
        onCloseCallback();
      }, 2000);
    };

    socket.onmessage = function(message) {
      var errors = webSocketHelper.callCallbacksForMessage(message.data);

      if (errors) {
        console.log(errors);
      }
    };

    socket.onerror = function(error) {
      console.log('WebSocket error', error);
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