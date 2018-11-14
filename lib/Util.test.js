const STUBS = require('../test/jest-polyfills')
const Handsfree = require('./Handsfree')
let handsfree = null
let faces = require('../src/store/faces/oz-winky-face.json')
STUBS.mediaDevices.support()

describe('Handsfree.throwError()', () => {
  it('Throws an error', () => {
    handsfree = new Handsfree({debug: true})
    STUBS.mediaDevices.unsupport()
    expect(handsfree.checkForMediaSupport).toThrow(Error)
  })
})
