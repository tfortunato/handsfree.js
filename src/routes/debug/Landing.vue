<template lang="pug">
  v-container(grid-list-md flex)
    v-layout(wrap)
      v-flex(xs12 md6 lg4)
        v-card.mb-2.amber.lighten-1
          v-card-title
            h2 Debug
          v-card-text
            p Use this page to debug Handsfree.js while it's running. It's not terribly useful yet other than for activating the previewer below.

        v-card.mb-2.orange.darken-1
          v-card-title
            h2 The Previewer
          v-card-text
            p Enabling/Disabling the Debug Previewer is done using <code>handsfree.toggleDebugger()</code>. On this site, you can move it by drag from the center or resize it by dragging from the edges. It'll also follow you between pages:
            v-img(src='https://media.giphy.com/media/mRmNNQNKed2ExuSoob/source.gif')

          v-card-actions
            v-btn.orange.accent-1(flat block @click='toggleDebugger')
              | Toggle Previewer
              span.ml-1.handsfree-show-when-stopped and start webcam

        v-card.mb-2.pink.darken-1
          v-card-title
            h2 Troubleshooting
          v-card-text
            p There are a few things that can throw off the trackers, including:
            ul
              li Poor lighting and overexposed feeds
              li Being too close or far
              li Reflective glasses
              li Thick/long beards and glasses
              li Turning head beyond +/- 30°
            p We'll be providing benchmarks for these soon!

        v-card.mb-2.purple.accent-2
          v-card-title
            h2 Performance
          v-card-text
            p Click this Stats Panel to view different performance metrics.
            p(v-if='statsMode === 0') <strong>FPS</strong>: Frames rendered in the last second. The higher the number the better.
            p(v-if='statsMode === 1') <strong>MS</strong>: Milliseconds needed to render a frame. The lower the number the better.
            p(v-if='statsMode === 2') <strong>MB</strong>: MBytes of allocated memory
            p.statsjs(ref='stats' @click='updateStatsDescription')

      v-flex(xs12 md6 lg8)
        v-layout(wrap)
          v-flex(xs12 lg6)
            v-card.mb-2
              v-card-title
                h2 Cursor Position
              v-card-text
                p Each row represents one tracked <code>pose[n]</code>. Access them with:
                pre
                  code.mb-3.javascript.
                   handsfree.pose[n].cursor.position.x
                    handsfree.pose[n].cursor.position.y
                    handsfree.pose[n].cursor.position.$target
                v-data-table.elevation-1(hide-actions :items='table.values.current' :headers='table.headers.cursor')
                  template(slot='items' slot-scope='prop')
                    td {{prop.item.cursor.x.toFixed(2)}}
                    td {{prop.item.cursor.y.toFixed(2)}}
                    td {{prop.item.cursor.$target && prop.item.cursor.$target.toString()}}

          v-flex(xs12 lg6)
            v-card.mb-2
              v-card-title
                h2 Cursor State
              v-card-text
                p Each row represents one tracked <code>pose[n]</code>. Access them with:
                pre
                  code.mb-3.javascript.
                   handsfree.pose[n].cursor.state.mouseDown
                    handsfree.pose[n].cursor.state.mouseDrag
                    handsfree.pose[n].cursor.state.mouseUp
                v-data-table.elevation-1(hide-actions :items='table.values.current' :headers='table.headers.cursorStates')
                  template(slot='items' slot-scope='prop')
                    td {{prop.item.cursor.state.mouseDown}}
                    td {{prop.item.cursor.state.mouseDrag}}
                    td {{prop.item.cursor.state.mouseUp}}
        
          v-flex(xs12)
            v-card.mb-2
              v-card-title
                h2 Pose
              v-card-text
                h3 Current
                v-data-table.elevation-1(hide-actions :items='table.values.current' :headers='table.headers.face')
                  template(slot='items' slot-scope='prop')
                    td {{prop.item.face.translationX.toFixed(2)}}
                    td {{prop.item.face.translationY.toFixed(2)}}
                    td {{prop.item.face.scale.toFixed(2)}}
                    td {{prop.item.face.rotationX.toFixed(4)}} ({{(prop.item.face.rotationX * 180 / Math.PI).toFixed(2)}}°)
                    td {{prop.item.face.rotationY.toFixed(4)}} ({{(prop.item.face.rotationY * 180 / Math.PI).toFixed(2)}}°)
                    td {{prop.item.face.rotationZ.toFixed(4)}} ({{(prop.item.face.rotationZ * 180 / Math.PI).toFixed(2)}}°)

                h3.mt-3 Min
                v-data-table.elevation-1(hide-actions :items='table.values.min' :headers='table.headers.face')
                  template(slot='items' slot-scope='prop')
                    td {{prop.item.face.translationX.toFixed(2)}}
                    td {{prop.item.face.translationY.toFixed(2)}}
                    td {{prop.item.face.scale.toFixed(2)}}
                    td {{prop.item.face.rotationX.toFixed(4)}} ({{(prop.item.face.rotationX * 180 / Math.PI).toFixed(2)}}°)
                    td {{prop.item.face.rotationY.toFixed(4)}} ({{(prop.item.face.rotationY * 180 / Math.PI).toFixed(2)}}°)
                    td {{prop.item.face.rotationZ.toFixed(4)}} ({{(prop.item.face.rotationZ * 180 / Math.PI).toFixed(2)}}°)

                h3.mt-3 Max
                v-data-table.elevation-1(hide-actions :items='table.values.max' :headers='table.headers.face')
                  template(slot='items' slot-scope='prop')
                    td {{prop.item.face.translationX.toFixed(2)}}
                    td {{prop.item.face.translationY.toFixed(2)}}
                    td {{prop.item.face.scale.toFixed(2)}}
                    td {{prop.item.face.rotationX.toFixed(4)}} ({{(prop.item.face.rotationX * 180 / Math.PI).toFixed(2)}}°)
                    td {{prop.item.face.rotationY.toFixed(4)}} ({{(prop.item.face.rotationY * 180 / Math.PI).toFixed(2)}}°)
                    td {{prop.item.face.rotationZ.toFixed(4)}} ({{(prop.item.face.rotationZ * 180 / Math.PI).toFixed(2)}}°)
