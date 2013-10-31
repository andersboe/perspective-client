define(function() {

  var _config = {
    tasksUrl: null,
    jenkinsUrl: null,
    jenkinsWebSocket: {
      href: null,
      protocol: null
    },
    port: null
  };

  return {
    setConfig: function(config) {
      _config = config;
    },
    getConfig: function() {
      return _config;
    }
  };

});