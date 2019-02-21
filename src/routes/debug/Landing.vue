<template lang="pug">
div
  v-container(grid-list-md flex)
    v-layout(wrap)
      v-flex(xs12 md6 lg4)
        v-card.mb-2(color='primary')
          v-card-title
            h2 Debug
          v-card-text
            p
              | 🚧 
              em This page is currently being updated (<a href="https://github.com/labofoz/handsfree.js/issues/67">see tasks</a>)
            p Use this route to debug Handsfree.js while it's running, as well as for gauging different metrics that can help you while developing your plugins.
        
        v-card.mb-2.primary.lighten-1
          v-card-title
            h2 The Previewer
          v-card-text
            p Enabling/Disabling the Debug Previewer is done using <code>handsfree.togglePreviwer()</code>. On this site, you can move it by drag from the center or resize it by dragging from the edges. It'll also follow you between pages:
            v-img(src='https://media.giphy.com/media/mRmNNQNKed2ExuSoob/source.gif')
          v-card-actions
            v-btn.primary(flat block @click='toggleDebugger') Show Previewer

        v-card.mb-2.primary.lighten-2
          v-card-title
            h2 What throws off the face tracker?
          v-card-text
            ul
              li Poor lighting and overexposed feeds
              li Being at +/- 20°
              li Reflective glasses
              li Thick/long beards
              li Being too close/far

        v-card.mb-2.primary.lighten-3
          v-card-title
            h2 What throws off the body tracker?
          v-card-text
            ul
              li Being at +/- 30°
              li Being too close/far

      v-flex(xs12 md6 lg8)
        v-layout(wrap)
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

          v-flex(xs12 lg6)
            v-card.mb-2
              v-card-title
                h2 Cursor Position
              v-card-text
                p Each row represents one tracked <code>pose[n]</code>. Access them with:
                code.mb-3.
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
                code.mb-3.
                 handsfree.pose[n].cursor.state.mouseDown
                  handsfree.pose[n].cursor.state.mouseDrag
                  handsfree.pose[n].cursor.state.mouseUp
                v-data-table.elevation-1(hide-actions :items='table.values.current' :headers='table.headers.cursorStates')
                  template(slot='items' slot-scope='prop')
                    td {{prop.item.cursor.state.mouseDown}}
                    td {{prop.item.cursor.state.mouseDrag}}
                    td {{prop.item.cursor.state.mouseUp}}
</template>

<script>
import {cloneDeep} from 'lodash'

export default {
  name: 'debugLanding',

  /**
   * - Turn on the webcam for this route
   * - Listen to states
   */
  mounted () {
    this.$store.dispatch('onReady', () => {
      window.handsfree.on('trackPoses', this.trackPoses)
    })
  },

  data () {
    return {
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
      window.handsfree.toggleDebugger()
    }
  }
}
</script>
