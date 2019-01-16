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
    if (!this.tracker.posenet.sdk) this.tracker.posenet.sdk = await PoseNet.load(this.settings.posenet.multiplier)
    console.log('ready')
  }
}