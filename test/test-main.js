var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /Spec\.js$/.test(file);
});

var preIncluded = ['sinon', 'jasmine-sinon'];

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

    'sinon': '../libraries/sinon/lib/sinon',
    'jasmine-sinon': '../libraries/jasmine-sinon/lib/jasmine-sinon'

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