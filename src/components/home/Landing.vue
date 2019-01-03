<template lang="pug">
div
  v-container(grid-list-lg)
    //- Canvas
    canvas(ref='canvas')
    Handsfree
    
    //- Loading
    div.loading-mask(:class='{"fade-out": !isLoading}')
    v-layout(v-if='!isTitleVisible' :class='{"fade-out": !isLoading}' style='position: relative; z-index: 2')
      v-flex.text-xs-center(xs12 style='margin-top: 100px; text-shadow: 1px 1px 3px rgba(0,0,0,0.35); color: #fff')
        p
          img(src='/favicon.png' width=128)
        p loading...
        //- @todo Add pro-tips and other fun intermittent info

    //- Title
    v-layout.handsfree-show-when-stopped.fade-in(:class='{"faded-out": !isTitleVisible}' style='position: relative; z-index: 3')
      v-flex.text-xs-center(xs12 style='margin-top: 100px; text-shadow: 1px 1px 3px rgba(0,0,0,0.35); color: #fff')
        p.fade-in-delayed
          small With support from <a href="https://glitch.com">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, and <a href="https://opencollective.com/handsfreejs">you</a>:
        h1.font-weight-bold.mt-0.mb-2.fade-in-delayed Handsfree.js
        p.fade-in-delayed
          small Powered by <a href="https://github.com/Tastenkunst/brfv4_javascript_examples/">BRFv4</a> & <a href="https://js.tensorflow.org/">TensorFlow.js</a>
        p.fade-in-delayed A library for creating handsfree interfaces for the web and Internet of Things ✨
        p.fade-in-delayed.text-xs-center
          a(href='https://www.npmjs.com/package/handsfree')
            img.mr-2(src='https://img.shields.io/npm/v/handsfree.svg')
          a(href='https://github.com/BrowseHandsfree/handsfreeJS/commits/master')
            img.mr-2(src='https://img.shields.io/github/last-commit/BrowseHandsfree/handsfreeJS.svg')
          a(href='https://travis-ci.org/BrowseHandsfree/handsfreeJS')
            img.mr-2(src='https://travis-ci.org/BrowseHandsfree/handsfreeJS.svg?branch=master')
          a(href='https://codecov.io/gh/BrowseHandsfree/handsfreeJS')
            img.mr-2(src='https://img.shields.io/codecov/c/github/BrowseHandsfree/handsfreeJS/master.svg?style=flat')
          span(style='margin-top: 5px; display: inline-block; vertical-align: middle')
            a.github-button(href='https://github.com/browsehandsfree/handsfreejs' data-show-count='true' aria-label='Star browsehandsfree/handsfreejs on GitHub' data-icon='octicon-star') GitHub
        p.fade-in-delayed
          WebcamToggle

    .handsfree-show-when-started
      v-layout.fade-in(align-center justify-center row wrap style='z-index: 3; color: #fff')
        v-flex(md6)
          v-card
            v-card-title
              h2.text-xs-center.full-width 🐳 You are now the Space Whale 🐳
            v-card-text
              ol
                li.fade-in-delayed The Space Whale will fly towards the direction you're facing
                li.fade-in-delayed Pitch head down ("dive" downward) to scroll the page up
                li.fade-in-delayed <strong>This is a work in progress, follow me at <a href="https://twitter.com/labofoz">@labofoz</a></strong>

    //- Content
    div.push-t-50
    v-layout(row wrap style='z-index: 3')
      v-flex(xs12 md6 lg4)
        v-card
          v-card-title
            h2 What is Handsfree.js?
          v-card-text
            p <strong>Handsfree.js</strong> is a set of APIs around face tracking (<a href="https://github.com/Tastenkunst/brfv4_javascript_examples/">BRFv4</a>), eye tracking (<a href="https://webgazer.cs.brown.edu/">WebGazer</a>), and full-body pose estimation (<a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet</a>) for the purpose of creating handsfree interfaces, tools, games, and experiences!
            p In <strong>handsfree.js</strong>, you get a <code>pose</code> object for every tracked person. These <code>pose</code> objects contain useful pose properties like your head's pitch, yaw, and roll.
            p Each <code>pose</code> also has a <code>pose.cursor</code> which contain an <code>{x, y}</code> representing which pixel an imaginary laser attached to that pose would land on. You can use these cursors to dispatch native events (like clicks), allowing your users to interact with your standard HTML5 projects out-the-box!

      v-flex.hidden-md-and-down(xs12 md6 lg4)

      v-flex(xs12 md6 lg4)
        v-card
          v-card-title
            h2 Space Whales?
          v-card-text
            p <strong>Handsfree.js</strong> can be used to interface with the web, Internet of Things, and even robotics.
            p To keep everything consistent, I'll be using the Space Whale theme to introduce you to all the different concepts, tips, and tricks around <strong>Handsfree.js</strong>!
        v-card.mt-3
          v-card-text
            p <strong>Mission:</strong> To research and develop accessible, hands-free computer interfaces.
            p So on that note, let's dive further and explore how to use handsfree.js 🐳

    //- WIP
    div.push-t-50
    v-layout(row wrap justify-center style='z-index: 3')
      v-flex(xs12 md6 lg4)
        v-card
          v-card-title.text-xs-center
            h2.full-width 🚧 This is a Work in Progress 🚧
          v-card-text
            p <strong>Handsfree.js</strong> is getting overhauled for the New Year. I'll have more info soon but for now check out the old docs: <a href="https://handsfree.js.org/#/home-v1">https://handsfree.js.org/#/home-v1</a>

    //- Tweets
    div.push-t-50
    v-layout(style='margin-top: 200px' wrap)
      v-flex(xs12)
        h2(style='position: relative; color: #fff; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.35)') Check out these examples!
    
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

    //- Handsfree Starter
    div.push-t-50
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

            pre 
              code.xml.
                &lt;!DOCTYPE html>
                &lt;body>
                  &lt;button onclick="handsfree.start()">&lt;/button>
                  
                  &lt;script src="https://unpkg.com/handsfree@&lt;4/dist/handsfree.js">&lt;/script&gt;
                  &lt;script>
                    handsfree = new Handsfree()
                  &lt;/script>
                &lt;/body>

  v-container(grid-list-lg style='background: #fff')
