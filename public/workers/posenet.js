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
  console.log('onmessage')
  worker[ev.data.action](ev)
}

/**
 * @prop {Object}  settings References handsfree.settings
 * @prop {Canvas}  $canvas  The offscreen canvas used for inference
 * @prop {PoseNet} posenet  The loaded posenet model
 */
const worker = {
  // Whether we're ready to run inference
  isReady: true,
  
  /**
   * Creates an offcanvas for inference
   * - Tells client to set handsfree.trackers.posenet.isReady to true
   */
  createOffCanvas: async function (ev) {
    this.settings = ev.data.settings
    this.$canvas = new OffscreenCanvas(this.settings.webcam.video.width, this.settings.webcam.video.height)
    // eslint-disable-next-line
    if (!this.posenet) this.posenet = await posenet.load(this.settings.tracker.posenet.multiplier)
    postMessage({action: 'posenetReady'})
  },

  /**
   * Track Heads
   * - Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   *
   * @param {Null|Array} poses Either null to estimate poses, or an array of poses to track
   */
  trackHeads: async function (ev) {
    console.log('trackHeads', this, this.isReady)
    if (this.isReady) {
      let poses = []
      console.log('TRACK')
  
      // Get single pose
      this.isReady = false
      if (this.settings.maxPoses === 1) {
        let pose = await this.posenet.estimateSinglePose(
          ev.data.pixels,
          this.settings.imageScaleFactor,
          true,
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
      postMessage({action: 'posenetTracked', poses})
    }
  }
}