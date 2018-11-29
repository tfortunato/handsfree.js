<template lang="pug">
  div
    v-container(grid-list-md)
      v-layout(wrap)
        v-flex(xs12 md6 lg8)
          v-card(light)
            v-card-title
              h2 Settings
            v-card-text
              v-alert(type='warning' value=1 style='color: #444') These settings are a work in progress and don't get saved yet. They work, but will be reset when you refresh the page.
              h3.mt-5 Cursor
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

              h3 Multi User <small>(experimental)</small>
              v-alert(type='warning' value=1 style='color: #444') This currently does not work with the existing plugins but is exposed for experimentation.
              v-layout(row)
                v-flex
                  v-slider(label='Number of Faces' max=20 min=1 step=1 v-model='numFaces')
                v-flex(shrink style='width: 80px')
                  v-text-field(v-model='numFaces')

        v-flex(xs12 md6 lg4)
          v-card.mb-2(light)
            v-card-text
              p Click this Stats Panel to view different performance metrics:
              p.statsjs(ref='stats' @click='updateStatsDescription')
              p(v-if='statsMode === 0') <strong>FPS</strong>: Frames rendered in the last second. The higher the number the better.
              p(v-if='statsMode === 1') <strong>MS</strong>: Milliseconds needed to render a frame. The lower the number the better.
              p(v-if='statsMode === 2') <strong>MB</strong>: MBytes of allocated memory
        
          v-card(light)
            v-card-title
              h2 Quick Settings
            v-card-text
              //- p Selecting any of the following will overwrite your current settings.
              //- v-radio-group(v-model='quickSetting')
              //-   v-radio(label='Low accuracy; High performance' value='low')
              //-   v-radio(label='Balanced' value='balanced')
              //-   v-radio(label='High accuracy; Low performance' value='high')
              //-   v-radio(label='Custom' value='custom')
              //- v-divider
              v-checkbox(label='Use animated background?' v-model='useBackground')
</template>

<script>
import Stats from 'stats.js'
import {debounce} from 'lodash'

export default {
  name: 'Settings',

  watch: {
    /**
     * Toggle background
     */
    useBackground () {this.toggleBackground()},

    /**
     * Set the number of faces
     */
    numFaces: debounce(function (numFaces) {
      window.handsfree.settings.maxFaces = numFaces
      window.handsfree.brf.manager.setNumFacesToTrack && window.handsfree.brf.manager.setNumFacesToTrack(numFaces)
    }, 500),

    /**
     * Adjust sensitivity
     */
    sensitivity: debounce(function (sensitivity) {
      window.handsfree.settings.sensitivity.xy = sensitivity
    }),

    smileClickSensitivity: debounce(function (sensitivity) {
      window.handsfree.settings.sensitivity.click = sensitivity
    })
  },
  
  data () {
    return {
      useBackground: true,
      quickSetting: 'custom',
      numFaces: 1,
      smileClickSensitivity: 0,
      statsMode: 0,
      sensitivity: 0.7
    }
  },

  /**
   * Add stats
   */
  mounted () {
    const stats = new Stats()
    const perf = function () {
      stats.end()
      requestAnimationFrame(perf)
      stats.begin()
    }
    stats.showPanel(0)
    this.$refs.stats.appendChild(stats.dom)
    perf()
  },

  methods: {
    /**
     * Toggle the Boids background animation
     */
    toggleBackground () {
      const plugin = window.handsfree.plugin['boids-debugger']
      if (this.useBackground) {
        plugin.enable()
      } else {
        plugin.disable()
      }
    },

    /**
     * Update the stats description
     */
    updateStatsDescription () {
      this.statsMode++
      if (this.statsMode > 2) this.statsMode = 0
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
