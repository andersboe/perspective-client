define(function(require) {
  var _ = require("underscore");
  var testHelper = require("testHelper");
  var BoardView = require("modules/board/boardView");
  var Tasks = require("modules/task/tasks");

  describe("board view", function() {
    var tasks, columns;

    beforeEach(function() {
      tasks = new Tasks([
        {title: "Task 1", labels: [1]},
        {title: "Task 2", labels: [2]},
        {title: "Task 3", labels: [2]},
        {title: "Task 4", labels: [3]},
        {title: "Task 5 - in two columns", labels: [2, 3]}
      ]);

      columns = [
        {
          title: "Todo"
        },
        {
          title: "In progress"
        },
        {
          title: "Done"
        }
      ];
    });

    it("should create columns", function() {
      var view = new BoardView({tasks: tasks, columns: columns});

      view.render();

      expect(view.$(".column").length).toBe(3);
      expect(view.$(".column:nth-child(1) h2").text()).toEqual("Todo");
      expect(view.$(".column:nth-child(2) h2").text()).toEqual("In progress");
      expect(view.$(".column:nth-child(3) h2").text()).toEqual("Done");
    });

    it("should render all tasks into all columns when no filter is applied", function() {
      var view = new BoardView({tasks: tasks, columns: columns});

      view.render();

      expect(view.$(".column:nth-child(1) .items li").length).toBe(5);
      expect(view.$(".column:nth-child(2) .items li").length).toBe(5);
      expect(view.$(".column:nth-child(3) .items li").length).toBe(5);
    });

    it("should only render tasks matching column filters into respective column", function() {
      columns[0].filter = function(task) {
        return _.contains(task.get('labels'), 1);
      };
      columns[1].filter = function(task) {
        return _.contains(task.get('labels'), 2);
      };
      columns[2].filter = function(task) {
        return _.contains(task.get('labels'), 3);
      };
      var view = new BoardView({tasks: tasks, columns: columns});

      view.render();

      expect(view.$(".column:nth-child(1) .items li").length).toBe(1);
      expect(view.$(".column:nth-child(2) .items li").length).toBe(3);
      expect(view.$(".column:nth-child(3) .items li").length).toBe(2);
    });

    it("should assign newTaskProperties of column when creating a new task", function() {
      columns[0].filter = function(task) {
        return _.contains(task.get('labels'), 1);
      };
      columns[0].newTaskProperties = {
        labels: [1]
      };
      var view = new BoardView({tasks: tasks, columns: columns});
      view.render();
      expect(view.$(".column:nth-child(1) .items li").length).toBe(1);
      expect(tasks.length).toBe(5);

      view.$(".column:nth-child(1) .new-task-input").val("New task in first column");
      testHelper.fakeResponse(function() {
        view.$(".column:nth-child(1) .new-task-input").submit();
      });

      expect(view.$(".column:nth-child(1) .items li").length).toBe(2);
      expect(tasks.length).toBe(6);
      expect(tasks.last().get("title")).toEqual("New task in first column");
      expect(tasks.last().get("labels")).toEqual([1]);
    });
  });
});