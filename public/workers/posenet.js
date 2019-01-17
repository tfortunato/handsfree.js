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
process = self
importScripts('/lib/tf.min.js')
importScripts('/lib/posenet.min.js')

/**
 * Delegate actions to one of the worker methods
 */
onmessage = function (ev) {worker[ev.data.action](ev)}

/**
 * @prop {Object}  settings References handsfree.settings
 * @prop {Canvas}  $canvas  The offscreen canvas used for inference
 * @prop {PoseNet} posenet  The loaded posenet model
 */
const worker = {
  /**
   * Creates an offcanvas for inference
   * - Tells client to set handsfree.trackers.posenet.isReady to true
   */
  createOffCanvas (ev) {
    this.settings = ev.data.settings
    this.$canvas = new OffscreenCanvas(this.settings.webcam.video.width, this.settings.webcam.video.height)
    if (!this.posenet) this.posenet = posenet.load(this.settings.tracker.posenet.multiplier)
    postMessage({action: 'posenetReady'})
  },

  /**
   * Track Heads
   * - Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   *
   * @param {Null|Array} poses Either null to estimate poses, or an array of poses to track
   */
  trackHeads (ev) {
    console.log('trackHead')
    const settings = ev.data.settings
    let poses = []
    
    // Get single pose
    if (this.settings.maxPoses === 1) {
      let pose = this.posenet.estimateSinglePose(
        this.debug.$webcam,
        settings.imageScaleFactor,
        true,
        settings.outputStride)
      poses = [pose]
    // Get multiple poses
    } else {
      poses = this.posenet.estimateMultiplePoses(
        this.debug.$webcam, settings.imageScaleFactor, false, settings.outputStride,
        settings.maxPoses, settings.scoreThreshold, settings.nmsRadius)
    }
  
    // Set poses
    this.pose.forEach((pose, i) => {
      if (i < poses.length) {
        this.pose[i].body = poses[i]
      }
    })
  }
}