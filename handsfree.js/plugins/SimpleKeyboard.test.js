jest.useFakeTimers()
jest.mock('simple-keyboard')
const Plugin = require('./SimpleKeyboard')
let handsfree
let plugin

beforeEach(() => {
  handsfree = new Handsfree()
  plugin = Plugin

  Handsfree._mock.restore(handsfree, 'on')
  handsfree._use(plugin)
  plugin.$handsfree = handsfree
  jest.runAllTimers()
})

describe('SimpleKeyboard.onUse', () => {
  it('dispatches SimpleKeyboard:injectKeyboard', () => {
    const cb = jest.fn()
    window.addEventListener('handsfree:SimpleKeyboard:injectKeyboard', cb)
    Handsfree._mock.restore(handsfree, 'dispatch')

    plugin.onUse()
    expect(cb).toHaveBeenCalled()

    window.removeEventListener('handsfree:SimpleKeyboard:injectKeyboard', cb)
  })
})

describe('SimpleKeyboard.show', () => {
  it('adds body class and sets text to match target input', () => {})
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