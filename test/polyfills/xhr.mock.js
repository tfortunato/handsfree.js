/**
 * To set these for a test, just do:
 *    global.XMLHttpRequest[propName] = newValue
 */
global.XMLHttpRequest = function () {
  this.status = 200
  this.response = true
  this.open = jest.fn()
  this.send = () => {
    this.onload()
    this.onprogress({loaded: 100, total: 100})
  }
}