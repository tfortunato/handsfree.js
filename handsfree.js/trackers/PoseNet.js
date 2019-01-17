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
 * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
 */
const PoseNet = require('../../public/lib/posenet.min')
const worker = new Worker('/workers/posenet.js')

module.exports = Handsfree => {
  /**
   * Initializes PoseNet and starts the tracking loop:
   * - Loads the model from Google's servers based on the chosen PoseNet modifier
   * - Tells the web worker to prepare an offcanvas
   */
  Handsfree.prototype.initPoseNet = async function () {
    worker.postMessage({
      action: 'createOffCanvas',
      settings: this.settings
    })    
    worker.onmessage = ev => this.onPosenetWorker(ev)
  }

  /**
   * Called when posenet finishes inference
   * @param {Object} ev The postMessage event from the worker
   */
  Handsfree.prototype.onPosenetWorker = function (ev) {
    switch (ev.data.action) {
      case 'posenetReady':
        this.tracker.posenet.isReady = true;
      break

      case 'posenetTracked':
        ev.data.poses.forEach((pose, i) => {
          if (i < ev.data.poses.length) {
            this.pose[i].body = ev.data.poses[i]
          }
        })
      break
    }
  }

  /**
   * Track heads and debug if needed
   */
  Handsfree.prototype.trackHeads = function () {
    worker.postMessage({
      action: 'trackHeads',
      pixels: this.debug.$canvas.getContext('2d').getImageData(0, 0, this.debug.$canvas.width, this.debug.$canvas.height)
    })
    // Only draw when debug is on
    // this.debug.isDebugging && poses && this.debugPoses()
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