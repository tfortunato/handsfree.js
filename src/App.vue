<template lang="pug">
  v-app(dark)
    v-toolbar(light app)
      v-toolbar-side-icon(@click.stop='isNavOpen = !isNavOpen')
      v-toolbar-title.headline.text-uppercase
        span
          img.mr-2(src='/favicon.png' height=50 style='vertical-align: middle')
          span.hidden-sm-and-down <strong>Handsfree</strong><small>.js.org</small>
      v-spacer
      v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam') Start Webcam
      v-btn.primary.handsfree-show-when-started.hidden(large color='error' @click='stopWebcam') Stop Webcam

    v-navigation-drawer(app temporary light v-model='isNavOpen')
      v-list.layout.column.fill-height
        v-list-tile(:to='{name: "home"}')
          v-list-tile-action
            img(src='/favicon.png' width=48)
          v-list-tile-title Home

    v-content
      .handsfree-debug-wrap
      Home
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',

  data: () => {
    return {
      isNavOpen: false
    }
  },

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