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
Handsfree.prototype.calculateXY = jest.fn()
Handsfree.prototype.onFrameHooks = jest.fn()
Handsfree.prototype.drawFaces = jest.fn()

const pckg = require('../package')
const faces = require('../src/store/faces/1-wink-face')
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

/**
 * Handsfree.constructor
 */
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

/**
 * Handsfree.start
 */
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
    const trackFaces = jest.spyOn(handsfree, 'trackFaces')
    handsfree.brf = {
      sdk: true,
      manager: {setNumFacesToTrack: count => {numFaces = count}}
    }
    await handsfree.start()

    expect(trackFaces).toHaveBeenCalled()
    expect(numFaces).toBe(handsfree.settings.maxFaces)
    trackFaces.mockRestore()
  })
})

/**
 * Handsfree.stop
 */
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

/**
 * Handsfree.trackFaces
 */
describe('Handsfree.trackFaces', () => {
  it('mirrors context', () => {
    handsfree.debug.ctx = {
      drawImage: jest.fn(),
      setTransform: jest.fn(),
      getImageData: () => ({data: 0})
    }
    handsfree.brf.manager.update = jest.fn()
    handsfree.brf.manager.getFaces = () => faces
    handsfree.brf.resolution = {width: 640, height: 480}
    handsfree.isTracking = false
    handsfree.trackFaces()

    expect(handsfree.debug.ctx.drawImage).toHaveBeenCalled()
    expect(handsfree.debug.ctx.setTransform).toHaveBeenCalled()
  })

  it('does\'t draw faces when debug is on', () => {
    handsfree.debug.isDebugging = false
    handsfree.trackFaces()

    expect(handsfree.drawFaces).not.toHaveBeenCalled()
  })

  it('draws faces when debug is on', () => {
    const setTouchedElement = jest.spyOn(handsfree, 'setTouchedElement')
    handsfree.debug.$canvas = {
      width: 640,
      height: 480
    }
    
    handsfree.debug.isDebugging = true
    handsfree.trackFaces()
    expect(handsfree.drawFaces).toHaveBeenCalled()
  })

  it('loops while isTracking is on', () => {
    const rAF = jest.spyOn(window, 'requestAnimationFrame')
    handsfree.isTracking = true
    handsfree.trackFaces()

    expect(rAF).toHaveBeenCalled()
  })

  it('dispatches event', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree-trackFaces', cb)
    handsfree.trackFaces()
    
    expect(cb).toHaveBeenCalled()
    window.removeEventListener('handsfree-trackFaces', cb)
  })
})

// @TODO
describe('Handsfree.setTouchedElement', () => {})