<template lang="pug">
div
</template>

<script>
/**
 * This component wraps Handsfree.js
 * @see https://handsfree.js.org
 */
import {TweenMax} from 'gsap'
// import BABYLON from 'babylonjs'

export default {
  mounted () {
    this.$store.dispatch('onReady', () => {this.setupHandsfree()})
  },

  methods: {
    /**
     * Sets up Handsfree for controlling the dog
     */
    setupHandsfree () {
      const store = this.$store

      window.handsfree.use({
        name: 'handsfreeSpaceWhale',

        // These are just temp values
        tween: {
          x: 0,
          y: 0,
          z: 0
        },

        /**
         * Called during each frame
         */
        onFrame (faces) {
          faces.forEach(face => {
            if (store.state.spacewhale.entity.player) {
              this.tweenPOV(face)
              store.state.spacewhale.entity.player.rotation.set(this.tween.x, -this.tween.y + Math.PI, -this.tween.z)
            }
          })
        },
        
        /**
         * Because of face tracking inaccuracies we apply smoothing here
         */
        tweenPOV (face) {
          // 1000 / 1000 - slow response time, lots of smoothing
          // 1 / 1000 - instant response time, very "jittery"
          TweenMax.to(this.tween, 100 / 100, {
            x: -face.rotationX * 3,
            y: -face.rotationY * 1.5,
            z: face.rotationZ * 2.35,
            ease: 'Linear.easeNone',
            overwrite: true,
            immediate: true
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.handsfree-cursor
  display: none

.handsfree-debug-wrap
  canvas, video
    width: 100% !important
    height: inherit !important
    top: 0 !important
    left: 0 !important
</style>
