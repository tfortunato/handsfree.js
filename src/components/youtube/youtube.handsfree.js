/**
 * Controls YouTube 360 videos
 * - Requires a div#youtube-player
 *    - This is a hard requirement, it MUST be a div as the API will transform this div into an iframe but keep the ID
 */
import {throttle} from 'lodash'
import {TweenMax} from 'gsap'

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

    tween: {},
    
    /**
     * This is called on each webcam frame
     * @param {Array} faces An array of detected faces
     */
    onFrame (faces) {
      // @TODO Refactor this
      if (!window.App.$store.state.youtube.player || !document.contains(window.App.$store.state.youtube.player.a)) return
      window.App.$store.state.youtube.player.getSphericalProperties && window.App.$store.state.youtube.player.setSphericalProperties(this.tween)

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
    updatePOV: throttle(function (face) {
      if (window.App.$store.state.youtube.player.getSphericalProperties 
      && (face.centerVector.x || face.centerVector.y)) {
        this.tween = window.App.$store.state.youtube.player.getSphericalProperties()
        TweenMax.to(this.tween, 250 / 1000, {
          ease: 'Linear.easeNone',
          pitch: this.tween.pitch - face.centerVector.y * 10,
          yaw: this.tween.yaw - face.centerVector.x * 10,
          overwrite: true,
          immediate: true
        })
      }
    }, 250)
  })
})