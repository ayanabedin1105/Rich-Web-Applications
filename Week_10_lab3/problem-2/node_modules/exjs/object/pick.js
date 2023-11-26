
Object.pick = function pick (properties, obj) {
  if (arguments.length === 1) {
    return function (obj) { return _pick(properties, obj) }
  }
  return _pick(properties, obj)
}

function _pick (properties, obj) {
  var result = {}

  for (var i=0; i < properties.length; i++) {
    var prop = properties[i]
    result[prop] = obj[prop]
  }

  return result
}
