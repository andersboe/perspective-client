var tests = Object.keys(window.__karma__.files).filter(function(file) {
  return /-spec\.js$/.test(file);
});

var preIncluded = ['chai', 'sinon', 'sinon-chai'];
var deps = preIncluded.concat(tests);

requirejs.config({
  baseUrl: '/base/src/static/js',
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
    'lib/model': '../libraries/perspective-core-rjs/lib/model',


    'test-helper': '/base/src/test/test-helper',
    'chai': '../libraries/chai/chai',
    'sinon': '../libraries/sinon/index',
    'sinon-chai': '../libraries/sinon-chai/lib/sinon-chai',
    'squire': '../libraries/squire/src/Squire'
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
      exports: 'web-socket-helper'
    },



    'sinon': {
      exports: 'sinon'
    }
  },
  deps: deps
});


require(tests, function () {
  window.__karma__.start()
});