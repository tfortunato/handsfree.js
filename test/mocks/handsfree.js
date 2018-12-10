/**
 * Mock each property indvidivually
 * - Exposes Handsfree.prototype._mock()
 * -- Each prop is set to _${propName}
 * -- Original prop is set to jest.fn()
 * -- Calling this method clears all mocks
 */
const {get, set} = require('lodash')

// Make Handsfree globally accessible
global.Handsfree = require('../../handsfree.js/Handsfree')
global.handsfree = null

Object.getOwnPropertyNames(Handsfree.prototype).forEach((propName) => {
  Handsfree.prototype[`_${propName}`] = Handsfree.prototype[propName]
  Handsfree.prototype[propName] = jest.fn()
})

/**
 * Quick restart points
 */
Handsfree._mock = {
  // Handsfree._mock.plugins()
  plugins: require('./plugins'),

  // Monitor number of times things were called
  spy: {
    // Number of times plugin onStart was called
    onStart: 0,
    // Number of times plugin onStop was called
    onStop: 0
  },

  /**
   * We've mocked each prop/method individually, but internal method
   * calls are still made to the now mocked method.
   * 
   * This restores a mocked method to what it was, by name:
   * Handsfree._mock.restore(handsfree, 'onStartHooks')
   * 
   * @param mocked The instance to effect
   * @param propName The Handsfree.prototype[propName] to restore
   */
  restore (mocked, propName) {
    const mockedProp = get(mocked, `_${propName}`)
    set(mocked, propName, mockedProp)
  }
}