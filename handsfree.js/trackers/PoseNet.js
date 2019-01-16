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
 *                🔮 trackers/PoseNet.js 🔮
 * 
 * @description Provides an API for interfacing with
 */
const PoseNet = require('@tensorflow-models/posenet')

module.exports = Handsfree => {
  /**
   * Initializes PoseNet and starts the tracking loop:
   * - Loads the model from Google's servers based on the chosen PoseNet modifier
   */
  Handsfree.prototype.initPoseNet = async function () {
    if (!this.tracker.posenet.sdk) this.tracker.posenet.sdk = await PoseNet.load(this.settings.tracker.posenet.multiplier)
  }

  /**
   * Track Heads
   * - Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   *
   * @param {Null|Array} poses Either null to estimate poses, or an array of poses to track
   */
  Handsfree.prototype.trackHeads = async function () {
    const posenet = this.tracker.posenet
    const settings = this.settings.tracker.posenet
    let poses = []
    
    // Get single pose
    if (this.settings.maxPoses === 1) {
      let pose = await posenet.sdk.estimateSinglePose(
        this.debug.$webcam,
        settings.imageScaleFactor,
        true,
        settings.outputStride)
      poses = [pose]
    // Get multiple poses
    } else {
      poses = await posenet.sdk.estimateMultiplePoses(
        this.debug.$webcam, settings.imageScaleFactor, false, settings.outputStride,
        settings.maxPoses, settings.scoreThreshold, settings.nmsRadius)
    }

    // Publicly set poses
    this.pose.body = poses
    console.log(poses)

    // // Only draw when debug is on
    // this.settings.debug.canvas.show && poses && this.debugPoses()    
  }
}