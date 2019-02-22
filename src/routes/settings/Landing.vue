<template lang="pug">
  v-container(grid-list-md flex)
    v-layout(wrap)
      v-flex(xs12 md6 lg4)
        v-card.mb-2.primary
          v-card-text
            div.mr-1 🚧 Not all settings are covered here yet. Check out the <router-link :to='{name: "docsConfig"}'>Settings page</router-link> for more information. These settings are reset on each visit.

        v-card.mb-2.primary.lighten-1
          v-card-title
            h2 Settings
          v-card-text
            p Use this page to test different settings. 
            p Each of these can be set during instantiation: <code>const handsfree = new Handsfree(mySettings)</code>
            p You can update them later with: <code>handsfree.settings['my.setting'] = newValue</code>
      
        v-card.mb-2.primary.lighten-2
          v-card-title
            h2 Multi User Support
          v-card-text
            p Set the maximum number of users to track below. Note that adding multiple users will decrease performance.
            v-layout(row)
              v-flex
                v-slider(color='white' thumb-color='white' track-color='white' label='Max Poses (users)' max=20 min=1 step=1 v-model='maxPoses')
              v-flex(shrink style='width: 80px')
                v-text-field(v-model='maxPoses' color='white')
    
      v-flex(xs12 md6 lg4)
        v-card.mb-2
          v-card-title
            h2 Cursor
          v-card-text
            v-layout(row)
              v-flex
                v-slider(min=0.05 max=1.5 step=0.025 label='Sensitivity' v-model='sensitivity')
              v-flex(shrink style='width: 80px')
                v-text-field(v-model='sensitivity')
            v-layout(row)
              v-flex
                v-slider(min=-0.5 max=0.5 step=0.05 label='Smile-Click Sensitivity' v-model='smileClickSensitivity')
              v-flex(shrink style='width: 80px')
                v-text-field(v-model='smileClickSensitivity')

        v-card
          v-card-title
            h2 Stabilizer
          v-card-text
            v-layout(row)
              v-flex
                v-slider(label='Factor' min=0 max=3 step=1 v-model='stabilizerFactor')
              v-flex(shrink style='width: 80px')
                v-text-field(v-model='stabilizerFactor')
            v-layout(row)
              v-flex
                v-slider(label='Buffer' min=0 max=100 step=10 v-model='stabilizerBuffer')
              v-flex(shrink style='width: 80px')
                v-text-field(v-model='stabilizerBuffer')

      v-flex(xs12 md6 lg4)      
        v-card
          v-card-title
            h2 Models
          v-card-text
            v-checkbox(label='Use head tracking (via BRFv4)?' v-model='useBRF')
            v-checkbox(label='Use full body pose estimation (via PoseNet)?' v-model='usePoseNet')
</template>

<script>
import {debounce} from 'lodash'

export default {
  name: 'Settings',

  watch: {
    usePoseNet () {window.handsfree.toggleBodyTracker(!this.usePoseNet)},
    useBRF () {window.handsfree.toggleFaceTracker(!this.useBRF)},

    /**
     * Set the number of faces
     */
    maxPoses: debounce(function (maxPoses) {
      window.handsfree.settings.maxPoses = maxPoses
      window.handsfree.brf.manager.setmaxPosesToTrack && window.handsfree.brf.manager.setmaxPosesToTrack(maxPoses)
    }, 500),

    /**
     * Adjust sensitivity
     */
    sensitivity: debounce(function (sensitivity) {window.handsfree.settings.sensitivity.xy = sensitivity}),
    smileClickSensitivity: debounce(function (sensitivity) {window.handsfree.settings.sensitivity.click = sensitivity}),

    /**
     * Adjust Stabilizer
     */
    stabilizerFactor: debounce(function (factor) {window.handsfree.settings.stabilizer.factor = factor}),
    stabilizerBuffer: debounce(function (buffer) {window.handsfree.settings.stabilizer.buffer = buffer})
  },
  
  data () {
    return {
      maxPoses: 1,

      // BRFv4
      smileClickSensitivity: 0,
      sensitivity: 0.7,
      stabilizerFactor: 1,
      stabilizerBuffer: 30,

      // Models
      usePoseNet: false,
      useBRF: false
    }
  },

  /**
   * Add stats
   */
  mounted () {
    this.syncSettings()

    this.$store.dispatch('onReady', () => {
      this.usePoseNet = window.handsfree.settings.tracker.posenet.enabled
      this.useBRF = window.handsfree.settings.tracker.brf.enabled
    })
  },

  methods: {
    /**
     * Syncs settings with handsfree.js
     */
    syncSettings () {
      if (window.handsfree) {
        const settings = window.handsfree.settings
  
        this.maxPoses = settings.maxPoses
        this.smileClickSensitivity = settings.sensitivity.click
        this.sensitivity = settings.sensitivity.xy
        this.stabilizerFactor = settings.stabilizer.factor
        this.stabilizerBuffer = settings.stabilizer.buffer
      } else {
        setTimeout(() => {this.syncSettings()}, 50)
      }
    }
  }
}
</script>

<style lang="stylus">
.statsjs > div
  position: relative !important
  z-index: 1 !important

  canvas
    width: 100% !important
    height: initial !important
</style>
