define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var _ = require('underscore');
  var wsJenkins = require('./ws-jenkins');
  var treeParser = require('tree-parser/tree-parser');
  var Model = require('perspective-core').Model;

  var stateForStatus = {
    failed: 'failed',
    building_failed: 'failed',
    unstable: 'unstable',
    building_unstable: 'unstable',
    ok: 'ok',
    building_ok: 'ok',
    disabled: 'disabled',
    building_disabled: 'disabled',
    not_built: "not_built",
    building_not_built: "not_built"
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
    var mappedJobs = _.map(jobs, function(job) {
      job.state = stateForStatus[job.status] || 'disabled';
      job.simpleStatus = simpleStatusForStatus[job.status];
      return job;
    });

    return treeParser.parse(mappedJobs, {
      separator: "_",
      performSeparationOnKey: "name",
      assignChildrenToKey: "jobs",
      assignSeparatedNameToKey: "subname"
    });
  };

  var Jenkins = Model.extend({
    defaults: {
      jobs: []
    },
    getAll:function() {
      var jenkins = this;
      request.get(config.getConfig().jenkinsUrl + '/jenkins').end(function(error, res){
        jenkins.attr.jobs = toJobs(res.body);
      });
    },
    listen: function() {
      var jenkins = this;
      wsJenkins.client().channel("jenkins").on("jobs_changed", function(jobs) {
        jenkins.attr.jobs = toJobs(jobs.data);
      });
    }
  });

  return new Jenkins();

});