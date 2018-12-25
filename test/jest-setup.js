/**
 * Configures our test suites
 */
// Core mocks
require('jest-canvas-mock')
require('./polyfills/document.currentScript.mock')
require('./polyfills/navigator.mediaDevices.mock')
require('./polyfills/document.elementFromPoint.mock')
require('./polyfills/xhr.mock')
require('./polyfills/window.scrollTo.mock')

// Mock models
jest.mock('../handsfree.js/models/BRFv4_JS_TK110718_v4.1.0_trial.js')
jest.mock('simple-keyboard', () => ({
  default: function (config) {
    this.setInput = jest.fn()
    this.onChange = config.onChange
    this.onKeyPress = config.onKeyPress
  }
}))

// Mock Handsfree
require('./mocks/handsfree')