define(function(require) {

  var Backbone = require('backbone');
  var _ = require('underscore');

  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  return function(options) {
    options = options || {};
    var baseUrl = options.baseUrl || "";

    return function(method, model, options) {
      options = options || {};

      var url = options.url || _.result(model, 'url') || urlError();

      options.url = url.match("^https?://") ? url : baseUrl + url;

      return Backbone.sync.apply(model, arguments);
    };

  };

});