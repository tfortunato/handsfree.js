<template lang="pug">
  div
    v-container(grid-list-md)
      v-layout(wrap)
        v-flex(xs12 md6 lg8)
          v-card(light)
            v-card-title
              h2 Settings
            v-card-text
              v-alert(type='info' :value='true') The following settings will be saved to your browser's localStorage.

        v-flex(xs12 md6 lg4)
          v-card.mb-2(light)
            v-card-text
              p Click the Stats Panel to view different performance metrics:
              p.statsjs(ref='stats' @click='updateStatsDescription')
              p(v-if='statsMode === 0') <strong>FPS</strong>: Frames rendered in the last second. The higher the number the better.
              p(v-if='statsMode === 1') <strong>MS</strong>: Milliseconds needed to render a frame. The lower the number the better.
              p(v-if='statsMode === 2') <strong>MB</strong>: MBytes of allocated memory
        
          v-card(light)
            v-card-title
              h2 Quick Settings
            v-card-text
              p Selecting any of the following will overwrite your current settings.
              v-radio-group(v-model='quickSetting')
                v-radio(label='Low accuracy; High performance' value='low')
                v-radio(label='Balanced' value='balanced')
                v-radio(label='High accuracy; Low performance' value='high')
                v-radio(label='Custom' value='custom')
              v-divider
              v-checkbox(label='Multi-user (beta)?' v-model='isMultiUser')
              v-checkbox.mt-0(label='Use animated background?' v-model='useBackground')
</template>

<script>
import Stats from 'stats.js'

export default {
  name: 'Settings',

  watch: {
    useBackground () {this.toggleBackground()}
  },
  
  data () {
    return {
      useBackground: true,
      isMultiUser: false,
      quickSetting: 'custom',
      statsMode: 0
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

  canvas
    width: 100% !important
    height: initial !important
</style>
