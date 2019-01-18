const BRFvInitializer = require('../models/BRFv4_JS_TK110718_v4.1.0_trial.js')
const HandsfreePose = window.HandsfreePose = require('../Pose')

module.exports = Handsfree => {
  Handsfree.prototype.init = function () {
    // Inject elements
    this.injectDebugger()
    this.reservePoses()

    // Init trackers
    this.initAndMaybeReadWASMBinary()
    !this.tracker.posenet._isDisabled && this.initPoseNet()
  }
  
  /**
   * Reads the Web ASM Binary into a buffer if it's supported
   */
  Handsfree.prototype.initAndMaybeReadWASMBinary = function () {
    if (this.isWASMSupported) {
      let xhr = new XMLHttpRequest()
      let url = this.brf.baseURL + this.brf.sdkName + '.wasm'
      let onError = err => this.throwError(err)
      let onProgress = progress => {
        window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: progress.loaded / progress.total * 100}}))
      }

      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 0 && xhr.response) {
          this.brf.WASMBuffer = xhr.response
          this.loadPlugins()
        } else {
          onError()
        }
        this.onReadyHook()
      }
      xhr.onerror = onError
      xhr.onprogress = onProgress
      xhr.send(null)
    } else {
      this.throwError('ERROR: This browser does not support Web Assembly, please try another browser...like Google Chrome!')
    }
  }

  /**
   * Notifies the document that handsfree is ready
   * - Adds a body class
   * - useful for enabling .start() buttons
   */
  Handsfree.prototype.onReadyHook = function () {
    window.dispatchEvent(new CustomEvent('handsfree:ready'))
    document.body.classList.remove('handsfree-is-loading')
    document.body.classList.add('handsfree-ready')
  },
  
  /**
   * Actually starts BRFv4 (once stream dimensions are known)
   * @emits handsfree:loading
   */
  Handsfree.prototype.startBRFv4 = function () {
    const $webcam = this.debug.$webcam
    const $canvas = this.debug.$canvas

    if ($webcam.videoWidth === 0) {
      // @TODO let's optimize this wait time
      setTimeout(() => this.startBRFv4(), 50)
    } else {
      // Resize canvas to stream
      $canvas.width = $webcam.videoWidth
      $canvas.height = $webcam.videoHeight
      window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 20}}))      

      this.waitForSDK()
    }
  }

  /**
   * Wait for the BRFv4 SDK to finish loading before initializing it
   */
  Handsfree.prototype.waitForSDK = function () {
    // Set up the namespace and initialize BRFv4.
    // locateFile tells the asm.js version where to find the .mem file.
    // wasmBinary gets the preloaded .wasm file.
    if (this.brf.sdk === null) {
      this.brf.sdk = {
        locateFile: fileName => this.brf.baseURL + fileName,
        wasmBinary: this.brf.WASMBuffer
      }
      BRFvInitializer(this.brf.sdk)
      window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 30}}))
    }

    if (this.brf.sdk && this.brf.sdk.sdkReady) {
      this.initSDK()
    } else {
      // @TODO let's optimize this wait time
      setTimeout(() => this.waitForSDK(), 250)
    }
  }

  /**
   * Finally, let's initialize the SDK
   */
  Handsfree.prototype.initSDK = function () {
    this.brf.resolution = new this.brf.sdk.Rectangle(0, 0, this.debug.$canvas.width, this.debug.$canvas.height)
    this.brf.manager = new this.brf.sdk.BRFManager()
    this.brf.manager.init(this.brf.resolution, this.brf.resolution, 'js.handsfree')
    this.brf.manager.setNumFacesToTrack(this.settings.maxPoses)
    window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 100}}))

    this.isTracking = true
    this.trackPoses()
  }

  /**
   * Deletes all poses and creates a HandsfreePose object for .settings.maxPoses
   * - Also sets handsfree.cursor.$el
   */
  Handsfree.prototype.reservePoses = function () {
    this.pose = []
    for (let i = 0; i < this.settings.maxPoses; i++) {
      this.pose.push(new HandsfreePose())
    }
    this.cursor.$el = this.pose[0].$el
  }
}
