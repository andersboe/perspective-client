define(function(require) {
  var WebSocketClient = require('web-socket/webSocketClient');
  var request = require('request');
  var config = require('config');
  var _ = require('underscore');

  var data = {
    jobs: []
  };


  var textForStatus = {
    failed: 'Failed',
    building_failed: 'Building...',
    unstable: 'Unstable',
    building_unstable: 'Building...',
    ok: 'Everything is OK',
    building_ok: 'Building...',
    disabled: 'Disabled',
    building_disabled: 'Building...',
    not_built: "I'm not built yet",
    budiling_not_built: 'Yeehaa this is my first build'
  };

  var toJobs = function(jobs) {
    return _.map(jobs, function(job) {
      job.text = textForStatus[job.status];
      return job;
    });
  };

  return {
    get:function(callback) {
      var jenkins = this;
      request.get(config.serverUrl + '/jenkins').end(function(error, res){
        data.jobs = toJobs(res.body);
        callback(data);
      });
    },
    ws: function(callback) {
      new WebSocketClient('jenkins').on('jobs_changed', function(jobs) {
        data.jobs = toJobs(jobs.data);
        callback(data);
      });
    },
    data: data
  }
});