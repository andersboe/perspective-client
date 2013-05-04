define(function(require) {

  var BaseRouter = require("base/router");

  var Router = BaseRouter.extend({

    initialize: function(sections) {
      this.sections = sections;
    },

    routes: {
      '': 'list'
    },

    list: function() {

    }
  });

  return Router;

});