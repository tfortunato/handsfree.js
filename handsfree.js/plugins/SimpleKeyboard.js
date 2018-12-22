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

  /**
   * @param {Handsfree} handsfree The calling handsfree instance
   * @listens SimpleKeyboard:injectKeyboard
   */
  onUse (handsfree) {
    handsfree.on('SimpleKeyboard:injectKeyboard', this.injectKeyboard)
    handsfree.on('SimpleKeyboard:show', this.show)
    handsfree.on('SimpleKeyboard:hide', this.hide)
    handsfree.dispatch('SimpleKeyboard:injectKeyboard')
  },

  /**
   * Shows the keyboard
   */
  show () {
    document.body.classList.add('handsfree-simple-keyboard-is-visible')
  },

  /**
   * Hides the keyboard
   */
  hide () {
    document.body.classList.remove('handsfree-simple-keyboard-is-visible')
  },

  /**
   * Injects the keyboard
   * - Adds .handsfree-simple-keyboard-rendered to prevent duplicates
   */
  injectKeyboard () {
    document.querySelectorAll('.handsfree-simple-keyboard:not(.handsfree-simple-keyboard-rendered)').forEach($el => {
      const $input = document.createElement('input')
      const $keyboard = document.createElement('div')
      $keyboard.classList.add('simple-keyboard')

      $el.appendChild($input)
      $el.appendChild($keyboard)
      $el.classList.add('handsfree-simple-keyboard-rendered')

      new Keyboard({
        onChange: input => {
          $input.value = input
        }
      })
    })
  }
}
