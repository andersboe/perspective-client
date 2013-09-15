define(function(require) {
  var _ = require('underscore');
  var View = require('base/view');
  var TaskListView = require('modules/task/list/taskListView');
  var boardTemplate = require('hb!./board');

  return View.extend({
    template: boardTemplate,

    initialize: function(options) {
      options = options || {};
      var boardView = this;
      this.columns = options.columns;

      for(var i = 0; i < this.columns.length; i++) {
        var column = this.columns[i];
        column.id = i;
        var columnView = new TaskListView({tasks: options.tasks, filter: column.filter});
        columnView.delegate = {
          willCreateTask: _.bind(boardView.willCreateTask, boardView, column)
        };
        boardView.addSubView(columnView);
        column.view = columnView;
      }
    },

    willCreateTask: function(column, task) {
      _.defaults(task, column.newTaskProperties);
    },

    render: function() {
      this.renderTemplate({columns: this.columns});
      var boardView = this;
      _.each(this.columns, function(column) {
        boardView.$(".column" + column.id + " .items").html(column.view.render().el);
      });

      return this;
    }

  });

});