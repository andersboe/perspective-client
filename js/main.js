require.config({
  baseUrl:'js',
  paths: {
    config: 'config',
    angular: '../components/AngularJS/angular',
    angularResource: '../components/angular-resource/angular-resource',
    jquery: '../components/jquery/jquery'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angularResource': {
      deps: ['angular']
    }
  },
  priority:[
    'angular'
  ]
});

require([
  'angular',
  'jquery',
  'app',
  'directives/ngBlur',
  'routes'
], function(angular, $) {

  $(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

});