define(function(require) {

  var webSocketHelper = require('webSocketHelper');
  var config = require('config');

  var socket = new WebSocket(config.webSocket.href, config.webSocket.protocol);

  socket.onopen = function() {
    console.log("WebSocket connection opened")
  };

  socket.onclose = function() {
    console.log("WebSocket connection closed");
  };

  socket.onmessage = function(message) {
    var errors = webSocketHelper.onMessage(message.data);

    if (errors) {
      console.log(errors);
    }
  };

  var WebSocketClient = function(channel) {
    this.channel = channel;
  };

  WebSocketClient.prototype.send = function(event, object) {
    var jsonString = webSocketHelper.createJSONString(this.channel, event, object);
    socket.send(jsonString);
  };

  WebSocketClient.prototype.on = function(event, callback) {
    webSocketHelper.on(this.channel, event, callback);
  };

  WebSocketClient.prototype.standardEvents = webSocketHelper.standardEvents;

  return WebSocketClient;
});