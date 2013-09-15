define(function(require){
  var TaskListView = require("modules/task/list/taskListView");
  var Tasks = require("modules/task/tasks");

  describe("task list view", function() {
    var tasks;

    beforeEach(function() {
      tasks = new Tasks([
        {title: "task 1"},
        {title: "task 3"},
        {title: "task 2"}
      ]);
    });

    it("should render tasks", function() {
      var view = new TaskListView({tasks: tasks});

      view.render();

      expect(view.$(".list li").length).toBe(3);
    });

    it("should only render filtered tasks, if a filter is supplied", function() {
      var filterFn = function(task) {
        return task.get('title') === "task 1";
      };
      var view = new TaskListView({tasks: tasks, filter: filterFn});

      view.render();

      expect(view.$(".list li").length).toBe(1);
      expect(view.$(".list li:first-child").text()).toEqual("task 1");
    });
  });
});