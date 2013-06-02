define(function(require) {

  var _ = require('underscore');
  var Router = require('router');
  var View = require('base/view');
  var Section = require('components/section');
  var appTemplate = require('hb!./app');

  return View.extend({

    template: appTemplate,

    addSections: function(sections) {
      this.sections = this.sections || {};

      _.each(sections, function(selector, name) {
        this.sections[name] = new Section(this.$el, selector);
      }, this);
    },

    run: function(done) {

      this.addSections({
        "main": "#main",
        "overlay": "#overlay"
      });

      this.renderTemplate();

      this.router = new Router(this.sections);

      done();
    }
  });

});