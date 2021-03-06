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
 * @description A class describing different poses. These are
 * stored in `handsfree.pose[]` and represents one tracked user.
 * 
 * Each `handsfree.pose[n]` has the following:
 * `.cursor` - The cursors `.position`, `.state`, and `.$target`
 * `.face` - Face/head keypoints and pose information
 * `.body` - Full body pose keypoints and scores
 */
class HandsfreePose {
  constructor () {
    /**
     * A BRFv4 tracked face
     * @see https://github.com/Tastenkunst/brfv4_javascript_examples/
     */
    this.face = null

    /**
     * The cursor object
     */
    this.cursor = {
      x: 0,
      y: 0,
      $el: this.createPointer()
    }
  }

  /**
   * Creates the pointer element
   */
  createPointer () {
    const $cursor = document.createElement('div')
    $cursor.classList.add('handsfree-cursor')
    document.body.appendChild($cursor)

    return $cursor
  }
}

module.exports = HandsfreePose