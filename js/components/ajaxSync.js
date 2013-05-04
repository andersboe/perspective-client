define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    config = require('../config');

  var baseUrl = config.serverUrl;

  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  return function(method, model, options) {
    options = options || {};

    var url = options.url || _.result(model, 'url') || urlError();
    options.url = baseUrl + url;

    Backbone.sync.apply(this, arguments);
  };

});