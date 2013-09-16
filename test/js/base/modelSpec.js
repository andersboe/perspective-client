define(function(require){
  var Model = require("base/model");

  describe("model", function() {
    describe("mergeAttributes", function() {
      it("should work when property undefined to begin with", function() {
        var model = new Model();

        model.mergeAttributes({
          label: [1]
        },
        {
          label: [2, 3]
        });

        expect(model.attributes).toEqual({
          label: [2, 3]
        });
      });

      it("should merge array values and set other values", function() {
        var model = new Model({
          title: "TitleValue",
          labels: [1, 5, 9],
          other: "OtherValue"
        });

        model.mergeAttributes({
          labels: [1]
        },
        {
          title: "New title",
          labels: [8]
        });

        expect(model.attributes).toEqual({
          title: "New title",
          labels: [5, 9, 8],
          other: "OtherValue"
        });
      });

      it("should remove duplicate array values", function() {
        var model = new Model({
          labels: [2, 3]
        });

        model.mergeAttributes({},
        {
          labels: [3, 4]
        });

        expect(model.attributes).toEqual({
          labels: [2, 3, 4]
        });
      });
    });
  });
});