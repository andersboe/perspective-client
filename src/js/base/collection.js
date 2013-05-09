define(function(require) {

  var Backbone = require('backbone'),
    ajaxSync = require('components/ajaxSync'),
    config = require('../config');

  var Collection = Backbone.Collection.extend({

    sync: ajaxSync({baseUrl: config.serverUrl})

  });

  return Collection;

});