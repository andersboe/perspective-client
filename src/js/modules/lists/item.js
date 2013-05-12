define(function(require) {

  var Model = require('base/model');

  var Item = Model.extend({
    defaults: {
      title: undefined
    },
    urlRoot: '/tasks'
  });

  return Item;

});