define(function(require) {

  var View = require('base/view');
  var overlayTemplate = require('hb!./overlay');

  return View.extend({

    className: 'overlay',

    template:overlayTemplate,

    initialize: function(options) {
      this.hideFunction = options.hideFunction;
    },

    events: {
      'click': 'hide'
    },

    render: function() {
      this.renderTemplate();
    },

    show: function(view) {
      this.addSubView(view);
      this.$el.show();
      view.setElement(this.$('.window-view-placeholder'));
      view.render();
      var that = this;
      _.defer(function() {
        that.$(".window").addClass('active');
      });
    },

    hide: function() {
      this.destroySubViews();
      this.$(".window").removeClass('active');

      var that = this;
      this.$(".window")[0].addEventListener('transitionend', function() {
        that.$el.hide();
      }, false);

      this.hideFunction();
    }

  });

});