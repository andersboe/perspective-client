require.config({
  baseUrl: 'js',
  paths: {
    underscore: '../libraries/underscore/underscore',
    Ractive: '../libraries/ractive/Ractive',
    'ractive-object-observe': 'ractive-object-observe/ractive-object-observe',
    text: '../libraries/text/text',
    rv: '../libraries/rv/rv',
    jquery: '../libraries/jquery/jquery',
    page: '../libraries/page/index',
    superagent: '../libraries/superagent/superagent',


    'web-socket-helper': '../libraries/perspective-core-web-socket-helper-rjs/index',
    'perspective-core': '../libraries/perspective-core-rjs/index',
    'lib/validation': '../libraries/perspective-core-rjs/lib/validation',
    'lib/model': '../libraries/perspective-core-rjs/lib/model'
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
    'web-socket-helper': {
      deps: ['underscore', 'perspective-core'],
      exports: 'web-socket-helper'
    }
  }
});

require(['jquery', 'Ractive', 'ractive-object-observe', 'app/app'], function($, Ractive, objectObserve, App) {
  Ractive.adaptors.ObjectObserve = objectObserve;

  var app = new App({
    el: $('body')
  });

  $(document).ready(function() {
    var config = window.bootstrap_config;
    $('#bootstrap-config').empty();

    app.start({config: config, sections: {
      "main": "#main",
      "overlay": "#overlay",
      "app": "#app"
    }});

  });

});