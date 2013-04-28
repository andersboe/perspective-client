define(['app', 'config'], function(app, config) {

    return app.factory('listData', function($resource) {

      return $resource(config.server + '/tasks/:id');

    });

});