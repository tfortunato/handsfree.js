/**
 * Calculates a vector from the center of the screen to the cursors position
 */
module.exports = {
  name: 'CenterVector',
  // _isDisabled: true,

  windowCenter: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  },

  // Number of pixels from the center to ignore (the "safe zone")
  safeDistance: window.innerHeight / 4,
  
  onFrame (faces) {
    faces.forEach(face => {
      // Distance from screen center to point
      const dist = this.getDistance(face.cursor, this.windowCenter)

      face.centerVector = {
        x: 0,
        y: 0
      }
      
      // Normalize the vector
      if (dist > this.safeDistance) {
        face.centerVector.x = (face.cursor.x - this.windowCenter.x) / this.windowCenter.x
        face.centerVector.y = (face.cursor.y - this.windowCenter.y) / this.windowCenter.y
      }
    })
  },

  /**
   * Calculate distance betwix 2 points
   * @param {Objects} p1 {x, y}
   * @param {Objects} p2 {x, y}
   */
  getDistance (p1, p2) {
    const a = p1.x - p2.x
    const b = p1.y - p2.y
    return Math.sqrt(a * a + b * b)
  }
}