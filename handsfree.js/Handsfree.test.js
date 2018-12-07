const Handsfree = require('./Handsfree')
const pckg = require('../package')

describe('On require', () => {
  it('sets handsfree-is-loading body class', () => {
    expect(document.body.classList.contains('handsfree-is-loading')).toBeTruthy()
  })
  
  it('sets version', () => {
    expect(Handsfree.version).toBe(pckg.version)
  })

  it('sets libPath', () => {
    expect(Handsfree.libPath).toBe(pckg.jest.testURL)
  })
})

describe('Handsfree.constructor', () => {
  Handsfree.prototype.applyConfig = jest.fn()
  Handsfree.prototype.checkForMediaSupport = jest.fn()
  Handsfree.prototype.injectDebugger = jest.fn()
  Handsfree.prototype.injectCursor = jest.fn()
  Handsfree.prototype.initAndMaybeReadWASMBinary = jest.fn()

  const opts = {}
  const handsfree = new Handsfree({})

  it('adds "handsfree-stopped" to body class', () => {
    expect(document.body.classList.contains('handsfree-stopped')).toBeTruthy()
  })

  it('sets default flags', () => {
    expect(handsfree.isTracking).toBe(false)
    expect(handsfree.isSupported).toBe(false)
    expect(handsfree.isWASMSupported).toBe(true)
    expect(handsfree.plugin).toBeTruthy()
    expect(handsfree.debug).toBeTruthy()
    expect(handsfree.brf).toBeTruthy()
    expect(handsfree.cursor).toBeTruthy()
    expect(handsfree.faces).toBeNull()
    expect(handsfree.tweenFaces).toBeTruthy()
  })
  
  Handsfree.prototype.applyConfig.mockRestore()
  Handsfree.prototype.checkForMediaSupport.mockRestore()
  Handsfree.prototype.injectDebugger.mockRestore()
  Handsfree.prototype.injectCursor.mockRestore()
  Handsfree.prototype.initAndMaybeReadWASMBinary.mockRestore()
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