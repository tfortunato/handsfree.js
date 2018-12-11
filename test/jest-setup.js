/**
 * Configures our test suites
 */
// Core mocks
require('jest-canvas-mock')
require('./polyfills/document.currentScript.mock')
require('./polyfills/navigator.mediaDevices.mock')
require('./polyfills/document.elementFromPoint.mock')
require('./polyfills/xhr.mock')
require('./polyfills/canvas')

// Mock models
jest.mock('../handsfree.js/models/BRFv4_JS_TK110718_v4.1.0_trial.js')

// Mock Handsfree
require('./mocks/handsfree')