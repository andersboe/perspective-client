define(function(require){
  var BaseView = require("./view");
  require('jQuerySortable');

  function disableSort(context) {
    if(context.sortableEl) {
      context.sortableEl.sortable('disable');
      context.sortableEl = null;
    }
  }

  return BaseView.extend({

    destroy: function() {
      disableSort(this);
      BaseView.prototype.destroy.apply(this, arguments);
    },

    refreshSorting: function() {
      if(!this.sortOptions) {
        throw new Error("Attempt to sort without sortOptions set");
      }

      disableSort(this);

      var options = this.sortOptions.connectingSelector ? {connectWith: this.sortOptions.connectingSelector} : {};
      this.sortableEl = this.$(this.sortOptions.listSelector);
      this.sortableEl.sortable(options);
    }
  });
});