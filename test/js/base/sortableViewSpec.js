define(function(require){
  var SortableView = require("base/sortableView");

  describe("sortable view", function() {
    it("should give error if attempting to sort without sortoptions set", function() {
      var view = new SortableView();

      expect(function() {
        view.refreshSorting();
      }).toThrow();
    });

    it("should support sorting a single list", function() {
      var view = new SortableView();
      view.sortOptions = {
        listSelector: ".list"
      };

      view.refreshSorting();
      expect(view.sortableEl.selector).toBe(".list");
    });

    it("should cleanup sortable when destroying view", function() {
      var view = new SortableView();
      view.sortOptions = {
        listSelector: ".list"
      };

      view.refreshSorting();
      view.destroy();

      expect(view.sortableEl).toBeNull();
    });
  });
});