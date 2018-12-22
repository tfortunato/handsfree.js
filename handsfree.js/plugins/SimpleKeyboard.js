/**
 * Adds a simple keyboard
 * - Use `handsfree.dispatch('SimpleKeyboard:injectKeyboard')` to re-render keyboard
 * - Keyboards are injected into `.handsfree-simple-keyboard`
 * - They are then given `.handsfree-simple-keyboard-rendered` to signal to CSS that it has a keyboard
 * - Adds `body.handsfree-simple-keyboard-is-visible` `on('SimpleKeyboard:show')`
 * 
 * @listens SimpleKeyboard:injectKeyboard Injects the keyboard into all .handsfree-simple-keyboard
 */
const Keyboard = require('simple-keyboard').default
require('simple-keyboard/build/css/index.css')

module.exports = {
  name: 'SimpleKeyboard',

  // Collection of keyboards
  keyboards: [],

  /**
   * Setup events
   * 
   * @param {Handsfree} handsfree The calling handsfree instance
   * @listens SimpleKeyboard:injectKeyboard
   */
  onUse (handsfree) {
    handsfree.on('SimpleKeyboard:injectKeyboard', () => this.injectKeyboard(this))
    handsfree.on('SimpleKeyboard:show', value => this.show(value))
    handsfree.on('SimpleKeyboard:hide', this.hide)
    handsfree.on('SimpleKeyboard:set', this.set)

    handsfree.dispatch('SimpleKeyboard:injectKeyboard')
    this.listenToFocusEvents()
  },

  /**
   * Shows the keyboard
   * - Adds `body.handsfree-simple-keyboard-is-visible`
   */
  show (value) {
    document.body.classList.add('handsfree-simple-keyboard-is-visible')
    this.set(value)
  },

  /**
   * Hides the keyboard
   * - Removes `body.handsfree-simple-keyboard-is-visible`
   */
  hide () {
    document.body.classList.remove('handsfree-simple-keyboard-is-visible')
  },

  /**
   * Sets the value of the keyboard
   */
  set (value) {
    this.keyboards.forEach(board => {
      board.keyboard.setInput(value)
      board.$input.value = value
    })
  },

  /**
   * Injects the keyboard
   * - Adds .handsfree-simple-keyboard-rendered to prevent duplicates
   */
  injectKeyboard (handsfree) {
    document.querySelectorAll('.handsfree-simple-keyboard:not(.handsfree-simple-keyboard-rendered)').forEach($el => {
      const $input = document.createElement('input')
      const $keyboard = document.createElement('div')
      $keyboard.classList.add('simple-keyboard')
      $input.classList.add('simple-keyboard-input')

      $el.appendChild($input)
      $el.appendChild($keyboard)
      $el.classList.add('handsfree-simple-keyboard-rendered')

      handsfree.keyboards.push({
        $input,
        $keyboard,
        keyboard: new Keyboard({
          onChange: input => {
            $input.value = input
          }
        })
      })
    })
  },

  /**
   * Adds event listeners to input focus events, to know when to trigger show/hide events
   */
  listenToFocusEvents () {
    document.addEventListener('focusin', ev => {
      const name = ev.target.nodeName
      const type = ev.target.type
      
      if (name === 'INPUT' && type === 'text' && !ev.target.classList.contains('simple-keyboard-input')) {
        this.show(ev.target.value)
      }
    })
  }
}
