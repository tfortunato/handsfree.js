/**
 * Mock each property indvidivually
 * - Exposes Handsfree.prototype._mock()
 * -- Each prop is set to _${propName}
 * -- Original prop is set to jest.fn()
 * -- Calling this method clears all mocks
 */

// Make Handsfree globally accessible
global.Handsfree = require('../handsfree.js/Handsfree')
global.handsfree = null

Object.getOwnPropertyNames(Handsfree.prototype).forEach((propName) => {
  Handsfree.prototype[`_${propName}`] = Handsfree.prototype[propName]
  Handsfree.prototype[propName] = jest.fn()
})