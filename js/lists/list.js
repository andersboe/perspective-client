define(['angular', './listData'], function(angular) {
  angular.module('list', ['listData']);

  return function($scope, ListData) {
    var items = $scope.items = ListData.query();

    $scope.addItem = function() {
      var title = prompt("Name of task");
      if (title) {
        var item = {title: title};
        ListData.save(item, function(savedItem) {
          items.push(savedItem);
        });
      }
    };

    $scope.removeItem = function(item) {
      items.splice(items.indexOf(item), 1);
    };
  }

});