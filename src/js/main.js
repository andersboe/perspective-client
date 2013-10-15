require.config({
  baseUrl: 'js',
  paths: {
    underscore: '../libraries/underscore/underscore',
    Ractive: '../libraries/ractive/Ractive',
    text: '../libraries/text/text',
    rv: '../libraries/rv/rv',
    jquery: '../libraries/jquery/jquery',
    page: '../libraries/page/index'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    page: {
      exports: 'page'
    }
  }
});

require(['jquery', 'app/app'], function($, App) {

  var app = new App({ el: $('body') });
  app.start();

});