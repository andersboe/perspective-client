define(function(require) {

  var Model = require('base/model');

  return Model.extend({

    defaults: {
      title: undefined
    },

    urlRoot: '/tasks'

  });

});