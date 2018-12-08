/**
 * Mock each property indvidivually
 * - Exposes Handsfree.prototype._mock()
 * -- Each prop is set to _${propName}
 * -- Original prop is set to jest.fn()
 */

// Make Handsfree globally accessible
global.Handsfree = require('../handsfree.js/Handsfree')

Handsfree.prototype._mock = function () {
  Object.getOwnPropertyNames(Handsfree.prototype).forEach((propName) => {
    if (propName !== '_mock') {
      Handsfree.prototype[`_${propName}`] = Handsfree.prototype[propName]
      Handsfree.prototype[propName] = jest.fn()
    }
  })
}
Handsfree.prototype._mock()