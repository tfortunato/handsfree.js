<template lang="pug">
  v-container(style='margin-top: 300px')
    v-layout.mb-5(justify-center wrap)
      v-flex(mb-4 xs12 md6)
        h1.text-xs-center.display-2.font-weight-bold.mb-3 Handsfree.js
        p.text-xs-center
          img.mr-2(src='https://img.shields.io/npm/v/handsfree.svg')
          img.mr-2(src='https://img.shields.io/github/last-commit/BrowseHandsfree/handsfreeJS.svg')
          img.mr-2(src='https://travis-ci.org/BrowseHandsfree/handsfreeJS.svg?branch=master')
          img(src='https://img.shields.io/codecov/c/github/BrowseHandsfree/handsfreeJS/master.svg?style=flat')
        p.subheading.font-weight-regular
          | A JavaScript drop-in library for adding handsfree interfaces to any website, service, and Internet of Thing. Runs on any device that supports <a href="https://caniuse.com/#feat=stream">getUserMedia()</a>.
        p.text-xs-center
          v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam') Start Webcam
          v-btn.primary.handsfree-show-when-started.hidden(large @click='stopWebcam') Stop Webcam
    
    v-layout(justify-center style='margin-top: 200px')
      v-flex(xs12 md8)
        v-card(light)
          v-card-title(primary-title)
            div
              h2.headline.mb-0 Installation
          v-card-text
            h3 With HTML:
            p This is how we encourage you to use Handsfree.js when using standard web technologies or when experimenting on sites like <a href="https://glitch.com">Glitch.com</a> and <a href="https://codepen.com">CodePen</a>:
            pre 
              code.xml. 
                &lt;script src="https://unpkg.com/handsfree@2"&gt;&lt;/script&gt;
                &lt;script&gt;
                  handsfree = new Handsfree()
                  handsfree.start()
                &lt;/script&gt;
            
            h3 With Node:
            p When developing for the Internet of Things or non-browser based environments, we encourage you to use the below method:
            pre
              code.bash npm install handsfree

            div then:
            pre 
              code.javascript.
                import Handsfree from 'handsfree'
                const handsfree = new Handsfree()
                handsfree.start()
</template>

<script>
import hljs from 'highlight.js'

export default {
  mounted () {
    window.hljs = hljs
    hljs.initHighlighting()
  },

  methods: {
    startWebcam () {window.handsfree.start()},
    stopWebcam () {window.handsfree.stop()}
  }
}
</script>

<style scoped lang="stylus">
  h1
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5)
</style>
