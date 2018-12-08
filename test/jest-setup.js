/**
 * Sets up JEST
 */
require('jest-canvas-mock')
require('./polyfills/document.currentScript.mock')
require('./polyfills/navigator.mediaDevices.mock')
require('./polyfills/document.elementFromPoint.mock')
require('./polyfills/xhr.mock')
global.Handsfree = require('../handsfree.js/Handsfree')