</template>

<script>
import WebcamToggle from '../WebcamToggle'
import Handsfree from './handsfree'
import {mapState} from 'vuex'
import {debounce} from 'lodash'
const BABYLON = require('babylonjs')
import hljs from 'highlight.js'
require('babylonjs-loaders')
require('babylonjs-materials')

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
    Handsfree,
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
    // Highlighting
    window.hljs = hljs
    hljs.initHighlighting.called = false
    hljs.initHighlighting()

    // Add scripts
    let scripts = ['https://platform.twitter.com/widgets.js', 'https://buttons.github.io/buttons.js']
    scripts.forEach(script => {
      const $script = document.createElement('script')
      $script.src = script
      document.body.appendChild($script)
    })

    this.setupScene()
  },

  methods: {
    /**
     * Keep the canvas fullscreen
     */
    resizeCanvas: debounce(function () {
      if (this.babylon.engine) this.babylon.engine.resize()
    }, 100, {leading: true, trailing: true}),

    /**
     * Toggle Webcam
     */
    startWebcam () {this.$store.dispatch('startHandsfree')},
    stopWebcam () {this.$store.dispatch('stopHandsfree')},

    /**
     * Sets up the babylon scene
     */
    setupScene () {
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

        // Add whales
        BABYLON.SceneLoader.ImportMesh(null, '/3d/blue-whale/', 'scene.gltf', scene, (meshes) => {
          // Create and orient player/whale
          this.$store.commit('set', ['spacewhale.entity.player', meshes[0]])
          this.$store.state.spacewhale.entity.player.rotation.set(new BABYLON.Vector3(100, 0, 0))
          meshes[0].rotationQuaternion = null
          meshes[0].rotation.set(0, 0, 0)

          // Camera
          const camera = this.babylon.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0.5, -4), scene)
          this.$store.commit('set', ['spacewhale.camera', camera])
          camera.setTarget(new BABYLON.Vector3(0, 1, 0))
          camera.attachControl(this.$refs.canvas, false)
          scene.clearColor = new BABYLON.Color3(.16078, .10196, .18431)
          this.babylon.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(-0.25, 0.15, 1), scene)

          // Skybox
          const sky = {
            material: new BABYLON.SkyMaterial('skyMaterial', scene),
            box: BABYLON.Mesh.CreateBox('skyBox', 1000, scene)
          }
          this.$store.commit('set', ['spacewhale.entity.skybox', sky])
          sky.material.backFaceCulling = false
          sky.material.luminance = 0.01
          sky.material.turbidity = 10
          sky.material.inclination = 0.51
          sky.material.azimuth = 0.83
          sky.material.rayleigh = 6
          sky.box.material = sky.material
          
          // Start the render loop
          this.isLoading = false
          let framesRendered = 0
          setTimeout(() => scene._animationTime = 2500, 0)
          engine.runRenderLoop(() => {
            scene.render()
            this.isTitleVisible = framesRendered++ > 50
          })
        })

        // Resize
        window.addEventListener('resize', () => this.resizeCanvas())
      })
    }
  }
}
</script>

<style scoped lang="stylus">
>>>.twitter-tweet-rendered
  margin-left: auto
  margin-right: auto

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

  &.fade-out
    pointer-events: none

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
  z-index: 0

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

  for item in 1 2 3 4 5 6 7 8 9
    .fade-in-delayed:nth-child({item})
      transition-delay: 0.045s * item

>>>.fade-out
  opacity: 0
  transition: opacity 1s ease 

@media screen and (max-width: 724px)
  >>>h1
    font-size: 36px

</style>
