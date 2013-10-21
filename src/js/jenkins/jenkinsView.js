define(function(require) {

  var template = require('rv!./jenkins.html');
  var Ractive = require('Ractive');

  return Ractive.extend({
    template: template
  });

});