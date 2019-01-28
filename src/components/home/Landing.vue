<template lang="pug">
div
  v-container(grid-list-lg)
    v-layout.mb-5(justify-center wrap)
      v-flex(mb-4 xs12 md6)
        h1.text-xs-center.display-2.font-weight-bold.mb-3(style='margin-top: 250px') Handsfree.js
        p.text-xs-center
          | With support from <a href="https://glitch.com">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, and you:
        p.text-xs-center
          a(href='https://www.npmjs.com/package/handsfree')
            img.mr-2(src='https://img.shields.io/npm/v/handsfree.svg')
          a(href='https://github.com/labofoz/handsfree.js/commits/master')
            img.mr-2(src='https://img.shields.io/github/last-commit/labofoz/handsfree.js.svg')
          a(href='https://travis-ci.org/labofoz/handsfree.js')
            img.mr-2(src='https://travis-ci.org/labofoz/handsfree.js.svg?branch=master')
          a(href='https://codecov.io/gh/labofoz/handsfree.js')
            img.mr-2(src='https://img.shields.io/codecov/c/github/labofoz/handsfree.js/master.svg?style=flat')
          span(style='margin-top: 5px; display: inline-block; vertical-align: middle')
            a.github-button(href='https://github.com/labofoz/handsfree.js' data-show-count='true' aria-label='Star labofoz/handsfree.js on GitHub' data-icon='octicon-star') GitHub
        p.subheading.font-weight-regular
          | A drop-in library for adding handsfree interfaces to any website, service, and Internet of Thing. Runs on any device that supports <a href="https://caniuse.com/#feat=stream">getUserMedia()</a>
        p.text-xs-center
          v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam' :disabled='isHandsfreeLoading')
            v-icon.mr-2 videocam
            | Start Webcam
          v-btn.primary.handsfree-show-when-started.hidden(large color='error' @click='stopWebcam')
            v-icon.mr-2 videocam_off
            | Stop Webcam
        p.text-xs-center
          small Powered by <a href="https://github.com/Tastenkunst/brfv4_javascript_examples">BRFv4</a> and <a href="https://js.tensorflow.org/">TensorFlow.js</a>

      v-flex(mb-4 xs12 md6)
        v-card(light)
          v-card-title(primary-title)
            h2.headline.mb-0 🎨 Try It
          v-card-text
            p Smile wide to start a click and make a normal face to release it. Lean in and back to adjust brush size. <a href="https://glitch.com/~handsfree-drawing">Try the Handsfree Drawing Starter Kit on Glitch</a>.
            canvas#paperjs(style='width: 100%; height: 400px; box-shadow: 0 0 3px rgba(0,0,0,0.35)' resize)
            div
              v-btn.mx-0(large color='primary' @click='clearDrawing' style='width: 100%;')
                v-icon.mr-2 refresh
                | Clear Drawing

    //- Going further
    v-layout(justify-center style='margin-top: 200px')
      v-flex(xs12 md8)
        v-card(light)
          v-card-text
            p.text-xs-center
              img(src='/favicon.png' width=100)
            h2.mb-3.text-xs-center Quickstart
            p By default, Handsfree.js is configured for web browsing: clicking, typing, and page scrolling all work out the box with no setup!
            pre 
              code.xml.
               &lt;!DOCTYPE html&gt;
                &lt;body&gt;
                  &lt;script src="https://unpkg.com/handsfree@&lt;5/dist/handsfree.js">&lt;/script&gt;
                  &lt;script&gt;
                    handsfree = new Handsfree()
                    handsfree.start()
                  &lt;/script&gt;
                &lt;/body&gt;

            p
              v-btn(large block color='primary' :to='{name: "docs"}') Explore the Docs

    //- Tweets
    v-layout(style='margin-top: 200px' wrap)
      v-flex(xs12)
        h1 Check out these examples
    
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">🔮 Check it out! <a href="https://t.co/IzYryASdhe">https://t.co/IzYryASdhe</a><br><br>It&#39;s not &quot;holographic&quot; yet, but the 360 controls are actually easy to use now! I was over engineering it, see the /starter.js for how I&#39;m doing it: <a href="https://t.co/W1xDMeZU88">https://t.co/W1xDMeZU88</a><br><br>Try some others here: <a href="https://t.co/fBmF1AFm2B">https://t.co/fBmF1AFm2B</a> <a href="https://t.co/iIZGMHcDJ0">pic.twitter.com/iIZGMHcDJ0</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1069060554503815169?ref_src=twsrc%5Etfw">December 2, 2018</a></blockquote>
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">A starter kit to build head controlled tools, games, and experiences. &quot;handsfree-starter&quot; by <a href="https://twitter.com/LabOfOz?ref_src=twsrc%5Etfw">@labofoz</a> <a href="https://t.co/J8K8dR2XMn">https://t.co/J8K8dR2XMn</a> 🤯 <a href="https://t.co/nlcyjpnFrI">pic.twitter.com/nlcyjpnFrI</a></p>&mdash; 🎏Glitch (@glitch) <a href="https://twitter.com/glitch/status/1069640435428134912?ref_src=twsrc%5Etfw">December 3, 2018</a></blockquote>
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Smile with Caution! Mixing <a href="https://twitter.com/hashtag/Minesweeper?src=hash&amp;ref_src=twsrc%5Etfw">#Minesweeper</a> + <a href="https://t.co/n99yMYKqW7">https://t.co/n99yMYKqW7</a> = <a href="https://twitter.com/hashtag/Smilesweeper?src=hash&amp;ref_src=twsrc%5Etfw">#Smilesweeper</a> <br>Demo: <a href="https://t.co/HBXt3TcvfX">https://t.co/HBXt3TcvfX</a><br>Code: <a href="https://t.co/pS3oABf1pY">https://t.co/pS3oABf1pY</a><br>Credit: <a href="https://twitter.com/LabOfOz?ref_src=twsrc%5Etfw">@LabOfOz</a> <a href="https://twitter.com/sirajraval?ref_src=twsrc%5Etfw">@sirajraval</a> <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://t.co/5PyqDC6Jj5">pic.twitter.com/5PyqDC6Jj5</a></p>&mdash; Eddy (@Eddywi) <a href="https://twitter.com/Eddywi/status/1057344666402664448?ref_src=twsrc%5Etfw">October 30, 2018</a></blockquote>
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;duckhunt-handsfree&quot; by <a href="https://twitter.com/LabOfOz?ref_src=twsrc%5Etfw">@labofoz</a> is a recreation of the arcade classic shooting game, but using your webcam to control the sight and trigger <a href="https://t.co/dn8ZwWGLp9">https://t.co/dn8ZwWGLp9</a> 😗🦆 <a href="https://t.co/szfcpwEc6X">pic.twitter.com/szfcpwEc6X</a></p>&mdash; 🎏Glitch (@glitch) <a href="https://twitter.com/glitch/status/1063193718172381186?ref_src=twsrc%5Etfw">November 15, 2018</a></blockquote>
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 002: Pan and Zoom Google Maps Handsfree 🧙‍♂️<br>Glitch: <a href="https://t.co/HMi0ir4z0H">https://t.co/HMi0ir4z0H</a> …<br>Tutorial: <a href="https://t.co/S0Oxe9rGyF">https://t.co/S0Oxe9rGyF</a> …<br><br>Day 3: Today I also launched a forum, the placeholder for <a href="https://t.co/w99puonGRG">https://t.co/w99puonGRG</a> , and continued studying Image Segmentation! <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/ZKL9HIa329">pic.twitter.com/ZKL9HIa329</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1063644373043171328?ref_src=twsrc%5Etfw">November 17, 2018</a></blockquote>
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 005: Handsfree DOOM 🤘<br>Glitch: <a href="https://t.co/PLhrNtNZsQ">https://t.co/PLhrNtNZsQ</a><br><br>Day 6: Works best on desktops for now, once settings API is in place it will be performant on mobile devices too! Tutorial in next day or so <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/09qlGMK0eE">pic.twitter.com/09qlGMK0eE</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1064765062416523264?ref_src=twsrc%5Etfw">November 20, 2018</a></blockquote>

  //- Going further
  v-container(style='margin-top: 200px; margin-bottom: 200px')
    v-layout(justify-center)
      v-flex(xs12 md8)
        v-card(light)
          v-card-text
            p.text-xs-center
              img(src='/favicon.png' width=100)
            p.text-xs-center
              img(src='https://media.giphy.com/media/3Z15Ve7WEQGkLa1FwC/giphy.gif')
            h2.text-xs-center.headline.mb-5 <strong>Going Further:</strong> Try the Handsfree Starter
            p <a href="https://glitch.com/~handsfree-starter">The Handsfree Starter on Glitch</a> is a slimmed down version of this site, designed to help you prototype quickly. If you'd rather work on something locally, here's the bare minimum you need:

            p
              v-btn(large block color='primary' href='https://glitch.com/~handsfree-starter') Remix the Handsfree Starter
</template>

<script>
import hljs from 'highlight.js'
import './handsfree.js'
import {mapState} from 'vuex'

export default {
  computed: mapState(['isHandsfreeLoading']),
  
  data () {
    return {
      // Stepper
      currentStep: 1,

      steps: [
        'Install',
        'Config',
        'Plugins',
        'Events',
        '$target'
      ]
    }
  },
  
  mounted () {
    window.hljs = hljs
    hljs.initHighlighting.called = false
    hljs.initHighlighting()

    // @TODO Let's make use of plugin enable/disables
    window.handsfree && window.handsfree.plugin.PaperDraw.reInit()
    window.addEventListener('load', () => {window.handsfree.plugin.PaperDraw.reInit()})

    // Add scripts
    let scripts = ['https://platform.twitter.com/widgets.js', 'https://buttons.github.io/buttons.js']
    scripts.forEach(script => {
      const $script = document.createElement('script')
      $script.src = script
      document.body.appendChild($script)
    })
  },

  methods: {
    startWebcam () {window.handsfree.start()},
    stopWebcam () {window.handsfree.stop()},
    clearDrawing () {window.paper.project.clear()}
  }
}
</script>

<style scoped lang="stylus">
h1
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5)
</style>
