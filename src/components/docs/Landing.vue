<template lang="pug">
div
  v-container(grid-list-lg fluid)
    v-layout(row wrap)
      v-flex(xs12 md4)
        v-list
          v-list-tile(:to='{name: "docsIntro"}')
            v-list-tile-title Intro
          v-list-tile(:to='{name: "docsQuickstart"}')
            v-list-tile-title Quickstart
          v-list-tile(:to='{name: "docsConfig"}')
            v-list-tile-title Config and Settings
          v-list-tile(:to='{name: "docsPlugins"}')
            v-list-tile-title Plugins
          v-list-tile(:to='{name: "docsEvents"}')
            v-list-tile-title Events
          v-list-tile(:to='{name: "docsTarget"}')
            v-list-tile-title handsfree.$target

      v-flex(xs12 md8)
        h1 Test 123
</template>

<script>
export default {
  name: 'docsLanding',

  /**
   * Re-enable boids
   */
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('onReady', () => {
      window.handsfree.plugin['boids-debugger'].enable()
    })
    next()
  },

  /**
   * Disable boids
   */
  mounted () {
    this.$store.dispatch('onReady', () => {
      window.handsfree.plugin['boids-debugger'].disable()
    })
  }
}
</script>