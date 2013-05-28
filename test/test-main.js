var tests = Object.keys(window.__karma__.files).filter(function(file) {
  return /Spec\.js$/.test(file);
});

var preIncluded = ['chai', 'sinon', 'sinon-chai', 'jasmine-sinon'];
var deps = preIncluded.concat(tests);

requirejs.config({
  urlArgs: 'v=' + Math.random(),

  baseUrl: '/base/src/js',
  paths: {
    config: 'config',
    jquery: '../libraries/jquery/jquery',
    underscore: '../libraries/underscore/underscore',
    backbone: '../libraries/backbone/backbone',
    backboneStickit: '../libraries/backbone.stickit/backbone.stickit',

    text: '../libraries/text/text',
    handlebars: '../libraries/hb/customHandlebars',
    hb: '../libraries/hb/hb',

    jQuerySortable: '../libraries/html5sortable/index',


    'chai': '../libraries/chai/chai',
    'sinon': '../libraries/sinon/index',
    'jasmine-sinon': '../libraries/jasmine-sinon/lib/jasmine-sinon',
    'sinon-chai': "../libraries/sinon-chai/lib/sinon-chai"
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
    },

    jQuerySortable: {
      deps: ['jquery']
    },

    'sinon': {
      exports: 'sinon'
    },

    'jasmine-sinon': ['sinon']
  },
  hb: {
    templateExtension: '.html'
  },

  deps: deps,
  callback: window.__karma__.start
});

