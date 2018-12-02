<template lang="pug">
  div
    UseHandsfree
    v-container
      v-layout
        v-flex.mb-5(xs12 m8)
          #youtube-player

    v-container
      YouTubeLanding
</template>

<script>
import YouTubeLanding from './Landing'
import UseHandsfree from './handsfree.vue'

export default {
  name: 'YouTubeSingle',

  components: {YouTubeLanding, UseHandsfree},

  mounted () {
    this.maybeInitVideo()
    this.resizePlayer()
    window.addEventListener('resize', () => this.resizePlayer())
  },

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
    },

    /**
     * Resizes the player ot be as tall as the display
     */
    resizePlayer () {
      const $player = document.querySelector('#youtube-player')
      if ($player) $player.style.height = `${window.innerHeight - 100}px`
    }
  }
}
</script>
