define(function() {

  return {
    task: {
      remove: function(e) {
        this.data.tasks.remove(e.index.i);
      },
      add: function(e) {
        this.data.tasks.add({title: e.node.value});
        e.node.value = "";
      }
    },
    data: {
      filterTasks: function(tasks, filter) {
        return filter ? tasks.filter(filter) : tasks;
      }
    }
  };
});