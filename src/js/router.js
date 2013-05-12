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
        new Item({title: "Task 1", id: 1, priority: 1}),
        new Item({title: "Task 3", id: 3, priority: 3}),
        new Item({title: "Task 4", id: 4, priority: 4}),
        new Item({title: "Task 2", id: 2, priority: 2}),
        new Item({title: "Task 5", id: 5, priority: 5})
      ]);
      var listView = new ListView({list: list});

      this.sections.main.show(listView).render();
    }
  });

  return Router;

});