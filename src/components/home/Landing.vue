<template lang="pug">
div
  canvas(ref='canvas')
</template>

<script>
const BABYLON = require('babylonjs')
const {debounce} = require('lodash')
require('babylonjs-loaders')

/**
 * The main landing page
 * @see https://github.com/BrowseHandsfree/handsfreeJS/issues/52
 * 
 * @todo Attributions:
 * - Whale model:  https://sketchfab.com/models/d24d19021c724c3a9134eebcb76b0e0f#download 
 */
export default {
  name: 'HomeLanding',

  /**
   * Free memory and disable plugins
   */
  beforeRouteLeave (to, from, next) {
    if (this.babylon.engine) {
      this.babylon.engine.stopRenderLoop()
      this.babylon.scene.dispose()
    }
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

  /**
   * Create the scene
   */
  mounted () {
    this.$store.dispatch('onReady', () => {
      const engine = this.babylon.engine = new BABYLON.Engine(this.$refs.canvas, true)
      const scene = this.babylon.scene = new BABYLON.Scene(engine)

      // Add whales
      BABYLON.SceneLoader.Append('/3d/blue-whale/', 'scene.gltf', scene, scene => {
        const camera = this.babylon.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0.5, -4), scene)
        camera.setTarget(new BABYLON.Vector3(0, 1, 0))
        camera.attachControl(this.$refs.canvas, false)
        this.babylon.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

        // Start the render loop
        engine.runRenderLoop(() => {scene.render()})
      })

      // Resize
      window.addEventListener('resize', () => this.resizeCanvas())
    })
  },

  methods: {
    /**
     * Keep the canvas fullscreen
     */
    resizeCanvas: debounce(function () {
      if (this.babylon.engine) this.babylon.engine.resize()
    }, 100, {leading: true, trailing: true})
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
