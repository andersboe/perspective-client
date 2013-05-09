define(function(require) {

  var BaseRouter = require('base/router'),
    ListView = require('modules/lists/listView'),
    List = require('modules/lists/list'),
    Item = require('modules/lists/item');

  var Router = BaseRouter.extend({

    initialize: function(sections) {
      this.sections = sections;
    },

    routes: {
      '': 'list'
    },

    list: function() {
      var list = new List([
        new Item({title: "Baah"}),
        new Item({title: "Baah"})
      ]);
      var listView = new ListView({list: list});

      this.sections.main.show(listView).render();
    }
  });

  return Router;

});