/**
 * Handsfree.prototype.injectCursor
 */
describe('Handsfree.prototype.injectCursor', () => {
  it('adds cursor element to dashboard', () => {
    expect(document.querySelector('.handsfree-cursor')).toBeFalsy()
    const handsfree = new Handsfree()
    handsfree._injectCursor()
    expect(document.querySelector('.handsfree-cursor')).toBeTruthy()
  })

  it('calculates X/Y', () => {
    const handsfree = new Handsfree()
    handsfree.brf = {sdk: {BRFState: {FACE_TRACKING: -1}}}
    handsfree._injectCursor()

    // Test looking straight ahead
    handsfree.faces = [{
      rotationX: 0,
      rotationY: 0
    }]
    handsfree._calculateXY()
    expect(handsfree.faces[0].cursor).toEqual({x: window.innerWidth / 2, y: window.innerHeight / 2})
  })
})