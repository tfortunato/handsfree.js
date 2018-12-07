const STUBS = require('../test/jest-polyfills')
const Handsfree = require('./Handsfree')
const onReadyHook = Handsfree.prototype.onReadyHook
const loadPlugins = Handsfree.prototype.loadPlugins
const waitForSDK = Handsfree.prototype.waitForSDK
STUBS.mediaDevices.support()

describe('Handsfree.applyConfig', () => {
  it('Sets defaults', () => {
    Handsfree.prototype.applyConfig({})
    expect(Handsfree.prototype.opts.debug).toBe(false)
  })

  it('Overrides defaults', () => {
    Handsfree.prototype.applyConfig({debug: true})
    expect(Handsfree.prototype.opts.debug).toBe(true)
    Handsfree.prototype.applyConfig({debug: false})
  })
})

describe('Handsfree.initAndMaybeReadWASMBinary', () => {
  it('WASM isn\'t supported', () => {
    STUBS.mediaDevices.unsupport()

    Handsfree.prototype.onReadyHook = jest.fn()
    Handsfree.prototype.loadPlugins = jest.fn()
    Handsfree.prototype.initAndMaybeReadWASMBinary()

    expect(Handsfree.prototype.onReadyHook).toHaveBeenCalled()
    expect(Handsfree.prototype.loadPlugins).toHaveBeenCalled()
    Handsfree.prototype.onReadyHook = onReadyHook
    Handsfree.prototype.loadPlugins = loadPlugins
  })

  it('WASM is supported', () => {
    const xhr = XMLHttpRequest
    XMLHttpRequest = jest.fn()
    XMLHttpRequest.prototype.open = jest.fn()
    XMLHttpRequest.prototype.send = jest.fn()
    STUBS.mediaDevices.support()

    Handsfree.prototype.isWASMSupported = true
    Handsfree.prototype.brf = {
      baseURL: `${Handsfree.libPath}brf/`,
      sdkName: 'BRFv4_JS_TK110718_v4.1.0_trial'
    }
    Handsfree.prototype.onReadyHook = jest.fn()
    Handsfree.prototype.loadPlugins = jest.fn()
    Handsfree.prototype.initAndMaybeReadWASMBinary()

    expect(XMLHttpRequest).toHaveBeenCalled()
    XMLHttpRequest = xhr
    Handsfree.prototype.onReadyHook = onReadyHook
    Handsfree.prototype.loadPlugins = loadPlugins
  })
})

describe('Handsfree.onReadyHook', () => {
  it('Sets correct classes', () => {
    Handsfree.prototype.onReadyHook()
    expect(document.body.classList.contains('handsfree-ready')).toBeTruthy()
    expect(document.body.classList.contains('handsfree-is-loading')).toBeFalsy()
  })
})

describe('Handsfree.startBRFv4', () => {
  it('waits until videoWidth is set', () => {
    const timeout = setTimeout
    setTimeout = jest.fn()
    
    Handsfree.prototype.waitForSDK = jest.fn()
    Handsfree.prototype.debug = {$webcam: {videoWidth: 0}}
    Handsfree.prototype.startBRFv4()
    
    expect(setTimeout).toHaveBeenCalled()
    setTimeout = timeout
    Handsfree.prototype.waitForSDK = waitForSDK
  })

  it('Sets canvas dimensions', () => {
    Handsfree.prototype.waitForSDK = jest.fn()
    Handsfree.prototype.debug = {
      $webcam: {
        videoWidth: 640,
        videoHeight: 480
      },
      $canvas: {
        width: 0,
        height: 0
      }
    }

    Handsfree.prototype.startBRFv4()
    expect(Handsfree.prototype.waitForSDK).toHaveBeenCalled()
    expect(Handsfree.prototype.debug.$canvas.width).toBe(Handsfree.prototype.debug.$webcam.videoWidth)
    expect(Handsfree.prototype.debug.$canvas.height).toBe(Handsfree.prototype.debug.$webcam.videoHeight)
    Handsfree.prototype.waitForSDK = waitForSDK
  })
})