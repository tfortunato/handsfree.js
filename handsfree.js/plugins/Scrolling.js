/**
 * Handles page scrolling
 */
module.exports = {
  name: 'Scrolling',
  _isDisabled: true,

  // The multiplier to scroll the page by
  // @TODO Implement this on handsfree.js.org
  scrollSpeed: 0.1,

  /**
   * Scrolls the page when the cursor is above/below the screen
   * @param {Array}     poses    The array of face objects
   * @param {Handsfree} instance The handsfree instance
   */
  onFrame (poses, instance) {
    poses.forEach(pose => {
      let x = pose.face.cursor.x
      let y = pose.face.cursor.y

      // Then add the points to the cursor!
      instance.cursor.$el.style.left = x + 'px'
      instance.cursor.$el.style.top = y + 'px'

      // Scroll the page
      if (y < 0)
        window.scrollTo(0, window.scrollY + y * this.scrollSpeed)
      else if (y > window.innerHeight)
        window.scrollTo(0, window.scrollY + (y - window.innerHeight) * this.scrollSpeed)
    })
  }
}
