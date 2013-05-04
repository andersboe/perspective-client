define(function(require) {

  var _ = require('underscore'),
    Router = require('router'),
    View = require('base/view'),
    Section = require('components/section'),
    appTemplate = require('hb!./app');

  var App = View.extend({

    template: appTemplate,

    addSections: function(sections) {
      this.sections = this.sections || {};

      _.each(sections, function(selector, name) {
        this.sections[name] = new Section(this.$el, selector);
      }, this);
    },

    run: function(done) {

      this.addSections({
        "main": "#main"
      });

      this.renderTemplate();

      this.router = new Router(this.sections);

      done();
    }
  });

  return App;

});