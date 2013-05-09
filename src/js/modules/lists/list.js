define(function(require) {

  var View = require('base/view'),
    listTemplate = require('./list');

  var List = View.extend({

    template: listTemplate,

    initialize: function(options) {
      this.list = options.list;
    },

    bindings: {
      '#title': 'title',
    },

    render: function() {
      this.renderTemplate();
      this.stickit(this.otherModel);
    }

  });

  return List;

});