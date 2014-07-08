define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var _ = require('underscore');
  var WebSocketClient = require('web-socket/web-socket-client');
  var treeParser = require('tree-parser/tree-parser');
  var Model = require('perspective-core').Model;

  var Statistics = Model.extend({
    defaults: {
      number: 0
    },
    listen: function() {
      var statistics = this;

      if(!this.wsClient) {
        this.wsClient = new WebSocketClient(config.get().statistics.wsUrl);
        this.wsClient.connect();
      }

      this.wsClient.channel("statistics").on("jobs_changed", function(number) {
        console.log("data mottat:", number);
        statistics.attr.number = number.data;
        console.log(number);
      });
    }

  });
  return new Statistics();
});