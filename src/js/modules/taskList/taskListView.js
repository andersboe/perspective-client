define(function(require) {

  var View = require('base/view');
  var taskListTemplate = require('hb!./taskList');
  var TaskListItemView = require('./taskListItemView');
  var TaskInputView = require('./taskInputView');

  require('jQuerySortable');

  return View.extend({

    template: taskListTemplate,

    events: {
      "click #add": "setFocus"
    },

    initialize: function(options) {
      this.tasks = options.tasks;

      this.listenTo(this.tasks, 'add', this.render);
      this.listenTo(this.tasks, 'reset', this.render);
    },

    render: function() {
      this.destroySubViews();
      this.renderTemplate();

      var items = this.tasks.map(function(item) {
        return this.renderTask(item);
      }, this);

      this.$('.list').html(items).sortable();

      this.renderInputView(this.$('.list-input'));

      this.$addButton = this.$('#add');

      return this;
    },

    setFocus: function() {
      this.taskInputView && this.taskInputView.focus();
    },

    renderInputView: function(el) {
      this.taskInputView = this.taskInputView || new TaskInputView({ tasks: this.tasks });
      this.addSubView(this.taskInputView);
      this.taskInputView.setElement(el);
      this.taskInputView.render();
    },

    renderTask: function(task) {
      var taskListItemView = new TaskListItemView({task:task});
      this.addSubView(taskListItemView);
      this.listenTo(taskListItemView, 'priorityChanged', this.updateSort, this);

      return taskListItemView.render().el;
    },

    updateSort: function(item) {
      var newSortOrder = [],
          newIndexForItem = -1;

      this.$('.list > li').each(function(index) {
        var id = $(this).data('id');
        if(id === item.get('id')) {
          newIndexForItem = index;
        }
        newSortOrder.push(id);
      });

      this.tasks.updatePriorityForTask(item, newSortOrder, newIndexForItem);

    }

  });

});