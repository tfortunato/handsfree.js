/**
 * Adds a simple keyboard
 * @todo This plugin needs work...it's not actually a plugin!
 */
const Keyboard = require('simple-keyboard').default
require('simple-keyboard/build/css/index.css')

/**
 * Look for all "handsfree-simple-keyboard" and generate an input and keyboard div
 */
document.querySelectorAll('.handsfree-simple-keyboard').forEach($el => {
  const $input = document.createElement('input')
  const $keyboard = document.createElement('div')
  $keyboard.classList.add('simple-keyboard')

  $el.appendChild($input)
  $el.appendChild($keyboard)

  new Keyboard({
    onChange: input => {
      $input.value = input
    }
  })
})

module.exports = {}
