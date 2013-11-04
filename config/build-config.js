({
  // for an explanation of these fields, you should go through
  // https://github.com/jrburke/r.js/blob/master/build/example.build.js

  baseUrl: '../src/static/js',
  inlineText: true,
  useStrict: false,
  name: '../libraries/almond/almond',
  include: ['main'],
  insertRequire: ['main'],
  wrap: false,
  mainConfigFile: '../src/static/js/main.js',
  preserveLicenseComments: true,
  logLevel: 0,
  stubModules: ['text', 'rv'],
  optimize: 'none'
})