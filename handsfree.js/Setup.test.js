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

  it('creates xhr request for .wasm file', () => {})

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