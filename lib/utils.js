/**
 * toggle between n functions
 *
 * Example:
 *
 *  var a = function(p) { console.log("a:", p); };
 *  var b = function(p) { console.log("b:", p); };
 *
 *  var func = toggle(a, b);
 *  func('hi') // => "a: hi"
 *  func('bonjour') // => "b: bonjour"
 *  func('hello') // => "a: hello"
 *
 */
var toggle = exports.toggle = function() {
  var self = this,
      args = Array.prototype.slice.call(arguments),
      len = args.length,
      i = 0;

  return function() {
    var ret = args[i++].apply(self, arguments);
    i = (i === len) ? 0 : i;
    return ret;
  };
};