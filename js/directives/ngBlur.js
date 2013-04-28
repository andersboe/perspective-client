
define(['app'], function(app) {

  app.directive('ngBlur', ['$parse', function($parse) {
    return function(scope, element, attr) {
      var fn = $parse(attr['ngBlur']);
      element.on('blur', function(event) {
        scope.$apply(function() {
          fn(scope, {$event:event});
        });
      });
    }
  }]);

});