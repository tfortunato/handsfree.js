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
})