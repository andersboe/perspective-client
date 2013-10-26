define(function(require) {

  var _ = require('underscore');

  var Section = function(selector) {
    this.selector = selector;
  };

  _.extend(Section.prototype, {
    show: function(View, options) {
      this.close();

      options = _.extend({el: this.selector}, options);
      options.adaptors = ['ObjectObserve'];
      options.modifyArrays = false;

      this.currentView = new View(options);
      return this.currentView;
    },

    close: function() {
      if (this.currentView) {
        this.currentView.teardown();
        delete this.currentView;
      }
    }
  });

  return Section;

});