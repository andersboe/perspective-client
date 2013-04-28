define(['angular', 'app', './listData'], function(angular, app) {

  function List($scope, listData) {

    var addItem = function() {
      var title = prompt("Name of task");
      if (title) {
        var item = {title: title};
        listData.save(item, function(savedItem) {
          items.push(savedItem);
        });
      }
    };

    var removeItem = function(item) {
      item.$delete({id: item.id}, function() {
        items.splice(items.indexOf(item), 1);
      });
    };


    var items = $scope.items = listData.query();
    $scope.addItem = addItem;
    $scope.removeItem = removeItem;


    return this;
  }

  app.controller('List', ['$scope', 'listData', List]);

  return List;

});