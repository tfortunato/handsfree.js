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
 *          🔮 handsfree.js/trackers/PoseNet.js 🔮
 * 
 * @description Loads a full body pose estimator into `handsfree.trackers.posenet`
 * and populates:
 * - `handsfree.pose[].body`
 * 
 * @see /public/workers/posenet.js
 * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
 */
const PoseNet = require('@tensorflow-models/posenet')

module.exports = Handsfree => {
  /**
   * Initializes PoseNet
   * - Within a web worker if `this.settings.tracker.posenet.useWithWorker`
   */
  Handsfree.prototype.initPoseNet = async function () {
    if (!this.tracker.posenet.isLoading) {
      this.tracker.posenet.isLoading = true
      this.tracker.posenet.isReady = false
      this.tracker.posenet.model = await PoseNet.load(this.settings.tracker.posenet.multiplier)
      this.tracker.posenet.isLoading = false
      this.tracker.posenet.isReady = true
    }
  }
  
  /**
   * Toggles PoseNet on/off
   * - Also initializes posenet for the first time if it hasn't yet
   * 
   * @param {Boolean|Null} state Toggle the PoseNet tracker on (true), off (false), or flip it (pass nothing)
   */
  Handsfree.prototype.toggleBodyTracker = function (state) {
    if (typeof state === 'boolean') {
      this.tracker.posenet._isDisabled = state
    } else {
      this.tracker.posenet._isDisabled = !this.tracker.posenet._isDisabled
    }

    // Initialize posenet if it hasn'et been yet
    !this.tracker.posenet._isDisabled && !this.tracker.posenet.isReady && this.initPoseNet()
  }

  /**
   * Infer with PoseNet within the main thread
   */
  Handsfree.prototype.trackBody = async function () {
    let poses = []
    
    // Get single pose
    if (this.settings.maxPoses === 1) {
      let pose = await this.tracker.posenet.model.estimateSinglePose(this.debug.$webcam, this.settings.tracker.posenet.imageScaleFactor, false, this.settings.tracker.posenet.outputStride)
      poses = [pose]
      // Get multiple poses
    } else {
      poses = await this.tracker.posenet.model.estimateMultiplePoses(
        this.debug.$webcam, this.settings.tracker.posenet.imageScaleFactor, false, this.settings.tracker.posenet.outputStride,
        this.settings.maxPoses, this.settings.tracker.posenet.scoreThreshold, this.settings.tracker.posenet.nmsRadius)
    }

    this.pose.forEach((pose, i) => {pose.body = poses[i]})
  }

  /**
   * Loops through each pose and draws their keypoints/skeletons
   * - Draws skeletons and keypoints
   */
  Handsfree.prototype.debugPoseNetPoses = function () {
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
    const scale = this.settings.tracker.posenet.useWithWorker ? 1 : 0.5

    keypoints.forEach(({position, score}) => {
      if (score > minConfidence) {
        context.beginPath()
        context.arc(position.x * scale, position.y * scale, 15, 0, 2 * Math.PI)
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
    const scale = this.settings.tracker.posenet.useWithWorker ? 1 : 0.5

    context.beginPath()
    context.moveTo(ax * scale, ay * scale)
    context.lineTo(bx * scale, by * scale)
    context.lineWidth = 10
    context.strokeStyle = '#ff00ff'
    context.stroke()
  }
}