define(function(require) {

  var WebSocketClient = require('web-socket/webSocketClient');
  var config = require('config');

  return new WebSocketClient(config.jenkinsWebSocket);

});