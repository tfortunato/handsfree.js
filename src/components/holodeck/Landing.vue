<template lang="pug">
div
  iframe#handsfree-holodeck(ref='playcanvas' src='https://playcanv.as/e/p/TmXWPE92/')
  UseHandsfree
</template>

<script>
import UseHandsfree from './handsfree'

export default {
  name: 'PlayCanvasLanding',

  components: {UseHandsfree},
  
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
