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
    if (!this.tracker.posenet.api) this.tracker.posenet.api = await PoseNet.load(this.settings.tracker.posenet.multiplier)
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
      let pose = await posenet.api.estimateSinglePose(
        this.debug.$webcam,
        settings.imageScaleFactor,
        true,
        settings.outputStride)
      poses = [pose]
    // Get multiple poses
    } else {
      poses = await posenet.api.estimateMultiplePoses(
        this.debug.$webcam, settings.imageScaleFactor, false, settings.outputStride,
        settings.maxPoses, settings.scoreThreshold, settings.nmsRadius)
    }

    // Set poses
    this.pose.forEach((pose, i) => {
      if (i < poses.length) {
        this.pose[i].body = poses[i]
      }
    })

    // Only draw when debug is on
    this.debug.isDebugging && poses && this.debugPoses()    
  }

  /**
   * Loops through each pose and draws their keypoints/skeletons
   * - Draws skeletons and keypoints
   */
  Handsfree.prototype.debugPoses = function () {
    const settings = this.settings.tracker.posenet
    
    this.pose.forEach(pose => {
      if (pose.body.score >= settings.minPoseConfidence) {
        const adjacentKeypoints = PoseNet.getAdjacentKeyPoints(pose.body.keypoints, settings.minPartConfidence, this.debug.ctx)

        this.drawPoseNetSkeleton(adjacentKeypoints, this.debug.ctx)
        this.drawPoseNetKeypoints(pose.body.keypoints, settings.minPartConfidence, this.debug.ctx)
      }
    })
  }

  /**
   * Draw each tracked keypoint
   * - Draws keypoints only when they are "visible"
   *
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * @param {ARR} keypoints The list of all keypoints
   * @param {NUM} minConfidence The minimum keypoint score needed to track
   * @param {OBJ} context The canvas context to draw into
   */
  Handsfree.prototype.drawPoseNetKeypoints = function (keypoints, minConfidence, context) {
    keypoints.forEach(({position, score}) => {
      if (score > minConfidence) {
        context.beginPath()
        context.arc(position.x, position.y, 15, 0, 2 * Math.PI)
        context.fillStyle = '#00ff00'
        context.fill()
      }
    })
  }

  /**
   * Draw each tracked skeleton
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * - Draws all visible segments captured with PoseNet.getAdjacentKeyPoints
   *
   * @param {ARR} adjacentPoints The list of all keypoints and their relationships
   * @param {OBJ} context The canvas context to draw into
   */
  Handsfree.prototype.drawPoseNetSkeleton = function (adjacentPoints, context) {
    adjacentPoints.forEach(keypoints => {
      this.drawSegment(this.toTuple(keypoints[0].position), this.toTuple(keypoints[1].position), context)
    })
  }

  /**
   * Draws the skeleton segment
   * - A segment is a straight line between two tuples
   *
   * @param {OBJ} fromTuple [ay, ax] The starting point
   * @param {OBJ} toTuple [by, bx] The ending point
   * @param {HEX} color The color to draw in
   * @param {OBJ} context The canvas context to draw in
   */
  Handsfree.prototype.drawSegment = function ([ay, ax], [by, bx], context) {
    const scale = 1

    context.beginPath()
    context.moveTo(ax * scale, ay * scale)
    context.lineTo(bx * scale, by * scale)
    context.lineWidth = 10
    context.strokeStyle = '#ff00ff'
    context.stroke()
  }
}