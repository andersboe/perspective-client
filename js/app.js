requirejs.config({
  paths: {
    config: 'config',
    angular: 'external/angular',
    angularResource: 'external/angular-resource',
    jquery: 'external/jquery-2.0.0'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angularResource': {
      deps: ['angular']
    },
    'jquery': {
      exports: 'jQuery'
    }
  }
});

require(['angular', 'angularResource', 'jquery', 'lists/list'], function(angular, angularResource, $, ListCtrl) {

  angular.module('app', ['listData']).config(function($routeProvider) {

    $routeProvider.
      when('/backlog', { controller: ListCtrl, templateUrl: 'js/lists/list.html' }).
      otherwise({ redirectTo: '/backlog' });

  });

  $(document).ready(function() {

    var $html = $('html');
    angular.bootstrap($html, ['app']);
    $html.addClass('ng-app');

  });

});