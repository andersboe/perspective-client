define(function(require) {

  var treeParser = require('tree-parser/tree-parser');
  var expect = require('chai').expect;

  describe('tree-parser', function() {

    describe('arrays', function (){
      var items = [
        "project1",
        "project2",
        "project1_feature1",
        "project1_feature1_work",
        "project1_feature2",
        "project2_feature1"
      ];

      it('should parse top level', function() {
        var tree = treeParser.parse(items, {
          separator: "_",
          assignChildrenToKey: "children",
          assignSeparatedNameToKey: "name"
        });
        expect(tree.length).to.eql(2);
        expect(tree[0].name).to.eql("project1");
        expect(tree[1].name).to.eql("project2");
      });

      it('should parse sub levels', function() {
        var tree = treeParser.parse(items, {
          separator: "_",
          assignChildrenToKey: "children",
          assignSeparatedNameToKey: "name"
        });

        expect(tree).to.eql([
          {
            name: "project1",
            children: [
              {
                name: "feature1",
                children: [
                  {name: "work"}
                ]
              },
              {
                name: "feature2"
              }
            ]
          },
          {
            name: "project2",
            children: [
              {name: "feature1"}
            ]
          }
        ]);
      });
    });

    describe('array with objects', function() {
      var items = [
        {name: "project1", status: "inactive"},
        {name: "project2", status: "failed"},
        {name: "project1_feature1", status: "inactive"},
        {name: "project1_feature1_work", status: "inactive"},
        {name: "project1_feature2", status: "ok"},
        {name: "project2_feature1", status: "ok"}
      ];

      it('should use supplied separationKey for parsing hiarchy', function() {
        var tree = treeParser.parse(items, {
          separator: "_",
          performSeparationOnKey: "name",
          assignChildrenToKey: "children",
          assignSeparatedNameToKey: "partName"
        });

        expect(tree).to.eql([
          {
            name: "project1",
            partName: "project1",
            status: "inactive",
            children: [
              {
                name: "project1_feature1",
                partName: "feature1",
                status: "inactive",
                children: [
                  {
                    name: "project1_feature1_work",
                    partName: "work",
                    status: "inactive"
                  }
                ]
              },
              {
                name: "project1_feature2",
                partName: "feature2",
                status: "ok"
              }
            ]
          },
          {
            name: "project2",
            partName: "project2",
            status: "failed",
            children: [
              {
                name: "project2_feature1",
                partName: "feature1",
                status: "ok"
              }
            ]
          }
        ]);
      });
    });
  });

});
