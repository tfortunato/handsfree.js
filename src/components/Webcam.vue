<template lang="pug">
  .handsfree-debug-wrap(@mousedown='startDrag' @mousemove='setDragMode' ref='debugger' :class='dragModeClass')
</template>

<script>
// Number of pixels from the webcam border to use for resizing
const resizeBorder = 20

export default {
  name: 'Webcam',

  computed: {
    dragModeClass () {return 'drag-mode-' + this.dragMode}
  },

  data () {
    return {
      // The drag mode ['move', 'resize']
      dragMode: 'move',
      
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
     * Sets the drag mode to either moving or resizing
     */
    setDragMode (ev) {
      let dragMode = 'move'

      // North, North West, North East
      if (ev.offsetY < resizeBorder) {
        dragMode = 'n-resize'
        if (ev.offsetX < resizeBorder) dragMode = 'ne-resize'
        else if (ev.offsetX > this.$refs.debugger.clientWidth - resizeBorder) dragMode = 'nw-resize'
      }
      // South, South West, South East
      else if (ev.offsetY > this.$refs.debugger.clientHeight - resizeBorder) {
        dragMode = 's-resize'
        if (ev.offsetX < resizeBorder) dragMode = 'se-resize'
        else if (ev.offsetX > this.$refs.debugger.clientWidth - resizeBorder) dragMode = 'sw-resize'
      }
      // East
      else if (ev.offsetX < resizeBorder) dragMode = 'e-resize'
      // West
      else if (ev.offsetX > this.$refs.debugger.clientWidth - resizeBorder) dragMode = 'w-resize'

      this.dragMode = dragMode
      this.$refs.debugger.style.cursor = dragMode
    },
    
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
html .handsfree-debug-wrap
  user-select: none
  z-index: 100
</style>
