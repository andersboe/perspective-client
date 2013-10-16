var tests = Object.keys(window.__karma__.files).filter(function(file) {
  return /Spec\.js$/.test(file);
});

var preIncluded = ['chai', 'sinon', 'sinon-chai', 'jasmine-sinon'];
var deps = preIncluded.concat(tests);

requirejs.config({
  baseUrl: '/base/src/js',
  paths: {
    underscore: '../libraries/underscore/underscore',
    Ractive: '../libraries/ractive/Ractive',
    text: '../libraries/text/text',
    rv: '../libraries/rv/rv',
    jquery: '../libraries/jquery/jquery',
    page: '../libraries/page/index',

    testHelper: '/base/test/js/testHelper',
    'chai': '../libraries/chai/chai',
    'sinon': '../libraries/sinon/index',
    'jasmine-sinon': '../libraries/jasmine-sinon/lib/jasmine-sinon',
    'sinon-chai': "../libraries/sinon-chai/lib/sinon-chai"
  },
  shim: {
    underscore: {
      exports: '_'
    },
    page: {
      exports: 'page'
    },
    'sinon': {
      exports: 'sinon'
    },
    'jasmine-sinon': ['sinon']
  },
  deps: deps,
  callback: window.__karma__.start
});

