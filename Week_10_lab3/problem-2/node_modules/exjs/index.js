
exports.load = function (modules) {

  if ( ! Array.isArray(modules) ) {
    console.error("[exjs] Error: The argument to `.load()` must be an array of strings.")
    return
  }

  modules.forEach(function (ex) {
    require('./' + ex)
  })
}
