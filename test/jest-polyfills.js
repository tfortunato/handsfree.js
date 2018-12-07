/**
 * Polyfills required for unit testing
 */

/**
 * Make sure document.elementFromPoint returns something
 */
Object.defineProperty(document, 'elementFromPoint', {
  value: function () { return {} }
})

// @FIXME get rid of this
// /**
//  * Catch window.alert
//  */
// window.alert = function () {}

// /**
//  * Suppress known error messages
//  */
// window.consoleError = console.error
// console.error = function (message, ...args) {
//   if (message.startsWith('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')
//     || message.startsWith('Unexpected character')
//     ) {
//     console.warning('Uncaught Error', ...args)
//   } else {
//     window.consoleError(message, ...args)
//   }
// }

// module.exports = {
//   mediaDevices: {
//     support () {
//       window.HTMLMediaElement.prototype.load = () => {}
//       window.HTMLMediaElement.prototype.play = () => {}
//       window.HTMLMediaElement.prototype.pause = () => {}
//       window.HTMLMediaElement.prototype.addTextTrack = () => {}
//       window.HTMLMediaElement.prototype.srcObject = {
//         getTracks: () => [{stop: jest.fn()}]
//       }
//       navigator.mediaDevices = {
//         getUserMedia: function () {
//           return {
//             then: function () {
//               return {
//                 catch: function () {}
//               }
//             }
//           }
//         }
//       }
//     },
//     unsupport () {navigator.mediaDevices = null}
//   },

//   WebGL: {
//     support () {window.WebGLRenderingContext = true},
//     unsupport () {window.WebGLRenderingContext = false}
//   }
// }
