/**
 * - Restores: .on, .dispatch
 * - Fast forward to plugin onUse()
 * - Adds a fake $target input
 */
beforeEach(() => {
  // Fresh testing components, mocking injectKeyboard
  handsfree = new Handsfree()
  plugin = cloneDeep(Plugin)
  plugin._injectKeyboard = plugin.injectKeyboard
  plugin.injectKeyboard = jest.fn()

  // Add fake $target
  $target = document.createElement('input')
  $target.setAttribute('type', 'text')
  document.body.appendChild($target)
  plugin.$target = $target

  // Create keyboard container
  const $containers = document.querySelectorAll('.handsfree-simple-keyboard') || []
  $containers.forEach(container => container.remove())
  
  // Restore methods (remember to ._use(plugin))
  Handsfree._mock.restore(handsfree, 'on')
  Handsfree._mock.restore(handsfree, 'dispatch')
  plugin = handsfree._use(plugin)
  jest.runAllTimers()  
})

/**
 * Turn off listeners
 */
afterEach(() => {handsfree._off()})

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

/**
 * SimpleKeyboard.hide
 * - Triggered via `$handsfree.on('SimpleKeyboard:hide')`
 */
describe('SimpleKeyboard.hide', () => {
  it('removes keyboard visible body class', () => {
    handsfree.dispatch('SimpleKeyboard:show')
    handsfree.dispatch('SimpleKeyboard:hide')

    expect(document.body.classList).not.toContain('handsfree-simple-keyboard-is-visible')
  })
})

/**
 * SimpleKeyboard.injectKeyboard
 * - Adds .handsfree-simple-keyboard-rendered to prevent duplicates
 */
describe('SimpleKeyboard.injectKeyboard', () => {
  beforeEach(() => {
    const $container = document.createElement('div')
    $container.classList.add('handsfree-simple-keyboard')
    document.body.appendChild($container)
    plugin.injectKeyboard = plugin._injectKeyboard
  })
  
  it('only injects keyboard to containers without keyboards already', () => {
    handsfree.dispatch('SimpleKeyboard:injectKeyboard')
    handsfree.dispatch('SimpleKeyboard:injectKeyboard')
    expect(document.querySelectorAll('.simple-keyboard').length).toBe(1)
  })

  it('closes keyboard when {enter} is pressed', () => {
    const cb = jest.fn()    
    window.addEventListener('handsfree:SimpleKeyboard:hide', cb)

    plugin.injectKeyboard()
    plugin.keyboards[0].keyboard.onKeyPress('a')
    expect(cb).not.toHaveBeenCalled()
    plugin.keyboards[0].keyboard.onKeyPress('{enter}')
    expect(cb).toHaveBeenCalled()

    window.removeEventListener('handsfree:SimpleKeyboard:hide', cb)
  })

  it('updates values on key press', () => {
    const cb = jest.fn()    
    window.addEventListener('handsfree:SimpleKeyboard:hide', cb)

    plugin.injectKeyboard()
    plugin.keyboards[0].keyboard.onChange('abc')
    expect(plugin.$target.value).toBe('abc')

    window.removeEventListener('handsfree:SimpleKeyboard:hide', cb)
  })
})

/**
 * SimpleKeyboard.set
 * - Triggered via `$handsfree.on('SimpleKeyboard:set')`
 */
describe('SimpleKeyboard.set', () => {
  it('Sets the input and dispatches event', () => {})
})

/**
 * SimpleKeyboard.listenToFocusEvents
 */
describe('SimpleKeyboard.listenToFocusEvents', () => {
  it('responds to click and focusin events', () => {})
  it('affects input[type="text"]', () => {})
})

// Spare parts
jest.useFakeTimers()
jest.mock('simple-keyboard')
const Plugin = require('./SimpleKeyboard')
const {cloneDeep} = require('lodash')
let handsfree
let plugin
let $target