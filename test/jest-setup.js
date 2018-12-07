/**
 * Sets up JEST
 */
require('jest-canvas-mock')
require('./jest-polyfills')
require('./document.currentScript.mock')
require('./navigator.mediaDevices.mock')
global.Handsfree = require('../handsfree.js/Handsfree')