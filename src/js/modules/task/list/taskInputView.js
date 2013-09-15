define(function(require) {

  var View = require('base/view');
  var taskInput = require('hb!./taskInput');

  return View.extend({

    initialize: function(options) {
      options = options || {};
      this.tasks = options.tasks;
    },

    template: taskInput,

    events: {
      'submit': 'createTask'
    },

    render: function() {
      this.renderTemplate();
      this.$input = this.$('.new-task-input');

      return this;
    },

    focus: function() {
      this.$input.focus();
    },

    createTask: function (e) {
      e.preventDefault();

      if (!this.$input.val().trim()) {
        return;
      }

      var task = this.getListItemAttributes();
      if(this.delegate && this.delegate.willCreateTask) {
        this.delegate.willCreateTask(task);
      }
      this.tasks.create(task);

      this.$input.val('');
      this.$input.focus();
    },

    getListItemAttributes: function () {
      var view = this;
      return {
        title: view.$input.val().trim()
      };
    }

  });

});