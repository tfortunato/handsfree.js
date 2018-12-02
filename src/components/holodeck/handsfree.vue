<template lang="pug">
v-container(grid-list-md)
  v-layout.mb-5(wrap)
    v-flex(xs12 md6 lg8 style='height: 500px')
    v-flex.handsfree-show-when-stopped(xs12 md6 lg4)
      v-card(light)
        v-card-text
          //- v-img(src='https://media.giphy.com/media/4HgnusIh1i8MzRoaOm/giphy.gif')
          p.mt-3
            | This experiment explores an illusion of depth effect via head tracking!
            //- |  <a href="https://glitch.com/~handsfree-youtube">Remix the YouTube Handsfree Starter Kit on Glitch to take it further</a> 🔮
        
        v-divider.my-3

        v-card-title.pb-0
          h3 Instructions
        v-card-text
          ul
            li Turn, tilt, and roll your head in the direction you want to look in
            li Lean and duck in any direction to move towards that direction
            li Smile wide to show and hide the cursor
          
        v-divider.my-3

        v-card-title.pb-0
          h3 🗺️ Roadmap
        v-card-text
          p
            i 
              a(href='https://github.com/BrowseHandsfree/handsfreeJS/issues/37') coming soon
          p.mt-4 Want to help? Pull requests welcome on <a href="https://github.com/browsehandsfree/HandsfreeJS">GitHub</a> or <a href="https://twitter.com/labofoz">@labofoz</a>
</template>

<script>
import {TweenMax} from 'gsap'

/**
 * PlayCanvas Holodeck
 * - Emmits a 'handsfree:onFrame' on the iframe with camera config
 */
export default {
  beforeRouteLeave () {
    window.handsfree.plugin['boids-debugger'].disable()
  },
  
  mounted () {
    this.$store.dispatch('onReady', () => {
      const $holodeck = document.getElementById('handsfree-holodeck')
      const handsfree = window.handsfree
      
      handsfree.plugin['boids-debugger'].disable()

      handsfree.use({
        name: 'playcanvas-holodeck',

        // Whether the cursor should be visible (true) or not (false) when over the iframe
        showCursor: false,

        // Used for tweening
        tween: {
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0
        },
        
        /**
         * This is called on each webcam frame
         * @param {Array} faces An array of detected faces
         */
        onFrame (faces) {
          faces.forEach(face => {
            // Show/hide cursor
            if (face.cursor.state.mouseDown) {
              this.showCursor = !this.showCursor
              console.log('showCursor', this.showCursor)
            }

            // Hide cursor when over the iframe
            if (handsfree.faces[0].cursor.$target && handsfree.faces[0].cursor.$target.nodeName === 'IFRAME') {
              handsfree.cursor.$el.style.display = this.showCursor ? 'inherit' : 'none'
            } else {
              handsfree.cursor.$el.style.display = 'inherit'
            }
            
            // Update positions
            this.tweenPOV(face)
            $holodeck.contentWindow.postMessage({
              action: 'handsfree:onFrame',
              face: {
                rotationX: -this.tween.rotationX,
                rotationY: -this.tween.rotationY,
                rotationZ: this.tween.rotationZ
              }
            }, '*')
          })
        },

        /**
         * Updates the pov
         */
        tweenPOV (face) {
          TweenMax.to(this.tween, 500 / 1000, {
            rotationX: face.rotationX,
            rotationY: face.rotationY,
            rotationZ: face.rotationZ,
            ease: 'Linear.easeNone',
            overwrite: true,
            immediate: true
          })
        }
      })
    })
  },

  data () {
    return {
      holodeck: null
    }
  }
}
</script>
