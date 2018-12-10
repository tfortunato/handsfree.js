/**
 * Constructor
 * - Setup everything
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
 * - Start trackers, initializing them if needed
 * - Runs plugin .onStart()'s
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

  /**
   * onStart events should not be called on plugins that are already running
   * @see /test/mock-handsfree.js > Handsfree._mock
   */
  it('calls plugin onStart events only once', async () => {
    const handsfree = new Handsfree()
    handsfree._injectDebugger()
    Handsfree._mock.restore(handsfree, 'onStartHooks')
    Handsfree._mock.plugins(handsfree)
    await handsfree._start()

    expect(Handsfree._mock.spy.onStart).toBe(2)
  })
})

/**
 * Stop Webcam
 * - Run all plugin hooks
 */
describe('Handsfree.prototype.stop', () => {
  it('sets up body classes', () => {
    const handsfree = new Handsfree()
    document.body.classList.remove('handsfree-stopped')
    document.body.classList.add('handsfree-started')
    handsfree._stop()

    expect(document.body.classList).toContain('handsfree-stopped')
    expect(document.body.classList).not.toContain('handsfree-started')
  })

  it('runs plugin onStopHooks', () => {
    const handsfree = new Handsfree()
    handsfree._injectDebugger()
    Handsfree._mock.restore(handsfree, 'onStopHooks')
    Handsfree._mock.plugins(handsfree)
    handsfree.debug.$webcam.srcObject = {getTracks: () => []}

    handsfree.isTracking = false
    handsfree._stop()
    expect(Handsfree._mock.spy.onStop).toBe(0)

    handsfree.isTracking = true
    handsfree._stop()
    expect(Handsfree._mock.spy.onStop).toBe(1)
  })
})