define(function(require){
  var TaskListView = require("modules/task/list/taskListView");
  var Tasks = require("modules/task/tasks");
  var sinon = require("sinon");

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

    it("should enable sorting of tasks when rendered or updated", function() {
      var view = new TaskListView({tasks: tasks});
      var sortSpy = sinon.spy(view, "refreshSorting");

      view.render();

      expect(sortSpy).toHaveBeenCalledOnce();

      tasks.add({title: "task 4"});

      expect(sortSpy).toHaveBeenCalledTwice();

      tasks.reset([{title: "task 4"}]);

      expect(sortSpy).toHaveBeenCalledThrice();

      sortSpy.restore();
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