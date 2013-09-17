define(function(require) {

  var Backbone = require('backbone');
  var _ = require('underscore');
  var SubViewHandler = require('components/subViewHandler');

  return Backbone.View.extend({

    constructor: function() {
      var subViewHandler = new SubViewHandler();
      _.extend(this, subViewHandler);

      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    destroy: function() {
      // Unbind all events that are bound to the view, i.e.
      // those bound with `this.on`
      this.off();

      // Remove the view from the DOM
      this.remove();

      // Recursively destroy all subviews
      this.destroySubViews();
    },

    renderTemplate: function() {
      var data = {};
      _.each(arguments, function(arg) {
        _.extend(data, arg);
      });

      var html = this.parseTemplate(this.template, data);
      this.$el.html(html);
    },

    parseTemplate: function(template, data) {
      return template(data);
    }

  });

});