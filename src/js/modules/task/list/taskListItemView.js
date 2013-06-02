define(function(require) {

  var View = require('base/view');
  var taskListItem = require('hb!./taskListItem');

  return View.extend({

    initialize: function(options) {
      this.task = options.task;
      this.listenTo(this.task, 'change', this.render);
      this.listenTo(this.task, 'destroy', this.destroy);
    },

    tagName: 'li',

    template: taskListItem,

    events: {
      'dragend': 'dragend',
      'click .remove': 'removeTask'
    },

    bindings: {
      '.title': 'title'
    },

    dragend: function() {
      this.trigger('priorityChanged', this.task);
    },

    render: function() {
      this.renderTemplate(this.task.toJSON());
      this.stickit(this.task);
      this.$el.attr('data-id', this.task.get('id'));
      return this;
    },

    removeTask: function() {
      this.task.destroy();
    }

  });

});