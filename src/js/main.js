require.config({
  baseUrl: 'js',
  paths: {
    config: 'config',
    jquery: '../libraries/jquery/jquery',
    underscore: '../libraries/underscore/underscore',
    backbone: '../libraries/backbone/backbone',
    backboneStickit: '../libraries/backbone.stickit/backbone.stickit',

    text: '../libraries/text/text',
    handlebars: '../libraries/hb/customHandlebars',
    hb: '../libraries/hb/hb'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    backboneStickit: {
      deps: ['backbone']
    }
  },
  hb: {
    templateExtension: '.html'
  }
});

require(['modules/app/app', 'jquery', 'backbone', 'backboneStickit'],
function(App, $, Backbone) {

  var app = new App({ el: $("body") });

  $(document).ready(function() {
    app.run(function() {
      Backbone.history.start();
    });
  });

});