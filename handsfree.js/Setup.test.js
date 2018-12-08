require('../test/setup/block-post-instantiation.js')
Handsfree.prototype.throwError = jest.fn()
Handsfree.prototype.loadPlugins = jest.fn()
let handsfree = new Handsfree()

/**
 * Handsfree.initAndMaybeReadWASMBinary
 */
describe('Handsfree.initAndMaybeReadWASMBinary', () => {
  it('throws error when WASM is not supported', () => {
    handsfree.isWASMSupported = false
    handsfree.initAndMaybeReadWASMBinary()
    expect(handsfree.throwError).toHaveBeenCalled()
  })

  it('emmits wasm progress', () => {
    const onProgress = jest.fn()
    window.addEventListener('handsfree:loading', onProgress)
    
    handsfree.isWASMSupported = true
    handsfree.initAndMaybeReadWASMBinary()
    expect(onProgress).toHaveBeenCalled()

    window.removeEventListener('handsfree:loading', onProgress)
  })

  it('loads wasm buffer', () => {
    XMLHttpRequest.prototype.status = 200
    XMLHttpRequest.prototype.response = true
    handsfree.brf.WASMBuffer = false
    handsfree.initAndMaybeReadWASMBinary()
    expect(handsfree.brf.WASMBuffer).toBeTruthy()
    
    XMLHttpRequest.prototype.status = 0
    XMLHttpRequest.prototype.response = true
    handsfree.brf.WASMBuffer = false
    handsfree.initAndMaybeReadWASMBinary()
    expect(handsfree.brf.WASMBuffer).toBeTruthy()
  })

  it('handles wasm error', () => {
    XMLHttpRequest.prototype.status = 0
    XMLHttpRequest.prototype.response = false
    handsfree.brf.WASMBuffer = false
    handsfree.initAndMaybeReadWASMBinary()
    expect(handsfree.brf.WASMBuffer).toBeFalsy()
  })
})

/**
 * Handsfree.onReadyHook
 */
describe('Handsfree.onReadyHook', () => {
  it('fires handsfree:ready and sets body classes', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:ready', cb)
    
    handsfree.onReadyHook()
    expect(cb).toHaveBeenCalled()
    expect(document.body.classList.contains('handsfree-is-loading')).toBeFalsy()
    expect(document.body.classList.contains('handsfree-ready')).toBeTruthy()
  })
})

/**
 * Handsfree.startBRFV4
 */
describe('Handsfree.startBRFV4', () => {
  it('recurses until videoWidth is set', () => {
    const timeout = setTimeout
    setTimeout = jest.fn()
    handsfree.debug.$webcam = {videoWidth: 0}

    handsfree.startBRFv4()
    expect(setTimeout).toHaveBeenCalled()
    setTimeout = timeout
  })

  it('Sets canvas size and dispatches events', () => {
    const cb = jest.fn()
    const waitForSDK = handsfree.waitForSDK

    handsfree.waitForSDK = jest.fn()
    handsfree.debug.$canvas = {}
    handsfree.debug.$webcam = {
      videoWidth: 640,
      videoHeight: 480
    }
    window.addEventListener('handsfree:loading', cb)
    handsfree.startBRFv4()
  
    expect(cb).toHaveBeenCalled()
    expect(handsfree.debug.$canvas.width).toBe(handsfree.debug.$webcam.videoWidth)
    expect(handsfree.debug.$canvas.height).toBe(handsfree.debug.$webcam.videoHeight)
    handsfree.waitForSDK = waitForSDK
    window.removeEventListener('handsfree:loading', cb)
  })
})

/**
 * Handsfree.waitForSDK
 */
describe('Handsfree.waitForSDK', () => {
  it('sets sdk if not set and dispatches progress', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:loading', cb)
    handsfree.brf.sdk = null

    handsfree.waitForSDK()
    expect(handsfree.sdk).not.toBeNull()
    expect(cb).toHaveBeenCalled()
    window.removeEventListener('handsfree:loading', cb)
  })

  it('waits for sdk when sdk is not ready', () => {
    const timeout = setTimeout
    setTimeout = jest.fn()
    handsfree.brf.sdk = {sdkReady: false}

    handsfree.waitForSDK()
    expect(setTimeout).toHaveBeenCalled()
    setTimeout = timeout
  })

  it('initializes sdk once it\'s ready', () => {
    const initSDK = handsfree.initSDK
    handsfree.initSDK = jest.fn()
    handsfree.brf.sdk = {sdkReady: true}
    
    handsfree.waitForSDK()
    expect(handsfree.initSDK).toHaveBeenCalled()
    handsfree.initSDK = initSDK
  })
})

/**
 * Handsfree.initSDK
 */
describe('Handsfree.initSDK', () => {
  it('dispatches handsfree:loading and enabled tracking', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:loading', cb)

    handsfree.isTracking = false
    handsfree.trackFaces = jest.fn()
    handsfree.brf.sdk = {
      Rectangle: function () {},
      BRFManager: function () {
        this.init = function () {}
        this.setNumFacesToTrack = function () {}
      }
    }

    handsfree.initSDK()
    expect(cb).toHaveBeenCalled()
    expect(handsfree.isTracking).toBe(true)
    window.removeEventListener('handsfree:loading', cb)
  })
})