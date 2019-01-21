/**
 *                                   .o o.
 *          ✨	                        o
 *           (\.   \      ,/)       __|__	 o
 *            \(   |\     )/       /  |  \/
 *            //\  | \   /\\       \ _=_
 *           (/ /\_#👓#_/\ \)      o|  | 
 *             \/\  ####  /\/        o  o
 *                  `##'            |  |
 *                                  L  L
 *         
 *           🔮 public/workers/posenet.js 🔮
 * 
 * @description A webworker that handles inference for PoseNet
 * @see /handsfree.js/trackers/PoseNet.js
 */

/**
 * Delegate actions to one of the worker methods
 */
onmessage = function (ev) {
  worker[ev.data.action](ev)
}

/**
 * @prop {Object}  settings References handsfree.settings
 * @prop {Canvas}  $canvas  The offscreen canvas used for inference
 * @prop {PoseNet} posenet  The loaded posenet model
 */
const worker = {
  // handsfree.settings.tracker.posenet.worker[id]
  id: 0,
  // Used for artificially throttling on the client and here
  isReady: true,
  // handsfree.settings
  settings: null,
  
  /**
   * Creates an offcanvas for inference
   * - Tells client to set handsfree.trackers.posenet.isReady to true
   */
  setup: async function (ev) {
    this.settings = ev.data.settings
    this.id = ev.data.id

    // eslint-disable-next-line
    if (!this.posenet) this.posenet = await posenet.load(this.settings.tracker.posenet.multiplier)
    postMessage({action: 'posenetReady', id: this.id})
  },

  /**
   * Track Bodies
   */
  trackBody: async function (ev) {
    if (this.isReady) {
      let poses = []
  
      // Get single pose
      this.isReady = false
      if (this.settings.maxPoses === 1) {
        let pose = await this.posenet.estimateSinglePose(
          ev.data.pixels,
          this.settings.imageScaleFactor,
          false,
          this.settings.outputStride)
        poses = [pose]
      // Get multiple poses
      } else {
        poses = await this.posenet.estimateMultiplePoses(
          ev.data.pixels, this.settings.imageScaleFactor, false, this.settings.outputStride,
          this.settings.maxPoses, this.settings.scoreThreshold, this.settings.nmsRadius)
      }
    
      // Set poses
      this.isReady = true
      postMessage({action: 'posenetTracked', poses, id: this.id})
    }
  }
}