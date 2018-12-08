/**
 * Sets up JEST
 */
require('jest-canvas-mock')
require('./jest-polyfills')
require('./polyfills/document.currentScript.mock')
require('./polyfills/navigator.mediaDevices.mock')
global.Handsfree = require('../handsfree.js/Handsfree')