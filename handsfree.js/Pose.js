/**
 *                  _
 *       __________H||___________
 *      [|.......................|
 *      ||...✨.................|            @@@@
 *      ||.. (\.   \      ,/)....|          @@@@@@@
 *      ||...  \(   |\     )/....|   ,      - @@@@
 *      ||...  //\  | \   /\\....|   |     '_ @@@
 *      ||...(/ /\_#👓#_/\ \)...|   |     __\@ \@
 *      ||...  \/\  ####  /\/....|  _\\  (/ ) @\_/)____
 *      ||...      `##'      ....|   |(__/ /     /|% #/
 *      ||.......................|    \___/ ----/_|-#/
 *      ||.......................|       ,:   '(
 * 
 *                    🔮 /Pose.js 🔮
 * 
 * @description A class describing different poses.
 * Each pose has a:
 * - .$el: The pointer element
 */
class HandsfreePose {
  constructor () {
    /**
     * A BRFv4 tracked face
     * @see https://github.com/Tastenkunst/brfv4_javascript_examples/
     */
    this.face = null

    /**
     * Points to the most relevant cursor element
     */
    this.$el = null

    this.createPointer()
  }

  /**
   * Creates the pointer element
   */
  createPointer () {
    this.$el = document.createElement('div')
    this.$el.classList.add('handsfree-cursor')
    document.body.appendChild(this.$el)
  }
}

module.exports = HandsfreePose