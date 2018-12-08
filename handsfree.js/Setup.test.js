require('../test/setup/block-post-instantiation.js')
Handsfree.prototype.throwError = jest.fn()
Handsfree.prototype.loadPlugins = jest.fn()
let handsfree = new Handsfree()

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

describe('Handsfree.onReadyHook', () => {
  it('fires handsfree:ready', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:ready', cb)
    
    handsfree.onReadyHook()
    expect(cb).toHaveBeenCalled()
  })

  it('sets body classes', () => {
    handsfree.onReadyHook()
    expect(document.body.classList.contains('handsfree-is-loading')).toBeFalsy()
    expect(document.body.classList.contains('handsfree-ready')).toBeTruthy()
  })
})

// @TODO
describe('Handsfree.startBRFV4', () => {})

// @TODO
describe('Handsfree.waitForSDK', () => {})

// @TODO
describe('Handsfree.initSDK', () => {})

