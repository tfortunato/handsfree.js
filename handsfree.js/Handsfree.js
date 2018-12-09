/**
 * 🔮 Handsfree.js 🔮
 * 
 * - This is what you get when you require('handsfree')
 * - When called as a <script>, you'll get a global `Handsfree`
 */
class Handsfree {
  constructor (opts = {}) {
    /**
     * An array containing a pose object for every tracked person
     * @todo Rename this to this.pose.face
     */
    this.faces = null

    /**
     * Your settings
     * - This really just acts as a namespace for plugins to pull settings from
     * - To set a setting during instantiation, use:
     *    const handsfree = new Handsfree({setting: {mySetting: value}})
     */
    this.opts = opts
    opts.settings = opts.settings || {}
    this.settings = merge(defaultSettings, opts.settings)

    /**
     * This will store all the plugins by name: handsfree.use({name: 'myPlugin})
     * - Adds it in here as: handsfree.plugin{myPlugin: {...}}
     * - And if you need to acess a plugin, just use: handsfree.plugin[pluginName]
     */
    this.plugin = {}

    /**
     * Contains the state of the core debugger, which includes:
     * - <div> container with
     * -- a <video> to grab the webcam stream from
     * -- a <canvas> to draw debug info on
     */
    this.debug = {
      // Whether to show the core debugger (true) or not (false)
      isEnabled: !!opts.debug,
      // Whether we're actually debugging or not
      isDebugging: false,
      // The webcam stream
      $webcam: null,
      // The canvas to display debug info on
      $canvas: null,
      // The canvas context
      ctx: null,
      // The wrapping element
      $wrap: null
    }

    /**
     * Configs for BRFv4
     * @see https://github.com/Tastenkunst/brfv4_javascript_examples
     */
    this.brf = {
      // Will fallback to ASM if Web ASM isn't supported
      baseURL: `${Handsfree.libPath}brf/`,
      // The BRFv4 Manager
      manager: {},
      // The BRFv4 Resolution
      resolution: null,
      // The loaded BRFv4 sdk library
      sdk: null,
      // The SDK version we're using
      sdkName: 'BRFv4_JS_TK110718_v4.1.0_trial',
      // The Web ASM buffer
      WASMBuffer: null
    }

    /**
     * Cursor properties
     * @todo This should be an array for multi-user support
     */
    this.cursor = {
      // Position on window
      x: -100,
      y: -100,
      // The actual cursor element
      $el: null
    }
    // Helper object to remove jittering
    this.tweenFaces = []

    // True when webcam stream is set and poses are being tracked
    // - this.isTracking && requestAnimationFrame(Handsfree.trackFaces())
    this.isTracking = false
    // Whether Web Assembly is supported
    this.isWASMSupported = typeof WebAssembly === 'object'
    // Whether handsfree is supported
    this.isSupported = this.checkForMediaSupport()

    /**
     * Initialize the instance
     * Let the browser know that we've finished instantiated
     */
    this.init()
    document.body.classList.add('handsfree-stopped')
    window.dispatchEvent(new CustomEvent('handsfree:instantiated', opts))
  }

  /**
   * Starts the webcam stream
   */
  start () {
    this.toggleDebugger(this.debug.isEnabled)
    document.body.classList.add('handsfree-started')
    document.body.classList.remove('handsfree-stopped')
    window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 0}}))

    window.navigator.mediaDevices.getUserMedia(this.settings.webcam).then(mediaStream => {
      this.debug.$webcam.srcObject = mediaStream
      this.debug.$webcam.play()
      this.onStartHooks()

      if (!this.brf.sdk) {
        window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 10}}))
        this.startBRFv4()
      } else {
        window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 100}}))
        this.isTracking = true
        this.brf.manager.setNumFacesToTrack(this.settings.maxFaces)
        this.trackFaces()
      }
    })
  }

  /**
   * Stop tracking and release webcam streams
   */
  stop () {
    document.body.classList.remove('handsfree-started')
    document.body.classList.add('handsfree-stopped')

    if (this.isTracking) {
      this.isTracking = false
      this.debug.$webcam.srcObject.getTracks().forEach(track => track.stop())
      this.toggleDebugger(false)
      this.onStopHooks()
    }
  }

  /**
   * Tracks faces
   */
  trackFaces () {
    const ctx = this.debug.ctx
    const resolution = this.brf.resolution

    // mirrors the context
    ctx.drawImage(this.debug.$webcam, 0, 0, resolution.width, resolution.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    // Get faces
    this.brf.manager.update(ctx.getImageData(0, 0, resolution.width, resolution.height).data)
    this.faces = this.brf.manager.getFaces()

    // Do things with faces
    this.debug.isDebugging && this.drawFaces()
    this.calculateXY()
    this.setTouchedElement()
    this.onFrameHooks(this.faces)

    // Dispatch global event
    window.dispatchEvent(new CustomEvent('handsfree-trackFaces', {detail: {
      scope: this,
      faces: this.faces
    }}))

    // Only loop if we're tracking
    this.isTracking && requestAnimationFrame(() => this.trackFaces())
  }

  /**
   * Returns the element under the face and stores it as face.$target
   */
  setTouchedElement () {
    this.faces.forEach((face, i) => {
      this.faces[i].cursor.$target = document.elementFromPoint(face.cursor.x, face.cursor.y)
    })
  }
}

/**
 * Configs
 * @todo make use of environment variables too
 */
const defaultSettings = require('./config/default-settings')
const pkg = require('../package.json')

// Dependencies
const {trimStart, merge} = require('lodash')

// Add class to body to style loading
document.body.classList.add('handsfree-is-loading')

// Set the lib path to whereever this file is, this is required for loading the BRFv4 SDK
Handsfree.libPath = trimStart(document.currentScript.getAttribute('src').replace('handsfree.js', ''), '/')
Handsfree.version = pkg.version

// Remember: to kick things off you'll want to instantiate this with `new`
require('./Setup')(Handsfree)
require('./Util')(Handsfree)
require('./Debug')(Handsfree)
require('./Plugin')(Handsfree)
require('./components/Cursor')(Handsfree)
module.exports = Handsfree
