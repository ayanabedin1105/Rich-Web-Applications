//
// waittime - Idle time to wait before calling function
// threshhold - Time to wait before making next call
// explicitContext - Your parameter `this`
//
require('../ex')(Function.prototype, 'throttle', function throttle (waittime, threshhold, explicitContext) {
  threshhold || (threshhold = 250);
  var fn = this
  var last, deferTimer

  var go = function (context, args) {
    var now = +new Date

    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer)

      deferTimer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)

    } else {
      last = now
      fn.apply(context, args)
    }
  }

  var goTimeout = null
  return function () {
    var args = arguments
    clearTimeout(goTimeout)
    goTimeout = setTimeout(function() {
      go(explicitContext || this, args)
    }, waittime)
  }
})
