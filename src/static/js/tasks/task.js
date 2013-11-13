define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var Model = require('perspective-core').Model;
  var _ = require('underscore');

  var Task = Model.extend({
    setAttributes: function(attributes) {
      _.extend(this.attr,attributes);
    },
    save: function(task) {
      request.post(getTasksUrl(this.id), task, function(error, res) {
        console.log(error, res);
        // TODO: implement me
      });
    }
  });

  function getTasksUrl(id) {
    var url = config.get().tasks.url + "/tasks";

    if(id) {
      url += '/' + id;
    }

    return url;
  }

  return Task;

});