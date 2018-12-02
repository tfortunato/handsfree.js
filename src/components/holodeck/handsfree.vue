<template lang="pug">
div
</template>

<script>
/**
 * PlayCanvas Holodeck
 * - Emmits a 'handsfree:onFrame' on the iframe with camera config
 */
import {throttle} from 'lodash'

export default {
  mounted () {
    this.useHandsfree()
  },

  data () {
    return {
      holodeck: null
    }
  },

  methods: {
    /**
     * Sets up Handsfree for this view
     */
    // @TODO lets make this as a global Vue plugin
    useHandsfree: throttle(function () {
      const handsfree = window.handsfree

      if (handsfree) {
        const $holodeck = document.getElementById('handsfree-holodeck')
        handsfree.use({
          name: 'playcanvas-holodeck',
          
          /**
           * This is called on each webcam frame
           * @param {Array} faces An array of detected faces
           */
          onFrame (faces) {
            faces.forEach(face => {
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
      } else {
        this.useHandsfree()
      }
    }, 50)
  }
}
</script>
