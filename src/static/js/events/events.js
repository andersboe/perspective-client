define(function(require) {
  var WebSocketClient = require('web-socket/web-socket-client');
  var config = require('config');
  var desktopNotifications = require('../notifications/desktop');
  var Model = require('perspective-core').Model;
  var _ = require('underscore');

  var Events = Model.extend({
    getFilters: function() {
      this.attr.filters = [];
    },
    addFilter: function(filter) {
      if(filter) {
        this.attr.filters.push(filter);
      }
    },
    updateFilter: function(index, filter) {
      if(filter) {
        this.attr.filters[index] = filter;
      }
    },
    removeFilter: function(index) {
      this.attr.filters.splice(index, 1);
    },
    listen: function() {
      var events = this;
      if(!this.wsClient) {
        this.wsClient = new WebSocketClient(config.get().events.wsUrl);
        this.wsClient.connect();
      }

      this.wsClient.channel("events").on("event", function(event) {
        events._processEvent(event.data);
      });
    },
    _processEvent: function(event) {
      var defaultOptions = {};
      if(event.conversationId) {
        _.defaults(defaultOptions, event.conversationId);
      }

      var functions = {
        pin: function(options) {
          _.defaults(options, defaultOptions);
          desktopNotifications.show(options);
        }
      };

      this.attr.filters.forEach(function(filter) {
        if(filter.condition.fn(event)) {
          filter.action.fn(event, functions);
        }
      });
    }
  });

  return new Events();
});