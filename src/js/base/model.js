define(function(require) {

  var Backbone = require('backbone'),
    ajaxSync = require('components/ajaxSync'),
    config = require('../config');

  var Model = Backbone.Model.extend({

    sync: ajaxSync({baseUrl: config.serverUrl})

  });

  return Model;

});