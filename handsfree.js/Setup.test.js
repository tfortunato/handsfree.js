/**
 * Handsfree.prototype.initAndMaybeReadWASMBinary
 */
describe('Handsfree.prototype.initAndMaybeReadWASMBinary', () => {
  it('throws error if WASM is not supported', () => {
    const handsfree = new Handsfree()

    handsfree.isWASMSupported = false
    handsfree._initAndMaybeReadWASMBinary()
    expect(handsfree.throwError).toHaveBeenCalled()

    handsfree.isWASMSupported = true
    handsfree.throwError.mockClear()
    handsfree._initAndMaybeReadWASMBinary()
    expect(handsfree.throwError).not.toHaveBeenCalled()
  })

  it('dispatches handsfree:loading', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    window.addEventListener('handsfree:loading', cb)
    handsfree._initAndMaybeReadWASMBinary()
    expect(cb).toHaveBeenCalled()

    window.removeEventListener('handsfree:loading', cb)
  })

  it('handles errors on ready', () => {
    const handsfree = new Handsfree()
    // Random error-producing code
    global.XMLHttpRequest(13)
    handsfree._initAndMaybeReadWASMBinary()
    expect(handsfree.throwError).toHaveBeenCalled()

    global.XMLHttpRequest(200)
    handsfree.throwError.mockClear()
    expect(handsfree.throwError).not.toHaveBeenCalled()
  })
})

/**
 * Handsfree.prototype.onReadyHook
 */
describe('Handsfree.prototype.onReadyHook', () => {
  it('sets body classes and dispatches handsfree:ready', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    window.addEventListener('handsfree:ready', cb)
    handsfree._onReadyHook()
    
    expect(document.body.classList).toContain('handsfree-ready')
    expect(document.body.classList).not.toContain('handsfree-is-loading')
    expect(cb).toHaveBeenCalled()
    window.removeEventListener('handsfree:ready', cb)
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
 * Handsfree.prototype.waitForSDK
 */
describe('Handsfree.prototype.waitForSDK', () => {
  it('dispatches handsfree:loading', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    window.addEventListener('handsfree:loading', cb)
    
    handsfree._waitForSDK()
    expect(cb).toHaveBeenCalled()
    window.removeEventListener('handsfree:loading', cb)
  })

  it('runs initSDK', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    const st = setTimeout
    setTimeout = jest.fn()
    window.addEventListener('handsfree:loading', cb)

    handsfree._waitForSDK()
    expect(setTimeout).toHaveBeenCalled()
    handsfree.brf.sdk.sdkReady = true
    handsfree._waitForSDK()
    expect(handsfree.initSDK).toHaveBeenCalled()
    
    window.removeEventListener('handsfree:loading', cb)
    setTimeout = st
  })
})