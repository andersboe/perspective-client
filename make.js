#!/usr/bin/env node

require('shelljs/make');
require('colors');

var _ = require('underscore'),
  fs = require('fs'),
  glob = require('glob'),
  path = require('path'),
  zlib = require('zlib'),
  handlebars = require('handlebars'),
  moment = require('moment');

/*** CONFIG ********/

var version = process.env.VERSION || moment().format('YYYYMMDD'),
  targetDir = process.env.OUTPUT_DIR || path.join('target', 'frontend-build'),
  appDir = path.join('src'),

  indexFile = path.join(appDir, 'index.hb'),
  mainLessFile = path.join(appDir, 'css', 'main.less'),

  jsFileName = 'app-' + version + '.js',
  jsFile = path.join(targetDir, jsFileName),
  cssFileName = 'style-' + version + '.css',
  cssFile = path.join(targetDir, cssFileName),

  rjsConfig = path.join('build-config.js'),
  jshintConfig = path.join('jshint.json');


/*** TARGETS ********/

target.all = function() {
  target.check();
  target.jshint();
  target.test();
  target.build();
};

target.jshint = function() {
  var files = glob.sync(path.join(appDir, 'js', '**', '*.js'));

  section('Running JSHint');
  npmBin('jshint', '--config ' + jshintConfig, files.join(' '));
};

target.test = function() {
  section('Running JavaScript tests');
  npmBin('karma', 'start', 'karma.conf.js', '--browsers PhantomJS', '--single-run');
};

target.build = function() {
  createCleanDir(targetDir);

  buildIndexHtml();
  buildJavaScript();
  buildCss();

  gzip(jsFile);
  gzip(cssFile);

  optimizeImages();

  echo();echo();
  success("Build succeeded!");
};

target.check = function() {
  failIfOnlySubsetOfTestsAreRunning();
};


/*** APP FUNCTIONS ********/

var buildIndexHtml = function() {
  var htmlFile = path.join(targetDir, 'index.html');

  section('Building HTML → ' + htmlFile);
  renderAndWriteTemplate(indexFile, htmlFile, {
    cssFile: cssFileName,
    jsFile: jsFileName
  });
};

var buildJavaScript = function() {
  section('Building JavaScript → ' + jsFile);
  npmBin('r.js', '-o ' + rjsConfig, 'out=' + jsFile);
};

var buildCss = function() {
  section('Building Less → ' + cssFile);
  npmBin('lessc', mainLessFile, cssFile);
};

var gzip = function(file) {
  var gzip = zlib.createGzip();
  var input = fs.createReadStream(file);
  var output = fs.createWriteStream(file + '.gz');

  section('Gzipping ' + file);
  input.pipe(gzip).pipe(output);
  success();
};

var addVersions = function() {
  // add versions to css and html files
};

var optimizeImages = function() {
  var pngs = glob.sync(path.join(appDir, 'images', '*.png'));

  section('Optimizing pngs');

  var to = path.join(targetDir, 'images');

  npmBin('optipng-bin', '-strip all', '-dir ' + to, pngs.join(' '))
};

var renderAndWriteTemplate = function(from, to, data) {
  var content = fs.readFileSync(from).toString();
  var template = handlebars.compile(content);
  var html = template(data);

  fs.writeFileSync(to, html);

  success();
};

var failIfOnlySubsetOfTestsAreRunning = function() {
  var specs = glob.sync(path.join('test', '**', '*Spec.js'));

  section('Checking for "ddescribe" and "iit" in tests');

  var ddescribe = grep("ddescribe", specs);
  var iit = grep("iit", specs);

  if (ddescribe === '' && iit === '') {
    success();
  } else {
    fail();
  }
};


/*** HELPER FUNCTIONS ********/

var npmBin = function(name) {
  var bin = path.join('node_modules', '.bin', name);

  if (!test('-e', bin)) {
    echo('Binary does not exist: ' + bin);
    exit(1);
  }

  var res = exec(bin + ' ' + _.rest(arguments).join(' '));
  done(res);
};

var createCleanDir = function(dir) {
  if (test('-d', dir)) {
    rm('-rf', dir);
  }

  mkdir('-p', dir);

  return dir;
};

var section = function(header) {
  echo();
  echo('    ' + header.bold);
};

var done = function(res) {
  if (res.code === 0) {
    success();
  } else {
    fail();
  }
};

var success = function(text) {
  text = text || 'done';
  echo('    ' + '✓'.green + ' ' + text.green);
};

var fail = function(text) {
  text = text || 'failed';
  echo('    ' + '✘'.red + ' ' + text.red);
  exit(1);
};