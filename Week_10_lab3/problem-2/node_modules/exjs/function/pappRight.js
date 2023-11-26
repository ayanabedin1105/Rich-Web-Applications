//
// See more at https://github.com/mindeavor/es-papp
//
require('../ex')(Function.prototype, 'pappRight', function pappRight () {
  var slice = Array.prototype.slice;
  var fn = this;
  var args = slice.call(arguments);
  return function () {
    return fn.apply(this, slice.call(arguments).concat(args));
  };
});
