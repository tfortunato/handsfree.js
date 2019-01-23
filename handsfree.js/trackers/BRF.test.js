/**
 * Handsfree.prototype.initBRF
 */
describe('Handsfree.prototype.initBRF', () => {
  it('throws error if WASM is not supported', () => {
    const handsfree = new Handsfree()

    handsfree.isWASMSupported = false
    handsfree._initBRF()
    expect(handsfree.throwError).toHaveBeenCalled()

    handsfree.isWASMSupported = true
    handsfree.throwError.mockClear()
    handsfree._initBRF()
    expect(handsfree.throwError).not.toHaveBeenCalled()
  })

  it('dispatches handsfree:loading', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    window.addEventListener('handsfree:loading', cb)
    handsfree._initBRF()
    expect(cb).toHaveBeenCalled()

    window.removeEventListener('handsfree:loading', cb)
  })

  it('handles errors on ready', () => {
    const handsfree = new Handsfree()
    // Random error-producing code
    global.XMLHttpRequest(13)
    handsfree._initBRF()
    expect(handsfree.throwError).toHaveBeenCalled()

    global.XMLHttpRequest(200)
    handsfree.throwError.mockClear()
    expect(handsfree.throwError).not.toHaveBeenCalled()
  })
})

/**
 * Handsfree.prototype.startBRFv4
 */
describe('Handsfree.prototype.startBRFv4', () => {
  it('keep trying until the webcam is ready', () => {
    const handsfree = new Handsfree()
    const st = setTimeout
    const onLoading = jest.fn()
    handsfree._injectDebugger()
    setTimeout = cb => cb()
    window.addEventListener('handsfree:loading', onLoading)
    
    handsfree._startBRFv4()
    expect(handsfree.startBRFv4).toHaveBeenCalled()
    
    handsfree.debug.$webcam = {videoWidth: 640}
    handsfree.startBRFv4.mockClear()
    handsfree._startBRFv4()
    expect(handsfree.startBRFv4).not.toHaveBeenCalled()
    expect(onLoading).toHaveBeenCalled()

    window.removeEventListener('handsfree:loading', onLoading)
    setTimeout = st
  })
})

/**
 * Handsfree.prototype.waitForBRFSDK
 */
describe('Handsfree.prototype.waitForBRFSDK', () => {
  it('dispatches handsfree:loading', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:loading', cb)
    const handsfree = new Handsfree()
    
    handsfree.brf = {}
    console.log('+++++++++++ Calling')
    handsfree._waitForBRFSDK()
    expect(cb).toHaveBeenCalled()
    window.removeEventListener('handsfree:loading', cb)
  })

  it('runs initBRFSDK', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    const st = setTimeout
    setTimeout = jest.fn()
    window.addEventListener('handsfree:loading', cb)

    handsfree._waitForBRFSDK()
    expect(setTimeout).toHaveBeenCalled()
    handsfree.brf.sdk.sdkReady = true
    handsfree._waitForBRFSDK()
    expect(handsfree.initBRFSDK).toHaveBeenCalled()
    
    window.removeEventListener('handsfree:loading', cb)
    setTimeout = st
  })
})

/**
 * Handsfree.prototype.initBRFSDK
 */
describe('Handsfree.prototype.initBRFSDK', () => {
  it('dispatches handsfree:loading and sets isTracking to true', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    window.addEventListener('handsfree:loading', cb)
    handsfree._injectDebugger()

    handsfree.brf = {
      sdk: {
        Rectangle: jest.fn(),
        BRFManager: jest.fn(() => ({
          init: jest.fn(),
          setNumFacesToTrack: jest.fn()
        }))
      }
    }
    
    handsfree.isTracking = false
    handsfree._initBRFSDK()
    expect(cb).toHaveBeenCalled()
    expect(handsfree.isTracking).toBe(true)

    window.removeEventListener('handsfree:loading', cb)
  })
})