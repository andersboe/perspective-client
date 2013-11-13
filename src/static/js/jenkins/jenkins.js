define(function(require) {
  var request = require('superagent');
  var config = require('config');
  var _ = require('underscore');
  var WebSocketClient = require('web-socket/web-socket-client');
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

    jobs = treeParser.parse(mappedJobs, {
      separator: "_",
      performSeparationOnKey: "name",
      assignChildrenToKey: "jobs",
      assignSeparatedNameToKey: "subname"
    });

    // Jobs parsed to tree might not have a actual state
    // if their parent node isn't a jenkins job. Example jobs:
    //
    //    myapp_feature
    //
    // Gives the following tree
    //    myapp
    //        feature
    //
    // However, in jenkins this is still one job and thus we
    // need to fake a state for "myapp"
    return jobs.map(function(job) {
      if(!job.state) {
        job.state = 'ok';
      }
      return job;
    });
  };

  var Jenkins = Model.extend({
    defaults: {
      jobs: []
    },
    getAll:function() {
      var jenkins = this;
      request.get(config.get().jenkins.url + '/jenkins').end(function(error, res){
        if(error) {
          console.error(error);
        } else {
          jenkins.attr.jobs = toJobs(res.body);
        }
      });
    },
    listen: function() {
      var jenkins = this;
      if(!this.wsClient) {
        this.wsClient = new WebSocketClient(config.get().jenkins.wsUrl);
        this.wsClient.connect();
      }

      this.wsClient.channel("jenkins").on("jobs_changed", function(jobs) {
        jenkins.attr.jobs = toJobs(jobs.data);
      });
    }
  });

  return new Jenkins();

});