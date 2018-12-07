/**
 * Setup
 */
// Mock function calls inside constructor
Handsfree.prototype.applyConfig = jest.fn()
Handsfree.prototype.checkForMediaSupport = jest.fn()
Handsfree.prototype.injectDebugger = jest.fn()
Handsfree.prototype.injectCursor = jest.fn()
Handsfree.prototype.initAndMaybeReadWASMBinary = jest.fn()
Handsfree.prototype.throwError = jest.fn()

const pckg = require('../package')
let handsfree
handsfree = new Handsfree({})

/**
 * Tests
 */
describe('On require', () => {
  it('sets handsfree-is-loading body class', () => {
    expect(document.body.classList.contains('handsfree-is-loading')).toBeTruthy()
  })
  
  it('sets version and libPath', () => {
    expect(Handsfree.version).toBe(pckg.version)
    expect(Handsfree.libPath).toBe(pckg.jest.testURL)
  })
})

describe('Handsfree.constructor', () => {
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
  
  it('overwrites settings', () => {
    const hf = new Handsfree({settings: {maxFaces: 2}})
    expect(hf.settings.maxFaces).toBe(2)
  })
})

describe('Handsfree.start', () => {
  it('toggles debugger', () => {
    handsfree.toggleDebugger = jest.fn()
    handsfree.debug.$webcam = document.createElement('video')
    handsfree.start()
    expect(handsfree.toggleDebugger).toHaveBeenCalled()
  })

  it('adjusts body classes', () => {
    expect(document.body.classList.contains('handsfree-started')).toBeTruthy()
    expect(document.body.classList.contains('handsfree-stopped')).toBeFalsy()
  })

  it('handles mediaDevice errors', () => {
    const webcam = handsfree.settings.webcam
    handsfree.settings.webcam = false
    handsfree.toggleDebugger.mockClear()
    handsfree.start()
    
    expect(handsfree.toggleDebugger).toHaveBeenCalled()
    handsfree.settings.webcam = webcam
  })

  it('dispatches handsfree:loading', async () => {
    const dispatch = jest.fn()
    window.addEventListener('handsfree:loading', dispatch)
    await handsfree.start()

    expect(dispatch).toHaveBeenCalledTimes(2)
    window.removeEventListener('handsfree:loading', dispatch)
  })

  it('starts BRFv4 when the sdk is not ready', async () => {
    handsfree.startBRFv4 = jest.fn()
    await handsfree.start()
    expect(handsfree.startBRFv4).toHaveBeenCalled()
  })

  it('tracks faces when brf is ready', async () => {
    let numFaces = 0
    handsfree.trackFaces = jest.fn()
    handsfree.brf = {
      sdk: true,
      manager: {setNumFacesToTrack: count => {numFaces = count}}
    }
    await handsfree.start()

    expect(handsfree.trackFaces).toHaveBeenCalled()
    expect(numFaces).toBe(handsfree.settings.maxFaces)
  })
})

describe('Handsfree.stop', () => {
  it('sets body classes', () => {
    handsfree.isTracking = false
    handsfree.stop()

    expect(document.body.classList.contains('handsfree-started')).toBeFalsy()
    expect(document.body.classList.contains('handsfree-stopped')).toBeTruthy()
  })
  
  it('stops tracking', () => {
    handsfree.isTracking = true
    handsfree.onStopHooks = jest.fn()
    handsfree.toggleDebugger = jest.fn()
    handsfree.debug.$webcam.srcObject = {getTracks: () => []}
    handsfree.stop()

    expect(handsfree.isTracking).toBeFalsy()
    expect(handsfree.toggleDebugger).toHaveBeenCalledWith(false)
    expect(handsfree.onStopHooks).toHaveBeenCalled()
  })
})

// // @TODO
// describe('Handsfree.trackFaces', () => {
//   it('mirrors context', () => {})
//   it('can get faces', () => {})
//   it('calculates cursor position', () => {})
//   it('sets touched elements', () => {})
//   it('fires onFrameHooks', () => {})
//   it('dispatches handsfree-trackFaces', () => {})
//   it('can be stopped', () => {})
// })

// // @TODO
// describe('Handsfree.setTouchedElement', () => {
//   it('correctly sets cursor.$target', () => {})
// })

// // @TODO
// describe('Handsfree.calculateXY', () => {
//   it('can set cursor settings', () => {})
// })