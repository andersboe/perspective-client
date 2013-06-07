define(function(require) {

  var Collection = require('base/collection');
  var MenuItem = require('./menuItem');

  return Collection.extend({

    model: MenuItem

  });

});