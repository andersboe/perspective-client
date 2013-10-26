require.config({
  baseUrl: 'js',
  paths: {
    underscore: '../libraries/underscore/underscore',
    Ractive: '../libraries/ractive/Ractive',
    ractiveObjectObserve: '../libraries/ractive-object-observe/ractive-object-observe',
    text: '../libraries/text/text',
    rv: '../libraries/rv/rv',
    jquery: '../libraries/jquery/jquery',
    page: '../libraries/page/index',
    webSocketHelper: '../libraries/perspective-core/lib/webSocketHelper',
    validation: '../libraries/perspective-core/lib/validation',
    request: '../libraries/superagent/superagent'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    page: {
      exports: 'page'
    },
    validation: {
      deps: ['underscore'],
      exports: 'validation'
    },
    webSocketHelper: {
      deps: ['underscore', 'validation'],
      exports: 'webSocketHelper'
    }
  }
});

require(['jquery', 'app/app', 'Ractive', 'ractiveObjectObserve'], function($, App, Ractive, objectObserve) {
  Ractive.adaptors.ObjectObserve = objectObserve;
  var app = new App({ el: $('body') });
  app.start();

});