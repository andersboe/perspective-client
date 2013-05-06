({
  // for an explanation of these fields, you should go through
  // https://github.com/jrburke/r.js/blob/master/build/example.build.js

  baseUrl: 'src/js',
  inlineText: true,
  useStrict: false,
  name: '../libraries/almond/almond',
  include: ['main'],
  insertRequire: ['main'],
  wrap: false,
  mainConfigFile: 'src/js/main.js',
  preserveLicenseComments: true,
  logLevel: 0,
  stubModules: ['text', 'hb'],
  optimize: 'uglify2',
  pragmasOnSave: {
    excludeHandlebars: true
  }
})