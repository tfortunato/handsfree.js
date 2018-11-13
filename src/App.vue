<template lang="pug">
  v-app(dark)
    v-toolbar(light app)
      v-toolbar-title.headline.text-uppercase
        span.mr-3 Handsfree.js
      v-spacer
      a(href='https://github.com/BrowseHandsfree/handsfreeJS/releases')
        img(src='https://img.shields.io/github/release-pre/browsehandsfree/handsfreejs.svg')

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
  data () {
    return {
      //
    }
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