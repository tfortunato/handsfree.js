<template lang="pug">
v-container(grid-list-lg)
  canvas(ref='canvas')
  v-layout.fade-in(:class='{"faded-out": !isTitleVisible}')
    v-flex.text-xs-center(xs12 style='margin-top: 100px; text-shadow: 1px 1px 3px rgba(0,0,0,0.35)')
      p
        small Presented by <a href="https://twitter.com/labofoz">@LabofOz</a>
      h1.display-2.font-weight-bold.mt-0.mb-3 Handsfree.js
      p
        small with support from <a href="https://glitch.com">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, and <a href="https://opencollective.com/handsfreejs">you!</a>
      p
</template>

<script>
const BABYLON = require('babylonjs')
const {debounce} = require('lodash')
const cloudFragShader = require('../../../public/shaders/iq-clouds/shader.frag')
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
      // Used to set .hidden on the hero text
      isTitleVisible: false,
      
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
        scene.clearColor = new BABYLON.Color3(.8, .3, .1)
        this.babylon.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

        // Start the render loop
        let framesRendered = 0
        engine.runRenderLoop(() => {
          scene.render()
          this.isTitleVisible = framesRendered++ > 200
        })
      })

      BABYLON.Effect.ShadersStore['basicFragmentShader'] = cloudFragShader

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
>>>h1
  color: #fff
  font-size: 72px
  font-weight: 900
  text-align: center
  display: block
  width: 100%
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.35)

>>>canvas
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  z-index: -1

>>>.fade-in
  opacity: 1
  transition: opacity 0.5s ease

  &.faded-out
    opacity: 0
</style>
