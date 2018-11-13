<template lang="pug">
  v-container.mt-5
    v-layout.mt-5(justify-center text-xs-center wrap)
      v-flex(mb-4 xs12 md6)
        h1.display-2.font-weight-bold.mb-3 Handsfree.js
        p
          img.mr-2(src='https://img.shields.io/npm/v/handsfree.svg')
          img.mr-2(src='https://img.shields.io/github/last-commit/BrowseHandsfree/handsfreeJS.svg')
          img.mr-2(src='https://travis-ci.org/BrowseHandsfree/handsfreeJS.svg?branch=master')
          img(src='https://img.shields.io/codecov/c/github/BrowseHandsfree/handsfreeJS/master.svg?style=flat')
        p.subheading.font-weight-regular.text-xs-left
          | A JavaScript drop-in library for adding handsfree interfaces to any website, service, and Internet of Thing. Runs on any device that supports <a href="https://caniuse.com/#feat=stream">getUserMedia()</a>.
</template>

<script>
  export default {
  }
</script>

<style scoped lang="stylus">
  h1
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5)
</style>
