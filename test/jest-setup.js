/**
 * Sets up JEST
 */
require('jest-canvas-mock')
require('./polyfills/document.currentScript.mock')
require('./polyfills/navigator.mediaDevices.mock')
require('./polyfills/document.elementFromPoint.mock')
require('./polyfills/xhr.mock')
jest.mock('../handsfree.js/models/BRFv4_JS_TK110718_v4.1.0_trial.js')
global.Handsfree = require('../handsfree.js/Handsfree')