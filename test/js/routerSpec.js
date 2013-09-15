define(function(require) {

  var Router = require('router');
  var sinon = require('sinon');
  var TaskListView = require('modules/task/list/taskListView');

  describe('router', function() {
    it('show list', function() {
      var spy = sinon.spy();

      var sections = {};
      sections.main = {
        show: function(view) {
          spy(view);
          return { render: function(){} };
        }
      };
      sections.menu = {
        show: function() {}
      };

      var router = new Router(sections);
      router.list();

      var args = spy.firstCall.args;
      expect(args[0] instanceof TaskListView).toBeTruthy();
    });
  });

});
