define(function(require) {

  var View = require('base/view');
  var taskListTemplate = require('hb!./taskList');
  var TaskListItemView = require('./taskListItemView');

  require('jQuerySortable');

  return View.extend({

    template: taskListTemplate,

    events: {
      'keypress #new': 'createOnEnter'
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

      this.$input = this.$('#new');

      return this;
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