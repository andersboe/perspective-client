define(function(require) {

  var Section = require('section/section');
  var _ = require('underscore');

  var Sections = function(newSections) {
    this.addSections(newSections);
  };

  Sections.prototype.addSections = function(newSections) {
    _.each(newSections, function(selector, name) {
      this.addSection(selector, name);
    }, this);
  };

  Sections.prototype.addSection = function(selector, name) {
    this[name] = new Section(selector);
  };

  return Sections;

});