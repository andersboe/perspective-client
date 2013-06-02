define(function(require) {

  var View = require('base/view');
  var taskDetailTemplate = require('hb!./taskDetail');

  return View.extend({

    template: taskDetailTemplate,

    initialize: function(options) {
      this.task = options.task;
    },

    bindings: {
      '.title-heading': 'title'
    },

    render: function() {
      this.renderTemplate();
      this.stickit(this.task);
    }

  });

});