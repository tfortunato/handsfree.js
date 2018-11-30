<template lang="pug">
  v-container(grid-list-md)
    v-layout.mb-5(justify-center wrap align-center)
      v-flex(mb-4 xs12 md6 style='margin-top: 300px')
        h1.text-xs-center.display-2.font-weight-bold.mb-3 BrowseHandsfree
        p.text-xs-center
          | Powered by <a style="color: rgb(255, 82, 82); font-weight: bold" href="https://handsfree.js.org">handsfree.js</a>
        p.text-xs-center 
          a(href='https://github.com/BrowseHandsfree/BrowseHandsfree/releases')
            img.ml-2(style='vertical-align: bottom' src='https://img.shields.io/github/release-pre/browsehandsfree/browsehandsfree.svg')
          a(href='https://github.com/BrowseHandsfree/BrowseHandsfree/commits/master')
            img.ml-2(style='vertical-align: bottom' src='https://img.shields.io/github/last-commit/BrowseHandsfree/BrowseHandsfree.svg')

        p.text-xs-center
        p.subheading.font-weight-regular.text-xs-center
          | A platform for browsing the web totally handsfree using head tracking 🔮
        p.text-xs-center
          v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam') Start Webcam
          v-btn.primary.handsfree-show-when-started.hidden(large color='error' @click='stopWebcam') Stop Webcam
        p.text-xs-center
          <strong>🚧 Note:</strong> Works best if you don't have glasses and a full beard at the same time. This will be fixed soon! 🚧

      v-flex(mb-4 xs12 md6)
        v-card(light)
          v-card-title(primary-title)
            h2.headline.mb-0 Demo: <strong>{{demo.name}}</strong>
          v-card-text
            Demo

      v-layout(style='margin-top: 200px' wrap)
        v-flex(xs12)
          h1.mb-5 Some Experiments: <a style="color: #ff5252; text-shadow: none" href="https://glitch.com/@handsfreejs">These will be fully implemented here soon!</a>
      
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 005: Handsfree DOOM 🤘<br>Glitch: <a href="https://t.co/PLhrNtNZsQ">https://t.co/PLhrNtNZsQ</a><br><br>Day 6: Works best on desktops for now, once settings API is in place it will be performant on mobile devices too! Tutorial in next day or so <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/09qlGMK0eE">pic.twitter.com/09qlGMK0eE</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1064765062416523264?ref_src=twsrc%5Etfw">November 20, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 003: A-Magic Window, built on <a href="https://twitter.com/aframevr?ref_src=twsrc%5Etfw">@aframevr</a><br>Glitch: <a href="https://t.co/rYXOxjWHMp">https://t.co/rYXOxjWHMp</a><br>More info: <a href="https://t.co/pA1D9XP9Er">https://t.co/pA1D9XP9Er</a><br><br>Day 4: Making more progress on realtime Image Segmentation. Also started the handsfree YouTube client for BrowseHandsfree (demo soon!) <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/ujBkhTYCZ1">pic.twitter.com/ujBkhTYCZ1</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1063934103269990400?ref_src=twsrc%5Etfw">November 17, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;duckhunt-handsfree&quot; by <a href="https://twitter.com/LabOfOz?ref_src=twsrc%5Etfw">@labofoz</a> is a recreation of the arcade classic shooting game, but using your webcam to control the sight and trigger <a href="https://t.co/dn8ZwWGLp9">https://t.co/dn8ZwWGLp9</a> 😗🦆 <a href="https://t.co/szfcpwEc6X">pic.twitter.com/szfcpwEc6X</a></p>&mdash; 🎏Glitch (@glitch) <a href="https://twitter.com/glitch/status/1063193718172381186?ref_src=twsrc%5Etfw">November 15, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Smile with Caution! Mixing <a href="https://twitter.com/hashtag/Minesweeper?src=hash&amp;ref_src=twsrc%5Etfw">#Minesweeper</a> + <a href="https://t.co/n99yMYKqW7">https://t.co/n99yMYKqW7</a> = <a href="https://twitter.com/hashtag/Smilesweeper?src=hash&amp;ref_src=twsrc%5Etfw">#Smilesweeper</a> <br>Demo: <a href="https://t.co/HBXt3TcvfX">https://t.co/HBXt3TcvfX</a><br>Code: <a href="https://t.co/pS3oABf1pY">https://t.co/pS3oABf1pY</a><br>Credit: <a href="https://twitter.com/LabOfOz?ref_src=twsrc%5Etfw">@LabOfOz</a> <a href="https://twitter.com/sirajraval?ref_src=twsrc%5Etfw">@sirajraval</a> <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://t.co/5PyqDC6Jj5">pic.twitter.com/5PyqDC6Jj5</a></p>&mdash; Eddy (@Eddywi) <a href="https://twitter.com/Eddywi/status/1057344666402664448?ref_src=twsrc%5Etfw">October 30, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 002: Pan and Zoom Google Maps Handsfree 🧙‍♂️<br>Glitch: <a href="https://t.co/HMi0ir4z0H">https://t.co/HMi0ir4z0H</a> …<br>Tutorial: <a href="https://t.co/S0Oxe9rGyF">https://t.co/S0Oxe9rGyF</a> …<br><br>Day 3: Today I also launched a forum, the placeholder for <a href="https://t.co/w99puonGRG">https://t.co/w99puonGRG</a> , and continued studying Image Segmentation! <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/ZKL9HIa329">pic.twitter.com/ZKL9HIa329</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1063644373043171328?ref_src=twsrc%5Etfw">November 17, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Finished implementing the first stretch of the handsfree YouTube workflow on <a href="https://t.co/sythDbZSPq">https://t.co/sythDbZSPq</a>. Now you can:<br><br>- Start/stop videos<br>- Look around<br>- Navigate to different pages (w/o turning cam off)<br>- Load new videos <a href="https://t.co/a8xrZ6w6F1">pic.twitter.com/a8xrZ6w6F1</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1064413285812817920?ref_src=twsrc%5Etfw">November 19, 2018</a></blockquote>

    v-container(style='margin-top: 200px; margin-bottom: 200px')
      v-layout(justify-center)
        v-flex(xs12 md8)
          v-card(light)
            v-card-text
              p.text-xs-center
                img(src='/favicon.png' width=100)
              p.text-xs-center
                img(src='https://media.giphy.com/media/3Z15Ve7WEQGkLa1FwC/giphy.gif')
              h2.text-xs-center.headline.mb-5 <strong>Calling Developers:</strong> Try the Handsfree Starter!
              p <a href="https://glitch.com/~handsfree-starter">The Handsfree Starter on Glitch</a> introduces you to our library <a href="https://handsfree.js.org">handsfree.js</a>, which is what powers this site. Learn how to create your own accessible games, tools, and experiences in just a few lines of code with no prior computer vision or machine learning experience necessary.
              p.text-xs-center
                v-btn(large color='success' href='https://glitch.com/~handsfree-starter') Remix the Handsfree Starter 🕹️
</template>

<script>
import Demo from './Demo'

export default {
  name: 'HomeBrowseHandsfree',

  created () {
    const $script = document.createElement('script')
    $script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    document.body.appendChild($script)
  },
  mounted () {
    this.maybeInitVideo()

    // Add scripts
    let scripts = ['https://platform.twitter.com/widgets.js', 'https://buttons.github.io/buttons.js']
    scripts.forEach(script => {
      const $script = document.createElement('script')
      $script.src = script
      document.body.appendChild($script)
    })
  },

  components: {
    Demo
  },

  /**
   * Stop the video before navigation
   */
  beforeRouteLeave (to, from, next) {
    this.$store.state.youtube.player.stopVideo && this.$store.state.youtube.player.stopVideo()
    next()
  },
  
  data: () => ({
    demo: {
      name: 'Handsfree YouTube 360'
    }
  }),
  
  methods: {
    startWebcam () {window.handsfree.start()},
    stopWebcam () {window.handsfree.stop()},

    /**
     * Attempts to instantiate the video repeteadly until it works
     */
    maybeInitVideo () {this.$store.dispatch('youtube/setupPlayer')}
  }
}
</script>

<style scoped lang="stylus">
  h1
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5)
</style>
