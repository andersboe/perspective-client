define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore');


  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  return function(options) {
    var baseUrl = options.baseUrl || "";

    return function(method, model, options) {
      options = options || {};

      var url = options.url || _.result(model, 'url') || urlError();
      options.url = baseUrl + url;

      Backbone.sync.apply(this, arguments);
    }

  };

});