<template lang="pug">
  v-container(grid-list-md flex)
    v-layout(wrap)
      v-flex(xs12 md6 lg4)
        v-card.mb-2.amber.lighten-1
          v-card-text
            div.mr-1 🚧 Not all settings are covered here yet.

        v-card.mb-2.orange.darken-1
          v-card-title
            h2 Settings
          v-card-text
            p Use this page to test different settings. Check out the <router-link :to='{name: "docsConfig"}'>Settings Docs</router-link> for more information. These settings are not persisted and reset on each visit.
        v-card.mb-2.pink.darken-1
          v-card-title
            h2 Multi User Support
          v-card-text
            p Set the maximum number of users to track below. Note that adding multiple users will decrease performance.
            pre
              code.javascript.
               // Initialize
                handsfree = new Handsfree({maxPoses: 1})
                // Update
                handsfree.settings.maxPoses = 2
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
            p Here you can change global cursor settings (they affect all tracked users):

            pre
              code.javascript.
               // Initialize
               handsfree = new Handsfree({
                  sensitivity: {
                    // A factor to adjust the cursors move speed by
                    xy: 0.7,
                    // How wide (> 0) or narrow (< 0) a smile needs to be
                    click: 0
                  }
                })
               
                // Update
                handsfree.settings.sensitivity.xy = 0.7
                handsfree.settings.sensitivity.click = 0

            v-layout(row)
              v-flex
                v-slider(min=0.05 max=1.5 step=0.025 label='sensitivity.xy' v-model='sensitivity')
              v-flex(shrink style='width: 80px')
                v-text-field(v-model='sensitivity')
            v-layout(row)
              v-flex
                v-slider(min=-0.5 max=0.5 step=0.05 label='sensitivity.click' v-model='smileClickSensitivity')
              v-flex(shrink style='width: 80px')
                v-text-field(v-model='smileClickSensitivity')

        v-card
          v-card-title
            h2 Stabilizer
          v-card-text
            p These are experimental settings to help compensate for tremors or shaky environments.
            pre
              code.javascript.
               // Initialize
                handsfree = new Handsfree({
                  stabilizer: {
                    // How much stabilization to use: 0 = none, 3 = heavy
                    factor: 1,
                    // Number of frames to stabilizer over
                    buffer: 30
                  }
                })
               
                // Update
                handsfree.settings.stabilizer.factor = 0.7
                handsfree.settings.stabilizer.buffer = 0

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
            p These are the available computer vision models, and more will be added soon! You can mix and match models to explore new interactions.

            p We currently have:
            ul
              li
                | BRFv4 - A face tracker (
                a(href='https://github.com/Tastenkunst/brfv4_javascript_examples') View on Github
                | )
              li
                | PoseNet - A full body pose estimator (
                a(href='https://github.com/tensorflow/tfjs-models/tree/master/posenet') View on GitHub
                | )
            pre
              code.javascript.
               // Initialize
                handsfree = new Handsfree({
                  tracker: {
                    // Face tracker
                    brf: {enabled: true},
                    // Body tracker
                    posenet: {enabled: false}
                  }
                })
               
                // Update
                handsfree.toggleBodyTracker(true|false|null)
                handsfree.toggleFaceTracker(true|false|null)

            v-img(src='https://media.giphy.com/media/LX0JdCeSE9hPpoG39P/giphy.gif')

            v-checkbox(label='Use BRFv4 - a face tracker' v-model='useBRF')
            v-checkbox(label='Use PoseNet - a full body pose estimator' v-model='usePoseNet')
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
    this.$store.dispatch('syntaxHighlight')

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
