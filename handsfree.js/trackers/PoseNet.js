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
 * This file also:
 * - Runs inference inside a worker
 * 
 * @see /public/workers/posenet.js
 * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
 */
const {throttle} = require('lodash')
const PoseNet = require('../../public/lib/posenet.min')

module.exports = Handsfree => {
  /**
   * Initializes PoseNet
   * - Within a web worker if `this.settings.tracker.posenet.useWithWorker`
   */
  Handsfree.prototype.initPoseNet = function () {
    if (this.settings.tracker.posenet.useWithWorker)
      this.initPoseNetWorker()
    else
      this.initPosenetMainThread()
  }
  
  /**
   * Initializes PoseNet within a worker and starts the tracking loop:
   * - Loads the model from Google's servers based on the chosen PoseNet modifier
   * - Tells the web worker to prepare an offcanvas
   */
  Handsfree.prototype.initPoseNetWorker = function () {
    // Adds inline scripts inside `/public/lib`
    let fileHeader = `
      // eslint-disable-next-line
      process = self;
      // eslint-disable-next-line
      importScripts('${Handsfree.libDomain}/lib/tf.min.js');
      // eslint-disable-next-line
      importScripts('${Handsfree.libDomain}/lib/posenet.min.js');`
    let blob = new Blob([fileHeader + require('raw-loader!../../public/workers/posenet.js')])

    // Create workers
    for (let i = 0; i < this.settings.tracker.posenet.workers; i++) {
      this.tracker.posenet.workers.push({
        worker: new Worker(URL.createObjectURL(blob)),
        isReady: false
      })

      const webworker = this.tracker.posenet.workers[i]
      webworker.worker.postMessage({
        action: 'setup',
        id: i,
        settings: this.settings
      })    
      webworker.worker.onmessage = ev => this.onPosenetWorker(ev)
    }
  }

  /**
   * Initializes PoseNet within the main thread
   */
  Handsfree.prototype.initPosenetMainThread = async function () {
    this.tracker.posenet.model = await PoseNet.load(this.settings.tracker.posenet.multiplier)
    this.tracker.posenet.isReady = true
  }

  /**
   * Called when posenet finishes inference
   * @param {Object} ev The postMessage event from the worker
   */
  Handsfree.prototype.onPosenetWorker = function (ev) {
    // @todo let's clean this up by using named functions (ie, this[`posenet${action}`])
    switch (ev.data.action) {
      case 'posenetReady':
        this.tracker.posenet.isReady = true
        this.tracker.posenet.workers[ev.data.id].isReady = true
      break

      case 'posenetTracked':
        this.onPoseNetTracked(ev)
      break
    }
  }

  /**
   * Handles receiving the posenet results from the web worker
   * - Enables `this.tracker.posenet.worker[ev.data.id]`
   */
  Handsfree.prototype.onPoseNetTracked = function (ev) {
    this.tracker.posenet.workers[ev.data.id].isReady = true
    this.poseCache.body = ev.data.poses
  }

  /**
   * Toggles PoseNet on/off
   * - Also initializes posenet for the first time if it hasn't yet
   * 
   * @param {Boolean|Null} state Toggle the PoseNet tracker on (true), off (false), or flip it (pass nothing)
   */
  Handsfree.prototype.togglePoseNet = function (state) {
    if (typeof state === 'boolean') {
      this.tracker.posenet._isDisabled = state
    } else {
      this.tracker.posenet._isDisabled = !this.tracker.posenet._isDisabled
    }

    // Initialize posenet if it hasn'et been yet
    !this.tracker.posenet._isDisabled && !this.tracker.posenet.isReady && this.initPoseNetWorker()
  }

  /**
   * Track heads and debug if needed
   * - Chooses from the next available worker
   * - Disables `this.tracker.posenet.worker[workerId]`
   * 
   * @param {Number} workerId The worker ID to infer inside of
   */
  Handsfree.prototype.trackHeads = function () {
    if (this.settings.tracker.posenet.useWithWorker) 
      this.trackHeadsWithWorker()
    else
      this.trackHeadsInMain()
  }
  
  /**
   * Infer with PoseNet within a worker
   */
  Handsfree.prototype.trackHeadsWithWorker = throttle(function () {
    // Post to the first available worker
    this.tracker.posenet.workers.some(webworker => {
      if (webworker.isReady) {
        webworker.isReady = false
        webworker.worker.postMessage({
          action: 'trackHeads',
          pixels: this.debug.$canvas.getContext('2d').getImageData(0, 0, this.debug.$canvas.width, this.debug.$canvas.height)
        })
        return true
      }
    })
  }, 1000 / 2)

  /**
   * Infer with PoseNet within the main thread
   */
  Handsfree.prototype.trackHeadsInMain = function () {
    console.log('tracking heads in main')
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