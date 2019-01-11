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
 *      ||...      `##'     .....|   |(__/ /     /|% #/
 *      ||.......................|    \___/ ----/_|-#/
 *      ||.......................|       ,:   '(
 * 
 *               🔮 handsfree.js/Pose.js 🔮
 * 
 * @description A class describing different poses.
 * Each pose has a:
 * - .$el: The pointer element
 */
class HandsfreePose {
  constructor () {
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