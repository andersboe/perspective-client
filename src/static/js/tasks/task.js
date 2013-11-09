define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var Model = require('perspective-core').Model;
  var tasks = request('tasks/tasks');
  var _ = require('underscore');

  var Task = Model.extend({
  	setAttributes: function(attributes) {
      _.extend(this.attr,attributes);
  	},
  	save: function(task) {
  		request.post(getTasksUrl(this.id), task, function(error, res) {
  			console.log
		  });
  	},

  });

  function getTasksUrl(id) {
	  var url = config.getConfig().tasksUrl + "/tasks";

	  if(id) {
	    url += '/' + id;
	  }

	  return url;
	}

  return Task;

});