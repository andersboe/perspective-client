define(function(require) {

  var WebSocketClient = require('web-socket/web-socket-client');

  var _client = null;

  return {
    createConnection: function(config) {
      _client = new WebSocketClient(config);
    },
    client: function() {
      return _client;
    }
  };

});