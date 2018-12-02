<template lang="pug">
div
</template>

<script>
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

        // Used for tweening
        tween: {},
        
        /**
         * This is called on each webcam frame
         * @param {Array} faces An array of detected faces
         */
        onFrame (faces) {
          faces.forEach(face => {
            if (handsfree.faces[0].cursor.$target && handsfree.faces[0].cursor.$target.nodeName === 'IFRAME') {
              handsfree.cursor.$el.style.display = 'none'
            } else {
              handsfree.cursor.$el.style.display = 'inherit'
            }
            
            $holodeck.contentWindow.postMessage({
              action: 'handsfree:onFrame',
              face: {
                rotationX: -face.rotationX,
                rotationY: -face.rotationY,
                rotationZ: face.rotationZ
              }
            }, '*')
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
