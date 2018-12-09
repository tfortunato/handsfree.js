/**
 * Constructor
 */
describe('Handsfree Constructor', () => {
  /**
   * - Let's add .handsfree-stopped to the body once we're instantiated for CSS
   * - Let's emit an event for better 3rd party integration
   */
  it('sets body class after instantiation and emits handsfree:instantiated', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:instantiated', cb)
    document.body.classList.remove('handsfree-stopped')
    
    new Handsfree()
    expect(document.body.classList).toContain('handsfree-stopped')
    expect(cb).toHaveBeenCalled()

    window.removeEventListener('handsfree:instantiated', cb)
  })
})

/**
 * Handsfree.prototype.start
 */
describe('Handsfree.prototype.start', () => {
  /**
   * - Let's notify the client that handsfree is loading for CSS and events
   */
  it('sets body classes and emmits handsfree:loading', async () => {
    document.body.classList.remove('handsfree-started')
    document.body.classList.add('handsfree-stopped')
    let progress = -1
    const cb = ev => {progress = ev.detail.progress}
    window.addEventListener('handsfree:loading', cb)
    
    const handsfree = new Handsfree()
    handsfree._injectDebugger()

    await handsfree._start()
    expect(document.body.classList).toContain('handsfree-started')
    expect(document.body.classList).not.toContain('handsfree-stopped')
    expect(progress).not.toBe(-1)

    window.removeEventListener('handsfree:loading', cb)
  })

  /**
   * - If BRFv4 hasn't loaded then load it
   * - If BRFv4 has loaded then start tracking
   */
  it('Starts tracking when brfv4 is already setup', async () => {
    let progress = -1
    const cb = ev => {progress = ev.detail.progress}
    window.addEventListener('handsfree:loading', cb)

    const handsfree = new Handsfree()
    handsfree._injectDebugger()
    handsfree.brf.sdk = true
    handsfree.brf.manager = {setNumFacesToTrack: jest.fn()}

    await handsfree._start()
    expect(progress).not.toBe(-1)
    window.removeEventListener('handsfree:loading', cb)
  })
})