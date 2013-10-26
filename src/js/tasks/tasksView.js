define(function(require) {

  var template = require('rv!./tasks.html');
  var Ractive = require('Ractive');

  return Ractive.extend({
    template: template
  });

});