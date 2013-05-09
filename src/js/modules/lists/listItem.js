define(function(require) {

  var View = require('base/view');

  var List = View.extend({

    initialize: function(options) {
      this.list = options.list;
    },

    bindings: {
      '#title': 'title',
      '#author': 'authorName'
    },

    render: function() {
      this.renderTemplate();
      this.stickit(this.otherModel);
    }

  });

  return List;

});