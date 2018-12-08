require('../test/setup/block-post-instantiation.js')
Handsfree.prototype.throwError = jest.fn()
let handsfree = new Handsfree()

// @TODO
describe('Handsfree.initAndMaybeReadWASMBinary', () => {
  it('throws error when WASM is not supported', () => {
    handsfree.isWASMSupported = false
    handsfree.initAndMaybeReadWASMBinary()

    expect(handsfree.throwError).toHaveBeenCalled()
  })

  it('emmits wasm progress', () => {})

  it('loads wasm buffer', () => {})

  it('handles wasm error', () => {})

  it('calls onReadyHooks', () => {})
})

// @TODO
describe('Handsfree.onReadyHook', () => {})

// @TODO
describe('Handsfree.startBRFV4', () => {})

// @TODO
describe('Handsfree.waitForSDK', () => {})

// @TODO
describe('Handsfree.initSDK', () => {})

