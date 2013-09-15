define(function(require) {

  var sinon = require("sinon");
  var Tasks = require('modules/task/tasks');
  var TaskInputViewSpec = require('modules/task/list/taskInputView');

  describe("taskInputView", function() {
    describe("create task", function() {
      var view, createStub;

      beforeEach(function() {
        var tasks = new Tasks();
        createStub = sinon.stub(tasks, 'create');
        view = new TaskInputViewSpec({tasks: tasks});
        view.render();
      });

      it("should not create task if input field is empty", function() {
        view.$(".new-task-input").val("");
        view.$("form").submit();

        sinon.assert.notCalled(createStub);
      });

      it("should create task if input field is filled out", function() {
        view.$(".new-task-input").val("tasktitle");
        view.$("form").submit();

        sinon.assert.calledWith(createStub, {title: "tasktitle"});
      });

      it("should clear input field after creating task", function() {
        view.$(".new-task-input").val("tasktitle");
        view.$("form").submit();

        expect(view.$(".new-task-input").val()).toEqual("");
      });

      it("should invoke willCreateTask and allow delegate to decorate task before creation", function(){
        view.delegate = {
          willCreateTask: function(task) {
            task.newProperty = "newValue";
          }
        };

        view.$(".new-task-input").val("tasktitle");
        view.$("form").submit();

        sinon.assert.calledWith(createStub, {
          title: "tasktitle",
          newProperty: "newValue"
        });
      });
    });
  });

});