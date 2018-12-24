/**
 * - Restores: .on, .dispatch
 * - Fast forward to plugin onUse()
 * - Adds a fake $target input
 */
beforeEach(() => {
  // Fresh testing components
  handsfree = new Handsfree()
  plugin = Plugin

  // Add fake $target
  $target = document.createElement('input')
  $target.setAttribute('type', 'text')
  document.body.appendChild($target)
  plugin.$target = $target

  // Fake click event
  clickEvent = new MouseEvent('click', {
    target: $target    
  })

  // Restore methods and fast forward
  Handsfree._mock.restore(handsfree, 'on')
  Handsfree._mock.restore(handsfree, 'dispatch')
  handsfree._use(plugin)
  plugin.$handsfree = handsfree
  jest.runAllTimers()
})

/**
 * SimpleKeyboard.onUse
 * - The `handsfree:SimpleKeyboard:injectKeyboard` event is important for developers
 */
describe('SimpleKeyboard.onUse', () => {
  it('dispatches SimpleKeyboard:injectKeyboard', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:SimpleKeyboard:injectKeyboard', cb)

    plugin.onUse()
    expect(cb).toHaveBeenCalled()
  })
})

/**
 * SimpleKeyboard.show
 * - Triggered via `$handsfree.on('SimpleKeyboard:show')`
 */
describe('SimpleKeyboard.show', () => {
  it('adds body class and sets text to match target input', () => {
    $target.value = 'hello motto'
    handsfree.dispatch('SimpleKeyboard:show')

    expect(document.body.classList).toContain('handsfree-simple-keyboard-is-visible')
    expect(plugin.$target.value).toBe('hello motto')
  })
})

describe('SimpleKeyboard.hide', () => {
  it('removes keyboard visible body class', () => {})
})

describe('SimpleKeyboard.set', () => {
  it('Sets the input and dispatches event', () => {})
})

describe('SimpleKeyboard.injectKeyboard', () => {
  it('only injects keyboard to containers without keyboards already', () => {})
  it('closes keyboard when {enter} is pressed', () => {})
  it('updates values on key press', () => {})
})

describe('SimpleKeyboard.listenToFocusEvents', () => {
  it('responds to click and focusin events', () => {})
  it('affects input[type="text"]', () => {})
})

// Spare parts
jest.useFakeTimers()
jest.mock('simple-keyboard')
const Plugin = require('./SimpleKeyboard')
let handsfree
let plugin
let $target
let clickEvent