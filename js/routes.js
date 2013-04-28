define(['app', 'modules/lists/list'], function(app, ListCtrl) {

  app.config(function($routeProvider) {

    $routeProvider.
      when('/backlog', { controller: ListCtrl, templateUrl: 'js/modules/lists/list.html' }).
      otherwise({ redirectTo: '/backlog' });

  });

  return app;

});