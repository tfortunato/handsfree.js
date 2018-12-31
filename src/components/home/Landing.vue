<template lang="pug">
v-container(grid-list-lg)
  //- Canvas
  canvas(ref='canvas')
  
  //- Loading
  div.loading-mask(:class='{"fade-out": !isLoading}')
  v-layout(v-if='!isTitleVisible' :class='{"fade-out": !isLoading}' style='position: relative; z-index: 2')
    v-flex.text-xs-center(xs12 style='margin-top: 100px; text-shadow: 1px 1px 3px rgba(0,0,0,0.35)')
      p
        img(src='/favicon.png' width=128)
      p loading...
      //- @todo Add pro-tips and other fun intermittent info

  //- Title
  v-layout.flex.handsfree-show-when-stopped.fade-in(:class='{"faded-out": !isTitleVisible}' style='position: relative; z-index: 3')
    v-flex.text-xs-center(xs12 style='margin-top: 100px; text-shadow: 1px 1px 3px rgba(0,0,0,0.35)')
      p.fade-in-delayed
        small With support from <a href="https://glitch.com">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, and <a href="https://opencollective.com/handsfreejs">you</a>:
      h1.font-weight-bold.mt-0.mb-3.fade-in-delayed Handsfree.js
      p.fade-in-delayed A library for creating handsfree interfaces for the web and Internet of Things ✨
      p.fade-in-delayed
        WebcamToggle
      p.fade-in-delayed
        small Powered by <a href="https://github.com/Tastenkunst/brfv4_javascript_examples/">BRFv4</a> & <a href="https://js.tensorflow.org/">TensorFlow.js</a>
</template>

<script>
import WebcamToggle from '../WebcamToggle'
const {mapState} = require('vuex')
const {debounce} = require('lodash')
const BABYLON = require('babylonjs')
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

  components: {
    WebcamToggle
  },
  
  computed: mapState([
    'isHandsfreeLoading'
  ]),

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

      // Whether we're loading (true) or not (false)
      isLoading: true,
      
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
      const Component = this
      const engine = this.babylon.engine = new BABYLON.Engine(this.$refs.canvas, true)
      const scene = this.babylon.scene = new BABYLON.Scene(engine)

      // Loading screen
      const handsfreeLoadingScreen = function () {
        this.displayLoadingUI = function () {Component.isLoading = true}
        this.hideLoadingUI = function () {Component.isLoading = false}
      }
      engine.loadingScreen = new handsfreeLoadingScreen()
      // engine.loadingUIText = 'rendering metaverse...'

      // Add whales
      BABYLON.SceneLoader.Append('/3d/blue-whale/', 'scene.gltf', scene, scene => {
        const camera = this.babylon.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0.5, -4), scene)
        camera.setTarget(new BABYLON.Vector3(0, 1, 0))
        camera.attachControl(this.$refs.canvas, false)
        scene.clearColor = new BABYLON.Color3(.16078, .10196, .18431)
        this.babylon.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

        this.isLoading = false

        // Start the render loop
        let framesRendered = 0
        engine.runRenderLoop(() => {
          scene.render()
          this.isTitleVisible = framesRendered++ > 200
        })
      })

      // Shader
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
    }, 100, {leading: true, trailing: true}),

    startWebcam () {this.$store.dispatch('startHandsfree')},
    stopWebcam () {this.$store.dispatch('stopHandsfree')}
  }
}
</script>

<style scoped lang="stylus">
// @todo Move these into helper files
>>>.loading-mask
  position: fixed
  z-index: 1
  background: #291a2f
  opacity: 1
  top: 0
  left: 0
  width: 100%
  height: 100%
  transition: opacity 1s ease

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

.fade-in-delayed
  opacity: 0
  top: -20px

>>>.fade-in
  opacity: 1
  transition: opacity 0.5s ease

  &.faded-out
    opacity: 0

    .fade-in-delayed
      opacity: 0
      top: -20px

  .fade-in-delayed
    opacity: 1
    position: relative
    top: 0px
    transition: opacity 0.75s ease, top 0.75s ease

  for item in 1 2 3 4 5
    .fade-in-delayed:nth-child({item})
      transition-delay: 0.045s * item

>>>.fade-out
  opacity: 0
  transition: opacity 1s ease 

body.handsfree-stopped .handsfree-show-when-stopped
  display: flex
</style>
