/**
 * Handsfree.prototype.injectDebugger
 */
describe('Handsfree.prototype.injectDebugger', () => {
  it('can create debug elements and dispatch event', () => {
    const handsfree = new Handsfree()
    const cb = jest.fn()
    window.addEventListener('handsfree-injectDebugger', cb)
    
    handsfree._injectDebugger()
    expect(document.querySelector('.handsfree-debugger')).toBeTruthy()
    expect(document.querySelector('.handsfree-webcam')).toBeTruthy()
    expect(document.querySelector('.handsfree-canvas')).toBeTruthy()
    expect(cb).toHaveBeenCalled()
  })

  it('injects debugger into correct place', () => {
    const handsfree = new Handsfree()
    let $debugger
    let $wrap

    handsfree._injectDebugger()
    $debugger = document.querySelector('body > .handsfree-debugger')
    expect($debugger).toBeTruthy()
    $debugger.remove()

    $wrap = document.createElement('div')
    $wrap.classList.add('handsfree-debug-wrap')
    document.body.appendChild($wrap)
    handsfree._injectDebugger()
    expect(document.querySelector('body > .handsfree-debugger')).toBeNull()
    expect(document.querySelector('body > .handsfree-debug-wrap > .handsfree-debugger')).toBeTruthy()
  })
})