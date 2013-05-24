define(function(require) {

  var Backbone = require('backbone');
  var ajaxSync = require('components/ajaxSync');
  var config = require('../config');

  return Backbone.Model.extend({

    sync: ajaxSync({baseUrl: config.serverUrl})

  });

});