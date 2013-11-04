define(function(require) {

  var template = require('rv!./notFound.html');
  var Ractive = require('Ractive');

  return Ractive.extend({
    template: template
  });

});