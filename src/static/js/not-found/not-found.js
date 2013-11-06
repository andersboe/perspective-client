define(function(require) {

  var template = require('rv!./not-found.html');
  var Ractive = require('Ractive');

  return Ractive.extend({
    template: template
  });

});