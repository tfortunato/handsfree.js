<template lang="pug">
  v-app(dark)
    v-toolbar(light app)
      v-toolbar-title.headline.text-uppercase
        span.mr-3 Handsfree.js
      v-spacer
      v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam') Start Webcam
      v-btn.primary.handsfree-show-when-started.hidden(large color='error' @click='stopWebcam') Stop Webcam

    v-content
      .handsfree-debug-wrap
      Home
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',

  components: {
    Home
  },
  
  methods: {
    startWebcam () {window.handsfree.start()},
    stopWebcam () {window.handsfree.stop()}
  }
}
</script>

<style scoped lang="stylus">
  body
    background: rgb(18, 10, 34)

  div.theme--dark.application,
  div.theme--light.application
    background: none
    position: relative
    z-index: 1
</style>