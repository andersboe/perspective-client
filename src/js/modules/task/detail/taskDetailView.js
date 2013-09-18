define(function(require) {

  var View = require('base/view');
  var taskDetailTemplate = require('hb!./taskDetail');

  return View.extend({

    template: taskDetailTemplate,

    initialize: function(options) {
      this.task = options.task;
    },

    events: {
      'click .title-heading': 'edit',
      'click .edit.title > .save': 'save',
      'click .edit.title > .discard': 'discard'
    },

    bindings: {
        '.title-heading': 'title'
    },

    render: function() {
      this.renderTemplate();
      this.stickit(this.task);

      return this;
    },

    edit: function() {
      this.$titleHeading().addClass('hidden');
      this.$editArea().removeClass('hidden');
    },

    discard: function() {
      this.$titleHeading().removeClass('hidden');
      this.$editArea().addClass('hidden');
    },

    save: function() {
      this.task.set('title', this.$editText().val());
      this.$titleHeading().removeClass('hidden');
      this.$editArea().addClass('hidden');
      this.task.save();
    },

    $titleHeading: function() {
      return this.$('.title-heading');
    },

    $editArea: function() {
      return this.$('.edit.title');
    },

    $editText: function() {
      return this.$('.edit.title > .text');
    }

  });

});