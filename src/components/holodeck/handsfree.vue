<template lang="pug">
div
</template>

<script>
import {throttle} from 'lodash'

export default {
  mounted () {this.useHandsfree()},

  methods: {
    /**
     * Sets up Handsfree for this view
     */
    // @TODO lets make this as a global Vue plugin
    useHandsfree: throttle(function () {
      const handsfree = window.handsfree

      if (handsfree) {
        handsfree.use({
          name: 'playcanvas-holodeck',
          
          /**
           * This is called on each webcam frame
           * @param {Array} faces An array of detected faces
           */
          onFrame () {

          }
        })
      } else {
        this.useHandsfree()
      }
    }, 50)
  }
}
</script>
