define(function(require) {

  var Backbone = require('backbone'),
    sync = require('components/sync');

  var Model = Backbone.Model.extend({

    sync: sync

  });

  return Model;

});