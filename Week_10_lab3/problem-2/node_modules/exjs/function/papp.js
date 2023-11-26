//
// See more at https://github.com/mindeavor/es-papp
//
require('../ex')(Function.prototype, 'papp', function papp () {
  var slice = Array.prototype.slice;
  var fn = this;
  var args = slice.call(arguments);
  return function () {
    return fn.apply(this, args.concat(slice.call(arguments)));
  };
});
