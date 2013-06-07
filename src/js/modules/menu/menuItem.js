define(function(require) {

  var Model = require('base/model');

  return Model.extend({

    defaults: {
      iconClass: undefined,
      link: undefined
    }

  });

});