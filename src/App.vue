<template lang="pug">
  v-app(dark)
    v-toolbar#main-nav(light app)
      v-toolbar-side-icon(@click.stop='isNavOpen = !isNavOpen')
      v-toolbar-title.headline.text-uppercase
        router-link(to='/' style='text-decoration: none; color: inherit')
          img.mr-2(:src='favicon' height=50 style='vertical-align: middle')
          span.hidden-sm-and-down
            strong Handsfree
            small .js.org
      v-spacer
      span.hidden-sm-and-down
        v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam' :disabled='isHandsfreeLoading')
          v-icon.mr-2 videocam
          | Start Webcam
        v-btn.primary.handsfree-show-when-started(large color='error' @click='stopWebcam')
          v-icon.mr-2 videocam_off
          | Stop Webcam
      span.hidden-md-and-up
        v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam' :disabled='isHandsfreeLoading')
          v-icon videocam
        v-btn.primary.handsfree-show-when-started(large color='error' @click='stopWebcam')
          v-icon videocam_off

    v-progress-linear#loading-bar(v-model='loading.progress' :color='loading.color')

    v-navigation-drawer(app temporary light v-model='isNavOpen')
      v-list.layout.column.fill-height
        v-list-tile(:to='{name: "Home"}')
          v-list-tile-action
            img(src='/favicon.png' width=48)
          v-list-tile-title Handsfree.js

        v-list-tile(:to='{name: "youtubeLanding"}')
          v-list-tile-action
            v-icon ondemand_video
          v-list-tile-title YouTube

        v-list-tile(:to='{name: "holodeckLanding"}')
          v-list-tile-action
            v-icon blur_on
          v-list-tile-title 3D Perspective Test

        v-list-tile(:to='{name: "settings"}')
          v-list-tile-action
            v-icon settings
          v-list-tile-title Settings

        v-spacer
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
import Home from './components/Home'
import {mapState} from 'vuex'

export default {
  name: 'App',

  components: {
    Home
  },

  computed: mapState([
    'isHandsfreeLoading',
    'loading'
  ]),

  data () {
    return {
      // The favicon next to the title
      favicon: '/favicon.png',
      
      // If the navigation is open
      isNavOpen: false
    }
  },

  methods: {
    startWebcam () {this.$store.dispatch('startHandsfree')},
    stopWebcam () {this.$store.dispatch('stopHandsfree')}
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

  #loading-bar
    position: fixed
    top: 50px
    z-index: 1
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.35)

  @media screen and (max-width: 960px)
    #loading-bar
      top: 34px

  @media screen and (max-width: 724px)
    #loading-bar
      top: 42px
</style>