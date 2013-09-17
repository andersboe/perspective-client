define(function(require) {

  var SortableView = require("base/sortableView");
  var taskListTemplate = require('hb!./taskList');
  var TaskListItemView = require('./taskListItemView');
  var TaskInputView = require('./taskInputView');
  var $ = require('jquery');

  return SortableView.extend({

    template: taskListTemplate,

    initialize: function(options) {
      this.tasks = options.tasks;
      this.filter = options.filter || function() {return true;};
      this.sortOptions = {
        listSelector: ".list"
      };

      this.listenTo(this.tasks, 'add', this.render);
      this.listenTo(this.tasks, 'reset', this.render);
    },

    render: function() {
      this.destroySubViews();
      this.renderTemplate();

      var items = this.tasks.filter(this.filter).map(function(item) {
        return this.renderTask(item);
      }, this);

      this.$('.list').html(items);
      this.refreshSorting();
      this.renderInputView(this.$('.list-input'));

      return this;
    },

    renderInputView: function($el) {
      this.taskInputView = this.taskInputView || new TaskInputView({ tasks: this.tasks });
      if(this.delegate) {
        this.taskInputView.delegate = this.delegate;
      }
      this.addSubView(this.taskInputView);
      this.taskInputView.setElement($el);
      this.taskInputView.render();
    },

    renderTask: function(task) {
      var taskListItemView = new TaskListItemView({task:task});
      this.addSubView(taskListItemView);
      this.listenTo(taskListItemView, 'priorityChanged', this.updateSort, this);

      return taskListItemView.render().el;
    },

    updateSort: function(item) {
      var newSortOrder = [];
      this.$('.list > li').each(function() {
        var id = $(this).data('id');
        newSortOrder.push(id);
      });

      this.tasks.updatePriorityForTask(item, newSortOrder);
    }
  });
});