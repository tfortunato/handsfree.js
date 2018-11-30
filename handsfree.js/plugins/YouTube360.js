/**
 * Controls YouTube 360 videos
 * - Requires a div#youtube-player
 *    - This is a hard requirement, it MUST be a div as the API will transform this div into an iframe but keep the ID
 */

 /**
 * Inject APIs
 * @see https://developers.google.com/youtube/iframe_api_reference
 * @see https://developers.google.com/youtube/v3/docs/search#resource
 * @todo load only when needed
 */
window.onYouTubeDataAPIReady = function () {window.App.$store.dispatch('youtube/initDataAPI')}

const apis = ['https://www.youtube.com/iframe_api', 'https://apis.google.com/js/api.js']
apis.forEach((api, i) => {
  let $script = document.createElement('script')
  $script.src = api

  // YouTube Data API
  if (i === 1) $script.onload = window.onYouTubeDataAPIReady

  document.body.appendChild($script)
})

/**
 * Add Plugin
 */
window.addEventListener('load', () => {
  const handsfree = window.handsfree
  
  handsfree.use({
    name: 'youtube-360',
    
    onStart () {window.App.$store.dispatch('youtube/play')},
    onStop () {window.App.$store.dispatch('youtube/pause')},
    
    /**
     * This is called on each webcam frame
     * @param {Array} faces An array of detected faces
     */
    onFrame (faces) {
      // @TODO Refactor this
      if (!window.App.$store.state.youtube.player || !document.contains(window.App.$store.state.youtube.player.a)) return

      faces.forEach(face => {
        this.updatePOV(face)
        
        // Toggle the player
        if (face.cursor.state.mouseDown && face.cursor.$target && face.cursor.$target.getAttribute('id') === 'youtube-player') {
          if (window.App.$store.state.youtube.player.getPlayerState() === 1) {
            this.onStop()
          } else {
            this.onStart()
          }
        }
      })
    },

    /**
     * Updates the pov
     */
    updatePOV (face) {
      if (!window.App.$store.state.youtube.player.getSphericalProperties) return

      const x = face.cursor.x
      const y = face.cursor.y
      const $pointer = handsfree.cursor.$el
      const pov = window.App.$store.state.youtube.player.getSphericalProperties()

      // Then add the points to the cursor!
      $pointer.style.left = x + 'px'
      $pointer.style.top = y + 'px'

      // Update POV
      if (y < 0)
        pov.pitch -= y * 0.025
      else if (y > window.innerHeight)
        pov.pitch -= (y - window.innerHeight) * 0.025
      if (x < 0)
        pov.yaw -= x * 0.025
      else if (x > window.innerWidth)
        pov.yaw -= (x - window.innerWidth) * 0.025


      if (x < 0 || y < 0 || x > window.innerHeight || y > window.innerHeight)
        window.App.$store.state.youtube.player.setSphericalProperties(pov)
    }
  })
})