<template lang="pug">
div
  v-container(grid-list-md)
    v-layout(wrap)
      v-flex(xs12 md6 lg8)
        v-card
          v-card-title
            h2 Debug
          v-card-text
            v-alert(type='info' value=1) This route displays useful debug information.
</template>

<script>
export default {
  name: 'debugLanding',

  // Turn on the webcam for this route
  mounted () {
    this.$store.dispatch('onReady', () => {
      const handsfree = window.handsfree
      this.originalDebugState = handsfree.debug.isDebugging
      handsfree.toggleDebugger(true)
    })
  },

  // Reset the debug state
  beforeRouteLeave (to, from, next) {
    window.handsfree.toggleDebugger(this.originalDebugState)
    next()
  },

  data () {
    return {
      // The original debug state, which will be restored onRouteLeave
      originalDebugState: null
    }
  }
}
</script>
