require.config({
  baseUrl: 'js',
  paths: {
    underscore: '../libraries/underscore/underscore',
    Ractive: '../libraries/ractive/Ractive',
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

require(['jquery', 'app/app'], function($, App) {

  var app = new App({ el: $('body') });
  app.start();

});