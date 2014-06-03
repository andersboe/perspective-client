#!/usr/bin/env node

require('shelljs/make');
require('colors');

var _ = require('underscore');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var mustache = require('mustache');
var moment = require('moment');

/*** CONFIG ********/

var term = process.env.TERM;
var version = process.env.VERSION || moment().format('YYYYMMDD');
var targetDir = process.env.OUTPUT_DIR || path.join('target', 'frontend-build');
var appDir = path.join('src/static');

var indexFile = path.join('config', 'index.mustache');
var mainLessFile = path.join(appDir, 'css', 'main.less');

var devLessFile = path.join('libraries', 'less.js', 'dist', 'less-1.5.0.js');
var devRequireFile = path.join('libraries', 'requirejs', 'require.js');
var devMainLessFile = path.join('css', 'main.less');

var viewsDir = path.join(targetDir, 'views');
var staticDir = path.join(targetDir, 'static');
var jsFileName = 'app-' + version + '.js';
var jsFile = path.join(staticDir, jsFileName);
var cssFileName = 'style-' + version + '.css';
var cssFile = path.join(staticDir, cssFileName);

var rjsConfig = path.join('config', 'build-config.js');
var jshintConfig = path.join('config', 'jshint.json');
var karmaConfig = path.join('config', 'karma.conf.js');


/*** TARGETS ********/

target.all = function() {
  target.bower();
  target.convert();
  target.check();
  target.jshint();
  target.test();
  target.build();
};

target.bower = function() {
  section('Installing dependencies');
  bin('bower', 'install');
};

target.convert = function() {
  var coreDir = 'src/static/libraries/perspective-core-rjs';
  var webSocketDir = 'src/static/libraries/perspective-core-web-socket-helper-rjs';
  if (test('-d', coreDir) && test('-d', webSocketDir)) {
    return;
  }

  section('Converting Common JS modules');
  npmBin('r.js', '-convert', 'src/static/libraries/perspective-core', coreDir);
  npmBin('r.js', '-convert', 'src/static/libraries/perspective-core-web-socket-helper', webSocketDir);

};

target.jshint = function() {
  var srcFiles = glob.sync(path.join(appDir, 'js', '**', '*.js'));
  var testFiles = glob.sync(path.join('test', 'js', '**', '*.js'));

  section('Running JSHint');
  npmBin('jshint', '--config ' + jshintConfig, srcFiles.concat(testFiles).join(' '));
};

target.test = function() {
  section('Running JavaScript tests');
  npmBin('karma', 'start', karmaConfig, '--browsers PhantomJS', '--single-run');
};

target.wtest = function() {
  section('Running JavaScript tests');
  npmBin('karma', 'start', karmaConfig, '--browsers PhantomJS', '--auto-watch');
};

target.build = function() {
  createCleanDir(targetDir);

  mkdir('-p', viewsDir);

  buildIndexHtml();
  buildJavaScript();
  buildCss();

  optimizeImages();

  echo();echo();
  success("Build succeeded!");
};

target.check = function() {
  failIfOnlySubsetOfTestsAreRunning();
};


/*** APP FUNCTIONS ********/

var buildIndexHtml = function() {
  var htmlProductionFile = path.join(viewsDir, 'index.html');
  var htmlDevFile = path.join('src', 'views', 'index.html');

  section('Building HTML for production → ' + htmlProductionFile);
  renderAndWriteTemplate(indexFile, htmlProductionFile, {
    cssFile: cssFileName,
    jsFile: jsFileName,
    prod: true,
    config: '{{{config}}}'
  });

  section('Building HTML for development → ' + htmlDevFile);
  renderAndWriteTemplate(indexFile, htmlDevFile, {
    devMainLessFile: devMainLessFile,
    devLess: devLessFile,
    devRequire: devRequireFile,
    prod: false,
    config: '{{{config}}}'
  });
};

var buildJavaScript = function() {
  section('Building JavaScript → ' + jsFile);
  npmBin('r.js', '-o ' + rjsConfig, 'out=' + jsFile);
};

var buildCss = function() {

  section('Copying all .css files');
  var from = path.join(appDir, 'css/*.css');
  cp('-R', from, staticDir);

  section('Copying all font files');
  from = path.join(appDir, 'css/fonts/');
  var to = path.join(staticDir, 'fonts');
  cp('-R', from, to);

  section('Building Less → ' + cssFile);
  npmBin('lessc', mainLessFile, cssFile);
};

var optimizeImages = function() {
  var pngs = glob.sync(path.join(appDir, 'images', '*.png'));

  if (pngs.length === 0) {
    return;
  }

  section('Optimizing pngs');

  var to = path.join(targetDir, 'images');

  npmBin('optipng', '-strip all', '-dir ' + to, pngs.join(' '))
};

var renderAndWriteTemplate = function(from, to, data) {
  var content = fs.readFileSync(from).toString();
  mustache.parse(content);
  var html = mustache.render(content,data);

  fs.writeFileSync(to, html);

  success();
};

var failIfOnlySubsetOfTestsAreRunning = function() {
  var specs = glob.sync(path.join(appDir, 'js', '**', '*Spec.js'));

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

var bin = function(name) {
  var res = exec(name + ' ' + _.rest(arguments).join(' '));
  done(res);
};

var npmBin = function(name) {
  var bin = path.join('node_modules', '.bin', name);
  if (term === 'cygwin')
    bin = bin+'.cmd';
	
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
