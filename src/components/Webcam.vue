<template lang="pug">
  .handsfree-debug-wrap(@mousedown='startDrag' @mousemove='setDragMode' ref='debugger' :class='dragModeClass')
</template>

<script>
// Number of pixels from the webcam border to use for resizing
const resizeBorder = 20
// A magic number that seems to help with margins due to navbar
const magicMargin = 100
// Used to prevent weird scale issues
const minWebcamWidth = 200

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
      },

      // Original bounding box, used to calculate resize dimensions
      origBounds: {}
    }
  },

  mounted () {
    window.addEventListener('mouseup', () => this.endDrag())
    window.addEventListener('mousemove', ev => this.maybeDrag(ev))
  },

  methods: {
    /**
     * Sets the drag mode to either moving or resizing
     * @param {Object} ev The event object
     * @param {Boolean} boolean Whether to presist this (true) or just set the icon (false)
     */
    setDragMode (ev, remember = false) {
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

      // Update the icon and maybe persist it
      this.$refs.debugger.style.cursor = dragMode
      if (remember) this.dragMode = dragMode
    },
    
    /**
     * Captures where on the debugger the user clicked
     */
    startDrag (ev) {
      this.origBounds = this.$refs.debugger.getBoundingClientRect()
      this.origBounds.ratio = this.$refs.debugger.clientWidth / this.$refs.debugger.clientHeight 
      this.clickStart = {
        x: ev.offsetX - this.$refs.debugger.clientWidth,
        y: ev.offsetY
      }

      this.isDragging = true
      this.setDragMode(ev, true)
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
        switch (this.dragMode) {
          case 'move': this.moveDebugger(ev); break

          case 'n-resize': this.resizeDebuggerN(ev); break
          case 'ne-resize': this.resizeDebuggerNE(ev); break
          case 'e-resize': this.resizeDebuggerE(ev); break
          case 'se-resize': this.resizeDebuggerE(ev); break 
          case 's-resize': this.resizeDebuggerS(ev); break
          case 'sw-resize': this.resizeDebuggerSW(ev); break
          case 'w-resize': this.resizeDebuggerW(ev); break
          case 'nw-resize': this.resizeDebuggerNW(ev); break
        }
      }
    },

    /**
     * Moves the debugger to where the cursor is
     */
    moveDebugger (ev) {
      this.$refs.debugger.style.left = `${ev.screenX + this.clickStart.x}px`
      this.$refs.debugger.style.top = `${ev.screenY - magicMargin - this.clickStart.y}px`
      this.$refs.debugger.style.bottom = 'inherit'
    },

    /**
     * Resize the webcam northward
     */
    resizeDebuggerN (ev) {
      const height = this.origBounds.bottom - ev.screenY + magicMargin
      const width = height * this.origBounds.ratio
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
      this.$refs.debugger.style.top = `${ev.screenY - magicMargin}px`
    },

    /**
     * Resize the webcam North Eastward
     */
    resizeDebuggerNE (ev) {
      const height = this.origBounds.bottom - ev.screenY + magicMargin
      const width = height * this.origBounds.ratio
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
      this.$refs.debugger.style.top = `${ev.screenY - magicMargin}px`
    },

    /**
     * Resizes the debugger eastward
     */
    resizeDebuggerE (ev) {
      const width = ev.screenX - this.$refs.debugger.offsetLeft
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
    },

    /**
     * Resizes the debugger southward
     */
    resizeDebuggerSE (ev) {
      const height = this.$refs.debugger.offsetTop - ev.screenY + magicMargin
      const width = height * -this.origBounds.ratio
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
    },

    /**
     * Resizes the debugger southward
     */
    resizeDebuggerS (ev) {
      const height = this.$refs.debugger.offsetTop - ev.screenY + magicMargin
      const width = height * -this.origBounds.ratio
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
    },

    /**
     * Resize the webcam northward
     */
    resizeDebuggerSW (ev) {
      const width = this.origBounds.right - ev.screenX
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
      this.$refs.debugger.style.left = `${ev.screenX}px`
    },

    /**
     * Resize the webcam northward
     */
    resizeDebuggerW (ev) {
      const width = this.origBounds.right - ev.screenX
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
      this.$refs.debugger.style.left = `${ev.screenX}px`
    },

    /**
     * Resize the webcam northward
     */
    resizeDebuggerNW (ev) {
      const width = this.origBounds.right - ev.screenX
      this.$refs.debugger.style.width = `${Math.max(width, minWebcamWidth)}px`
      this.$refs.debugger.style.top = `${ev.screenY - magicMargin}px`
      this.$refs.debugger.style.left = `${ev.screenX}px`
    }
  }
}
</script>

<style lang="stylus">
html .handsfree-debug-wrap
  user-select: none
  z-index: 100
</style>
