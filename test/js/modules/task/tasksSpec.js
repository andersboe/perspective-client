define(function(require) {

  var Tasks = require('modules/task/tasks');
  var Task = require('modules/task/task');


  var chai = require('chai');
  var sinonChai = require('sinon-chai');
  var sinon = require('sinon');

  chai.use(sinonChai);

  var expect = require('chai').expect;


  describe('tasks', function() {

    describe('updatePriorityForTask', function() {

      it('sends ids for the task in front and back of the priorotized task', function() {
        var task1 = new Task({id: 1});
        var task2 = new Task({id: 2});

        var spy = sinon.spy(task2, "save");

        var task3 = new Task({id: 3});
        var tasks = new Tasks([task1, task2, task3]);

        tasks.updatePriorityForTask(task2, [2, 1, 3], 2);

        expect(spy.calledOnce).to.be.ok;
        expect(spy.calledWith(sinon.match.has('previousId', 1).and(sinon.match.has('nextId', null)))).to.be.ok;
      });

    });

  });

});