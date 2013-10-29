define(function(require) {
  var request = require('request');
  var config = require('config');
  var _ = require('underscore');
  var wsJenkins = require('./wsJenkins');

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
    building_not_built: "Yeehaa i'm building my first build..."
  };

  var simpleStatusForStatus = {
    failed: 'sleeping',
    building_failed: 'building',
    unstable: 'sleeping',
    building_unstable: 'building',
    ok: 'sleeping',
    building_ok: 'building',
    disabled: 'sleeping',
    building_disabled: 'building',
    not_built: "sleeping",
    building_not_built: 'building'
  };

  var toJobs = function(jobs) {
    return _.map(jobs, function(job) {
      job.text = textForStatus[job.status];
      job.simpleStatus = simpleStatusForStatus[job.status];
      return job;
    });
  };

  wsJenkins.createChannel("jenkins").on("jobs_changed", function(jobs) {
    data.jobs = toJobs(jobs.data);
  });

  return {
    get:function(callback) {
      var jenkins = this;
      request.get(config.jenkinsUrl + '/jenkins').end(function(error, res){
        data.jobs = toJobs(res.body);
        callback();
      });
    },
    data: data
  }
});