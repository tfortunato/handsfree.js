<template lang="pug">
  div
    iframe(ref='playcanvas' src='https://playcanv.as/b/I1zzSILd/')
    v-container(grid-list-md)
      v-layout.mb-5(wrap)
        v-flex(xs12 md6 lg8)
        v-flex(xs12 md6 lg4)
          v-card(light)
            v-card-title
              h2 Roadmap
</template>

<script>
export default {
  name: 'PlayCanvasLanding',
  mounted () {
    const $nav = document.querySelector('#main-nav')
    const $canvas = this.$refs.playcanvas
    
    $canvas.height = `${window.innerHeight - $nav.clientHeight}px`
  }
}
</script>

<style scoped lang="stylus">
>>>iframe
  position: fixed
</style>
