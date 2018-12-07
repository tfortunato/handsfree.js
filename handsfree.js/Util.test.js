const STUBS = require('../test/jest-polyfills')
const Handsfree = require('./Handsfree')
STUBS.mediaDevices.support()

// Cache methods
const throwError = Handsfree.prototype.throwError

describe('Handsfree.checkForMediaSupport', () => {
  it('WebGL is supported', () => {
    Handsfree.prototype.throwError = jest.fn()
    Handsfree.prototype.checkForMediaSupport()

    expect(Handsfree.prototype.throwError).not.toHaveBeenCalled()
    Handsfree.prototype.throwError = throwError
  })

  it('WebGL is not supported', () => {
    const createElement = document.createElement

    document.createElement = () => {throw new Error('')}
    Handsfree.prototype.throwError = jest.fn()
    Handsfree.prototype.checkForMediaSupport()

    expect(Handsfree.prototype.throwError).toHaveBeenCalled()
    Handsfree.prototype.throwError = throwError
    document.createElement = createElement
  })

  it('Does not have mediaDevices', () => {
    STUBS.mediaDevices.unsupport()
    Handsfree.prototype.throwError = jest.fn()
    Handsfree.prototype.checkForMediaSupport()

    expect(Handsfree.prototype.throwError).toHaveBeenCalled()
    Handsfree.prototype.throwError = throwError
    STUBS.mediaDevices.support()
  })
})

describe('Handsfree.throwError()', () => {
  it('Throws an error', () => {
    const message = 'Handsfree error thrown'
    const err = console.error
    console.error = jest.fn()
    
    try {
      Handsfree.prototype.throwError(message)
    } catch (e) {
      expect(message).toBe(e.message)
      console.error = err
    } 
  })
})
