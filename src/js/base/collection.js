define(function(require) {

  var Backbone = require('backbone'),
    sync = require('components/sync');

  var Collection = Backbone.Collection.extend({

    sync: sync

  });

  return Collection;

});