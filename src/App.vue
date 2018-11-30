<template lang="pug">
  v-app(dark)
    v-toolbar(light app)
      v-toolbar-side-icon(@click.stop='isNavOpen = !isNavOpen')
      v-toolbar-title.headline.text-uppercase
        span
          img.mr-2(:src='favicon' height=50 style='vertical-align: middle')
          span.hidden-sm-and-down(v-html='title')
      v-spacer
      v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam') Start Webcam
      v-btn.primary.handsfree-show-when-started.hidden(large color='error' @click='stopWebcam') Stop Webcam

    v-navigation-drawer(app temporary light v-model='isNavOpen')
      v-list.layout.column.fill-height
        template(v-if='isAtBrowseHandsfree')
          NavBrowseHandsfree
        template(v-else)
          NavHandsfreeJS

        v-list-tile(:to='{name: "settings"}')
          v-list-tile-action
            v-icon settings
          v-list-tile-title Settings

        v-spacer
        v-divider
        template(v-if='isAtBrowseHandsfree')
          NavHandsfreeJS
        template(v-else)
          NavBrowseHandsfree
        v-divider
        v-list-tile(href='https://glitch.com/~handsfree-starter')
          v-list-tile-action
            v-icon developer_board
          v-list-tile-title Handsfree Starter Kit
        v-divider
        v-list-tile(href='https://twitter.com/labofoz')
          v-list-tile-action
            v-icon person
          v-list-tile-title Twitter @Labofoz

    v-content
      .handsfree-debug-wrap
      router-view
</template>

<script>
import HomeDocumentation from './components/HomeDocumentation'
import NavBrowseHandsfree from './components/nav/BrowseHandsfree.vue'
import NavHandsfreeJS from './components/nav/HandsfreeJS.vue'

export default {
  name: 'App',

  components: {
    HomeDocumentation,
    NavBrowseHandsfree,
    NavHandsfreeJS
  },

  data () {
    const isAtBrowseHandsfree = window.location.hostname === 'browsehandsfree.com'

    return {
      // The favicon next to the title
      favicon: isAtBrowseHandsfree ? '/browsehandsfree.png' : '/favicon.png',

      // Determines if we're at browsehandsfree.com
      isAtBrowseHandsfree,
      
      // If the navigation is open
      isNavOpen: false,

      // The title
      title: isAtBrowseHandsfree ? 'Browse<strong>Handsfree</strong>' : '<strong>Handsfree</strong><small>.js.org</small>'
    }
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