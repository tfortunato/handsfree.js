<template lang="pug">
  .handsfree-debug-wrap(@mousedown='startDrag' ref='debugger')
</template>

<script>
export default {
  name: 'Webcam',

  data () {
    return {
      // Whether we've started dragging (true) or not (false)
      isDragging: false,
      
      // Where the user started the click
      clickStart: {
        x: 0,
        y: 0
      }
    }
  },

  mounted () {
    window.addEventListener('mouseup', () => this.endDrag())
    window.addEventListener('mousemove', ev => this.maybeDrag(ev))
  },

  methods: {
    /**
     * Captures where on the debugger the user clicked
     */
    startDrag (ev) {
      this.isDragging = true
      this.clickStart = {
        x: ev.offsetX - this.$refs.debugger.clientWidth,
        y: ev.offsetY
      }
    },

    /**
     * Releases the drag
     */
    endDrag () {
      this.isDragging = false
    },

    /**
     * Repositions the debugger in the new place
     */
    maybeDrag (ev) {
      if (this.isDragging) {
        this.$refs.debugger.style.left = `${ev.screenX + this.clickStart.x}px`
        this.$refs.debugger.style.top = `${ev.screenY - 100 - this.clickStart.y}px`
        this.$refs.debugger.style.bottom = 'inherit'
      }
    }
  }
}
</script>

<style lang="stylus">
.handsfree-debug-wrap
  user-select: none

  video, canvas
    cursor: grab
</style>
