define(['angular', 'config'], function(angular, config) {

  angular.module('listData', ['ngResource']).

    factory('ListData', function($resource) {
      return $resource(config.server + '/tasks/:id');
    });

});