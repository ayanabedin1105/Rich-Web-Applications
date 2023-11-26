
module.exports = function (prototype, name, func) {

  // Don't override existing definitions
  if ( prototype[name] ) return;

  Object.defineProperty(prototype, name, {
    value: func,
    writable: true,
    configurable: true,
    enumerable: false
  });
}
