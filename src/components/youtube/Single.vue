<template lang="pug">
  div
    v-container
      v-layout
        v-flex.mb-5(xs12 m8)
          #youtube-player(style='min-height: 450px')

    v-container
      YouTubeLanding
</template>

<script>
import YouTubeLanding from './Landing'
import './youtube.handsfree.js'

export default {
  name: 'YouTubeSingle',

  components: {YouTubeLanding},

  mounted () {this.maybeInitVideo()},

  beforeRouteUpdate (to, from, next) {
    next()
    if (to.name === from.name) this.$nextTick(() => this.maybeInitVideo())
  },

  /**
   * Stop the video before navigation
   */
  beforeRouteLeave (to, from, next) {
    window.App.$store.state.youtube.player.stopVideo && window.App.$store.state.youtube.player.stopVideo()
    next()
  },

  methods: {
    /**
     * Attempts to instantiate the video repeteadly until it works
     */
    maybeInitVideo () {
      this.$store.dispatch('youtube/setupPlayer', {id: this.$route.params.id})
    }
  }
}
</script>
