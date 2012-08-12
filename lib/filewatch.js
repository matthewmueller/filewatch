/**
 * Module Dependencies
 */

var fs = require('fs'),
    toggle = require('./utils').toggle,
    debug = require('debug')('filewatch'),
    exec = require('child_process').exec,
    noop = function() {};

/**
 * Export `Watch`
 */

module.exports = Watch;

/**
 * Watch for changes
 *
 * @api public
 */

function Watch(paths, options, cmd) {
  this.paths = paths || [];
  this.options = options || {};
  this.watchers = [];
  this.cmd = cmd;
}

/**
 * Start watching
 *
 * @api public
 */

Watch.prototype.start = function() {
  var self = this,
      watchers = self.watchers;
  
  self.paths.forEach(function(path, i) {
    watchers[watchers.length] = fs.watch(path, toggle.call(self, self.execute, noop));
  });
};

/**
 * Stop watching
 *
 * @api public
 */

Watch.prototype.stop = function() {
  this.watchers.forEach(function(watcher) {
    watcher.close();
  });
};

/**
 * Execute this function when a file changes.
 *
 * Overwrite this function to provide custom execution logic
 *
 * @api public
 */

Watch.prototype.execute = function() {
  debug('file changed');
  exec(this.cmd, this.reporter);
};

/**
 * Default reporter
 *
 * @api public
 */

Watch.prototype.reporter = function(err, stdout, stderr) {
  if(err) throw err;
  debug('stderr', stderr);
  debug('stdout', stdout);

  if(stderr) process.stderr.write('Error:' + stderr);
  process.stdout.write(stdout);
};