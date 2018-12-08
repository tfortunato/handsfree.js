/**
 * This is the main entry point for Handsfree.js
 * - This be defined after the body class, or with script[defer]
 */
const pkg = require('../package.json')
const {trimStart, merge} = require('lodash')
const {TweenMax} = require('gsap')
const defaultSettings = require('./config/default-settings')

class Handsfree {
  constructor (opts = {}) {
    // Flags
    this.isTracking = false
    this.isSupported = false
    this.isWASMSupported = typeof WebAssembly === 'object'

    // The collection of plugins by name
    this.plugin = {}

    // Settings
    opts.settings = opts.settings || {}
    this.settings = merge(defaultSettings, opts.settings)

    // Properties
    // @see this.injectDebugger
    this.debug = {
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

    // BRFv4 config
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

    // @FIXME we should add a cursor for every face
    this.cursor = {
      $el: null,
      x: -100,
      y: -100
    }

    // Contains all the tracked faces
    this.faces = null

    // Helper object to remove jittering
    this.tweenFaces = []

    // Apply config options
    this.opts = opts
    this.applyConfig(opts)

    // Error out if we don't have support
    this.checkForMediaSupport()

    // Inject elements
    this.injectDebugger()
    this.injectCursor()

    // Initialize and read the BRFv4 Web Assembly binoary into a buffer
    this.initAndMaybeReadWASMBinary()
    document.body.classList.add('handsfree-stopped')
  }

  /**
   * Starts the webcam stream
   */
  start () {
    this.toggleDebugger(this.opts.debug)
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
    }).catch((err) => this.throwError(err))
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
