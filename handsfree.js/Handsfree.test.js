const Handsfree = require('./Handsfree')

describe('Handsfree.constructor', () => {
  it('sets handsfree-is-loading body class', () => {})
  it('sets libPath', () => {})
  it('sets version', () => {})
  it('sets default flags', () => {})
  it('sets default settings', () => {})
  it('adds "handsfree-stopped" to body class', () => {})
})

describe('Handsfree.start', () => {
  it('toggles debugger', () => {})
  it('sets tracking mode', () => {})
  it('sets body classes', () => {})
  it('can get user media stream', () => {})
  it('can detect that no cameras are available', () => {})
  it('dispatches "handsfree:loading"', () => {})
  it('starts the webcam', () => {})
  it('calls "onStartHooks"', () => {})
  it('starts BRFv4', () => {})
  it('starts tracking faces', () => {})
})

describe('Handsfree.stop', () => {
  it('sets body classes', () => {})
  it('sets trackings mode', () => {})
  it('toggles debugger', () => {})
  it('fires onStopHooks', () => {})
})

describe('Handsfree.trackFaces', () => {
  it('mirrors context', () => {})
  it('can get faces', () => {})
  it('calculates cursor position', () => {})
  it('sets touched elements', () => {})
  it('fires onFrameHooks', () => {})
  it('dispatches handsfree-trackFaces', () => {})
  it('can be stopped', () => {})
})

describe('Handsfree.setTouchedElement', () => {
  it('correctly sets cursor.$target', () => {})
})

describe('Handsfree.calculateXY', () => {
  it('can set cursor settings', () => {})
})