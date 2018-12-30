<template lang="pug">
div
  canvas(ref='canvas')
</template>

<script>
const BABYLON = require('babylonjs')

/**
 * The main landing page
 * @see https://github.com/BrowseHandsfree/handsfreeJS/issues/52
 */
export default {
  name: 'HomeLanding',

  beforeRouteLeave (to, from, next) {
    // window.handsfree.plugin.home.disable()
    next()
  },

  data () {
    return {
      // Babylon objects
      babylon: {
        engine: null,
        scene: null,
        light: null
      }
    }
  },

  mounted () {
    this.$store.dispatch('onReady', () => {
      const engine = this.babylon.engine = new BABYLON.Engine(this.$refs.canvas, true)
      const scene = this.babylon.scene = new BABYLON.Scene(engine)
      const camera = this.babylon.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene)

      // Create dummy content
      BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, scene)
      BABYLON.MeshBuilder.CreateGround('ground1', {height: 6, width: 6, subdivisions: 2}, scene)

      camera.setTarget(BABYLON.Vector3.Zero())
      camera.attachControl(this.$refs.canvas, false)
      this.babylon.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

      engine.runRenderLoop(() => {
        scene.render()
      })
    })
  },

  methods: {
  }
}
</script>

<style scoped lang="stylus">
>>>canvas
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
</style>
