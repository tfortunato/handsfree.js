/**                              
 *                                    ....,       ,....
 *          ✨	                    .' ,,, '.   .' ,,, '.
 *           (\.   \      ,/)        .`   `.     .`   `.
 *            \(   |\     )/       : ..... :   : ..... :
 *            //\  | \   /\\          ```   ___   ```
 *           (/ /\_#👓#_/\ \)             ( . . )
 *             \/\  ####  /\/      
 *                  `##'                `.~~~~~~~.`
 *                                        `-...-`
 *         
 *             🔮 handsfree.js/trackers/BRFv4.js 🔮
 * 
 * @description A webworker that handles inference for BRF
 * @see /handsfree.js/trackers/BRF.js
 */
 
/**
 * Delegate actions to one of the worker methods
 */
onmessage = function (ev) {
  worker[ev.data.action](ev)
}

const worker = {
  // handsfree.settings.tracker.posenet.worker[id]
  id: 0,
  // Used for artificially throttling on the client and here
  isReady: true,
  // handsfree.settings
  settings: null,
  // handsfree.brf
  brf: null,
  // The domain of the calling script
  libDomain: '',
  // Canvas dimensions
  canvas: {width: 0, height: 0},

  /**
   * Creates an offcanvas for inference
   * - Tells client to set handsfree.trackers.posenet.isReady to true
   */
  setup: async function (ev) {
    this.libDomain = ev.data.libDomain
    this.brf = ev.data.brf
    this.settings = ev.data.settings
    this.id = ev.data.id

    let xhr = new XMLHttpRequest()
    let url = this.brf.baseURL + this.brf.sdkName + '.wasm'
    let onError = err => this.throwError(err)
    let onProgress = () => {
      // postMessage({action: 'loading', progress, id: this.id})
      // window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: progress.loaded / progress.total * 100}}))
    }

    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 0 && xhr.response) {
        this.brf.WASMBuffer = xhr.response
        postMessage({action: 'brfOnLoad', id: this.id})
      } else {
        onError()
      }
      postMessage({action: 'onReadyHook', id: this.id})
    }
    xhr.onerror = onError
    xhr.onprogress = onProgress
    xhr.send(null)
  },

  /**
   * Track Faces
   */
  trackFaces: async function (ev) {
    if (this.isReady) {
      let poses = []
      this.isReady = false
      await this.brf.manager.update(ev.data.pixels)
      this.isReady = true
      postMessage({action: 'brfTracked', poses, id: this.id})
    }
  },

  /**
   * Wait for the BRFv4 SDK to finish loading before initializing it
   */
  waitForBRFSDK: async function () {
    // Set up the namespace and initialize BRFv4.
    // locateFile tells the asm.js version where to find the .mem file.
    // wasmBinary gets the preloaded .wasm file.
    if (!this.brf.sdk) {
      this.brf.sdk = {
        locateFile: fileName => this.brf.baseURL + fileName,
        wasmBinary: this.brf.WASMBuffer
      }
      module.exports(this.brf.sdk)
    }

    if (this.brf.sdk && this.brf.sdk.sdkReady) {
      this.initBRFSDK()
    } else {
      // @TODO let's optimize this wait time
      setTimeout(() => this.waitForBRFSDK(), 250)
    }
  },

  /**
   * initBRFSDK
   */
  initBRFSDK: function () {
    this.brf.resolution = new this.brf.sdk.Rectangle(0, 0, this.canvas.width, this.canvas.height)
    this.brf.manager = new this.brf.sdk.BRFManager()
    this.brf.manager.init(this.brf.resolution, this.brf.resolution, 'js.handsfree')
    this.brf.manager.setNumFacesToTrack(this.settings.maxPoses)

    postMessage({action: 'initSDK', id: this.id})
  }
}