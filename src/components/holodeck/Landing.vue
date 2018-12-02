<template lang="pug">
  div
    HandsfreeHolodceck
    iframe#handsfree-holodeck(ref='playcanvas' src='https://playcanv.as/e/p/TmXWPE92/')

    v-container(grid-list-md)
      v-layout.mb-5(wrap)
        v-flex(xs12 md6 lg8 style='height: 500px')
        v-flex.handsfree-show-when-stopped(xs12 md6 lg4)
          v-card(light)
            v-card-text
              //- v-img(src='https://media.giphy.com/media/4HgnusIh1i8MzRoaOm/giphy.gif')
              p.mt-3
                | This experiment explores an illusion of depth effect via head tracking!
                //- |  <a href="https://glitch.com/~handsfree-youtube">Remix the YouTube Handsfree Starter Kit on Glitch to take it further</a> 🔮
            
            v-divider.my-3

            v-card-title.pb-0
              h3 Instructions
            v-card-text
              ul
                li Turn, tilt, and roll your head in the direction you want to look in
                li Physically move to get a better view
              
            v-divider.my-3

            v-card-title.pb-0
              h3 🗺️ Roadmap
            v-card-text
              p
                i 
                  a(href='https://github.com/BrowseHandsfree/handsfreeJS/issues/37') coming soon
              p.mt-4 Want to help? Pull requests welcome on <a href="https://github.com/browsehandsfree/HandsfreeJS">GitHub</a> or <a href="https://twitter.com/labofoz">@labofoz</a>
</template>

<script>
import HandsfreeHolodceck from './handsfree'

export default {
  name: 'PlayCanvasLanding',

  components: {HandsfreeHolodceck},
  
  mounted () {
    const $nav = document.querySelector('#main-nav')
    const $canvas = this.$refs.playcanvas
    
    $canvas.height = `${window.innerHeight - $nav.clientHeight}px`

    // Disable the boids plugin
    this.$store.dispatch('onReady', () => {
      window.handsfree.plugin['boids-debugger'].disable()
    })
  }
}
</script>

<style scoped lang="stylus">
>>>iframe
  position: fixed
</style>