</template>

<script>
import {cloneDeep} from 'lodash'
import Stats from 'stats.js'

export default {
  name: 'debugLanding',

  /**
   * - Turn on the webcam for this route
   * - Listen to states
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

    this.$store.dispatch('syntaxHighlight')
    this.$store.dispatch('onReady', () => {
      window.handsfree.on('trackPoses', this.trackPoses)
      this.isPreviewing = window.handsfree.debug.isDebugging
    })
  },

  // Stop listening to trackPoses
  destroyed () {
    this.$store.dispatch('onReady', () => {
      window.handsfree.off('trackPoses', this.trackPoses)
    })
  },

  data () {
    return {
      // Whether we are previewing or not
      isPreviewing: false,
      
      // The Stats.js mode
      statsMode: 0,

      // Data tables for representing handsfree states
      table: {
        headers: {
          cursor: [
            {text: 'x', value: 'cursor.x'},
            {text: 'y', value: 'cursor.y'},
            {text: '$target', value: 'cursor.$target'}
          ],

          cursorStates: [
            {text: 'mouseDown', value: 'cursor.state.mouseDown'},
            {text: 'mouseDrag', value: 'cursor.state.mouseDrag'},
            {text: 'mouseUp', value: 'cursor.state.mouseUp'}
          ],
          
          face: [
            {text: 'x', value: 'face.translationX'},
            {text: 'y', value: 'face.translationY'},
            {text: 'scale', value: 'face.scale'},
            {text: 'pitch', value: 'face.translationZ'},
            {text: 'yaw', value: 'face.translationY'},
            {text: 'roll', value: 'face.translationZ'}
          ],
        },

        values: {
          // Current values
          current: [],

          // Contains the maximum values reached
          max: [],

          // Contains the minimum values reached
          min: []
        }
      }
    }
  },

  methods: {
    /**
     * Update the stats description
     */
    updateStatsDescription () {
      this.statsMode++
      if (this.statsMode > 2) this.statsMode = 0
    },

    /**
     * Called via the handsfree:trackPoses event
     * @see Handsfree.on()
     */
    trackPoses (ev) {
      this.table.values.current = ev.detail.poses
      if (this.table.values.max.length < this.table.values.current.length) {
        this.table.values.max = cloneDeep(this.table.values.current)
        this.table.values.min = cloneDeep(this.table.values.current)
      }

      // Remember min values
      this.table.values.current.forEach((pose, i) => {
        this.table.values.min[i].face.translationX = Math.min(this.table.values.min[i].face.translationX, pose.face.translationX)
        this.table.values.min[i].face.translationY = Math.min(this.table.values.min[i].face.translationY, pose.face.translationY)
        this.table.values.min[i].face.scale = Math.min(this.table.values.min[i].face.scale, pose.face.scale)
        this.table.values.min[i].face.rotationX = Math.min(this.table.values.min[i].face.rotationX, pose.face.rotationX)
        this.table.values.min[i].face.rotationY = Math.min(this.table.values.min[i].face.rotationY, pose.face.rotationY)
        this.table.values.min[i].face.rotationZ = Math.min(this.table.values.min[i].face.rotationZ, pose.face.rotationZ)
      })

      // Remember max values
      this.table.values.current.forEach((pose, i) => {
        this.table.values.max[i].face.translationX = Math.max(this.table.values.max[i].face.translationX, pose.face.translationX)
        this.table.values.max[i].face.translationY = Math.max(this.table.values.max[i].face.translationY, pose.face.translationY)
        this.table.values.max[i].face.scale = Math.max(this.table.values.max[i].face.scale, pose.face.scale)
        this.table.values.max[i].face.rotationX = Math.max(this.table.values.max[i].face.rotationX, pose.face.rotationX)
        this.table.values.max[i].face.rotationY = Math.max(this.table.values.max[i].face.rotationY, pose.face.rotationY)
        this.table.values.max[i].face.rotationZ = Math.max(this.table.values.max[i].face.rotationZ, pose.face.rotationZ)
      })
    },

    /**
     * Toggles the debugger
     */
    toggleDebugger () {
      const handsfree = window.handsfree
      
      !handsfree.isTracking && handsfree.start()
      handsfree.toggleDebugger()
      this.isPreviewing = handsfree.debug.isDebugging
    }
  }
}
</script>
