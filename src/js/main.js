require.config({
  baseUrl: 'js',
  paths: {
    underscore: '../libraries/underscore/underscore',
    Ractive: '../libraries/ractive/Ractive',
    ractiveObjectObserve: 'ractive-object-observe/ractive-object-observe',
    text: '../libraries/text/text',
    rv: '../libraries/rv/rv',
    jquery: '../libraries/jquery/jquery',
    page: '../libraries/page/index',
    webSocketHelper: '../libraries/perspective-core-web-socket-helper/index',
    'perspective-core': '../libraries/perspective-core/index',
    'lib/validation': '../libraries/perspective-core/lib/validation',
    'lib/model': '../libraries/perspective-core/lib/model',
    request: '../libraries/superagent/superagent'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    page: {
      exports: 'page'
    },
    'perspective-core': {
      deps: ['underscore', 'lib/validation', 'lib/model'],
      exports: 'perspective-core'
    },
    webSocketHelper: {
      deps: ['underscore', 'perspective-core'],
      exports: 'webSocketHelper'
    }
  }
});

require(['jquery', 'app/app', 'Ractive', 'ractiveObjectObserve'], function($, App, Ractive, objectObserve) {
  Ractive.adaptors.ObjectObserve = objectObserve;
  var app = new App({ el: $('body') });
  app.start();

});