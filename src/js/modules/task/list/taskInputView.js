define(function(require) {

  var View = require('base/view');
  var taskInput = require('hb!./taskInput');

  return View.extend({

    initialize: function(options) {
      this.tasks = options.tasks;
    },

    template: taskInput,

    events: {
      'keypress #new-task-input': 'createOnEnter'
    },

    render: function() {
      this.renderTemplate();
      this.$input = this.$('#new-task-input');

      return this;
    },

    focus: function() {
      this.$input.focus();
    },

    createOnEnter: function (e) {
      if (e.which !== 13 || !this.$input.val().trim()) {
        return;
      }

      this.tasks.create(this.getListItemAttributes());

      this.$input.val('');
    },

    getListItemAttributes: function () {
      return {
        title: this.$input.val().trim()
      };
    }

  });

});