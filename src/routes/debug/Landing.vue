<template lang="pug">
div
  v-container(grid-list-md flex)
    v-layout(wrap)
      v-flex(xs12 lg8)
        v-card
          v-card-title
            h2 Debug: Pose
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

      v-flex(xs12 lg4)
        v-card
          v-card-title
            h2 Debug: Cursor
          v-card-text
            h3 Position
            v-data-table.elevation-1(hide-actions :items='table.values.current' :headers='table.headers.cursor')
              template(slot='items' slot-scope='prop')
                td {{prop.item.cursor.x.toFixed(2)}}
                td {{prop.item.cursor.y.toFixed(2)}}
                td {{prop.item.cursor.$target && prop.item.cursor.$target.toString()}}

            h3.mt-3 States
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
      const handsfree = window.handsfree

      this.originalDebugState = handsfree.debug.isDebugging
      handsfree.toggleDebugger(true)
      handsfree.on('trackPoses', this.trackPoses)
    })
  },

  // Reset the debug state
  beforeRouteLeave (to, from, next) {
    const handsfree = window.handsfree

    handsfree.toggleDebugger(this.originalDebugState)
    handsfree.off('trackPoses', this.trackPoses)
    next()
  },

  data () {
    return {
      // The original debug state, which will be restored onRouteLeave
      originalDebugState: null,

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
    }
  }
}
</script>
