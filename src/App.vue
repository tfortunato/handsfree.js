<template lang="pug">
  v-app
    v-toolbar(app)
      v-toolbar-title.headline.text-uppercase
        span.mr-3 Handsfree.js
      v-spacer
      a(href='https://github.com/BrowseHandsfree/handsfreeJS/releases')
        img(src='https://img.shields.io/github/release-pre/browsehandsfree/handsfreejs.svg')

    v-content
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
