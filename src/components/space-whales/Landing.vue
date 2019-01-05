<template lang="pug">
div
  v-container(grid-list-lg)
    //- Canvas
    canvas(ref='canvas' :class='{"fade-in": !isLoading}')
    Handsfree
    
    //- Title
    v-layout.fade-in(style='position: relative; z-index: 3')
      v-flex.text-xs-center(xs12 style='margin-top: 100px; text-shadow: 1px 1px 3px rgba(0,0,0,0.35); color: #fff')
        p.fade-in-delayed
          small With support from <a href="https://glitch.com">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, and you (link soon!):
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
        p(v-if='isLoading') 
          | Whistling in the Space Whales
          v-progress-circular.ml-3(indeterminate color='primary')

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

  //- Instructions
  .push-t-50(style='background: #fff; position: relative')
    v-container(ref='instructions' grid-list-lg)
      v-layout(justify-center)
        v-flex(xs12 md8)
          v-stepper(v-model='currentStep' alt-labels)
            v-stepper-header
              template(v-for='(step, i) in steps')
                v-stepper-step(:complete='currentStep > i + 1' :step='i + 1' editable) {{step}}
                v-divider(v-if='i < steps.length - 1')
          
            v-stepper-items
              //- Step 1
              v-stepper-content(step='1')
                v-card
                  v-card-title(primary-title)
                    h2.headline.mb-0 Installation
                  v-card-text
                    h3 With HTML:
                    p This is how we encourage you to use Handsfree.js when using standard web technologies or when experimenting on sites like <a href="https://glitch.com/~handsfree-starter">Glitch.com (check out the Handsfree Starter!)</a>:
                    pre 
                      code.xml.
                       &lt;!-- Latest with version patches (Recommended for production) --&gt;
                        &lt;script src="https://unpkg.com/handsfree@&lt;3.1/dist/handsfree.js">&lt;/script&gt;

                        &lt;!-- Latest with new features (Recommended for development) --&gt;
                        &lt;script src="https://unpkg.com/handsfree@&lt;4/dist/handsfree.js">&lt;/script&gt;

                        &lt;!-- Latest with potential backwards incompatability (Recommended for testers) --&gt;
                        &lt;script src="https://unpkg.com/handsfree/dist/handsfree.js">&lt;/script&gt;

                        &lt;script&gt;
                          handsfree = new Handsfree()
                          handsfree.start()
                        &lt;/script>

                    h3 With Node:
                    p When developing for the Internet of Things or non-browser based environments, we encourage you to use the below method:
                    pre
                      code.bash npm install handsfree

                    div then:
                    pre 
                      code.javascript.
                       import Handsfree from 'handsfree'
                        const handsfree = new Handsfree()
                        handsfree.start()

              //- Step 2
              v-stepper-content(step='2')
                v-card
                  v-card-title(primary-title)
                    h2.headline.mb-0 Settings
                  v-card-text
                    p When instantiating <code>Handsfree</code>, you can pass in a config object.
                    pre
                      code.javascript.
                       const handsfree = new Handsfree({
                          // Whether to show (true) the debugger (face mask over video) or not (false)
                          debug: false,

                          // Available settings
                          settings: {
                            // Maximum number of faces to track
                            maxFaces: 1,

                            sensitivity: {
                              // A factor to adjust the cursors move speed by
                              xy: 0.7,
                              // How much wider (+) or narrower (-) a smile needs to be to click
                              click: 0
                            },

                            stabilizer: {
                              // How much stabilization to use: 0 = none, 3 = heavy
                              factor: 1,
                              // Number of frames to stabilizer over
                              buffer: 30
                            }
                          }
                        })

                    p Settings can later be updated with <code>handsfree.settings['my.setting'] = newValue;</code>
              
              //- Step 3
              v-stepper-content(step='3')
                v-card
                  v-card-title(primary-title)
                    h2.headline.mb-0 Adding Plugins
                  v-card-text
                    p Handsfree.js is built around plugins. Plugins have several callbacks that hook into different events, and are added with <code>handsfree.use(config)</code>.
                    p Each callback receives two arguments, <code>(faces, instance)</code>. <code>instance</code> refers to the <code>new Handsfree</code> instance you created. <code>faces</code> contains the following:
                    pre
                      code.javascript.
                       {
                          cursor: {
                            // Where on the screen the user is pointed at
                            x: 0,
                            y: 0,
                            
                            // The target currently under the mouse
                            $target: 0,
                            
                            // Mouse states for this face
                            state: {
                              // The first frame of a click
                              mouseDown: false,
                              // Every subsequent frame of a click
                              mouseDrag: false,
                              // When the click is finally released
                              mouseUp: false
                            }
                          },
                          
                          // A list of all 64 landmarks
                          points: [{x, y}, ...],
                        
                          // The head's pitch (facing up/down)
                          rotationX: 0,
                          // The head's yaw (facing left/right)
                          rotationY: 0,
                          // The head's roll (as if doing a cartwheel while facing straight ahead)
                          rotationZ: 0,
                        
                          // The heads overall size within the camera
                          scale: 0,
                        
                          // Where the head is relative to the left edge of the video feed
                          translationX: 0,
                          // Where the head is relative to the top edge of the video feed
                          translationY: 0
                        }
                        
                    p Here are the landmark points, with #27 being the reference point for rotation/translation:
                    p
                      img(src='../../assets/img/brfv4_landmarks.jpg')

                    p The following are the available plugin methods:
                    pre
                      code.javascript.
                       const myPlugin = handsfree.use({
                          // Must be unique. Spaces and special characters are fine
                          name: '',

                          // The plugins execution priority
                          // - Lower numbers run before higher numbers
                          // - Numbers can be negative and fractional
                          priority: 10,

                          // Set to true to have this plugin disabled by default
                          _isDisabled: false,

                          // Called once when the use method is called and after the plugin is added to the instance
                          onUse: () => {},

                          // Called once per frame, after calculations, along with the detected face object
                          // To overwrite/modify the properties of faces for use within other plugins, return the faces object
                          onFrame: (faces, handsfree) => {},

                          // Called any time Handsfree.start() is called
                          onStart: (handsfree) => {},

                          // Called any time Handsfree.stop() is called
                          onStop: (handsfree) => {},

                          // Called when .disable() is explicitely called on this plugin
                          onDisable: (handsfree) => {},

                          // Called when .enable() is explicitely called on this plugin
                          onEnable: (handsfree) => {},

                          // Called the first frame a face clicks
                          onMouseDown: (face, faceIndex) => {},

                          // Called every frame after a face clicks and is still in "click mode"
                          onMouseDrag: (face, faceIndex) => {},

                          // Called after a face releases a click
                          onMouseUp: (face, faceIndex) => {}
                        })

                    p Additionally, every plugin has a <code>.disable()</code> and an <code>.enable()</code> method, which sets a <code>._isDisabled</code> flag to either true or false:
                    pre
                      code.javascript.
                       handsfree.plugin['my-plugin'].disable() // handsfree.plugin['my-plugin']._isDisabled === true
                        handsfree.plugin['my-plugin'].enable() // handsfree.plugin['my-plugin']._isDisabled === false
                        
                    p Here's what our page scrolling plugin looks like:
                    pre
                      code.javascript.
                       handsfree.use({
                          // Required. The unique name for this plugin.
                          // If it's not unique, then it overwrites the previous version of the plugin.
                          name: 'scrolling',
                        
                          // The multiplier to scroll the page by
                          // Adjust with this.scrollSpeed or handsfree.plugin.scrolling.scrollSpeed
                          scrollSpeed: 0.1,
                        
                          /**
                            * Scrolls the page when the cursor is above/below the screen
                            * @param {Array}     faces    The array of face objects
                            * @param {Handsfree} instance The handsfree instance
                            */
                          onFrame (faces, instance) {
                            faces.forEach(face => {
                              let x = face.cursor.x
                              let y = face.cursor.y
                        
                              // Then add the points to the cursor!
                              instance.cursor.$el.style.left = x + 'px'
                              instance.cursor.$el.style.top = y + 'px'
                        
                              // Scroll the page
                              if (y < 0)
                                window.scrollTo(0, window.scrollY + y * this.scrollSpeed)
                              else if (y > window.innerHeight)
                                window.scrollTo(0, window.scrollY + (y - window.innerHeight) * this.scrollSpeed)
                            })
                          }
                        })

              //- Step 4
              v-stepper-content(step='4')
                v-card
                  v-card-title(primary-title)
                    h2.headline.mb-0 Window Events
                  v-card-text
                    p If you don't have access to the handsfree instance, or if you don't want to create a plugin (for instance, to communicate with disconnected parts of your app/service), an alternative is to just listen to the following window events:
                    
                    pre
                      code.javascript.
                       /**
                         * Bind to the handsfree:trackFaces event, which is called once per frame
                         * @param {Handsfree} ev.detail.scope The handsfree instance
                         * @param {Object}    ev.detail.faces An array of face objects
                         */
                        window.addEventListener('handsfree:trackFaces', (ev) => {
                          // Do code with the handsfree instance: ev.detail.scope
                          // or with the faces ev.detail.faces.forEach(face => {})
                        })

                        /**
                         * Called for every chunk while BRFv4 is loading
                         * - Good for showing load progress
                         * - ev.data.progress is between 0 and 1
                         */
                        window.addEventListener('handsfree:loading', (ev) => {
                          const progress = ev.data.progress
                          // Display progress
                        })

                        /**
                         * Called after handsfree is instantiated and ready to be used
                         * - Models are loaded and ready to be used
                         * - Use this to enable a [onclick="handsfree.start()"]
                         * - Also good for ending a loading screen
                         */
                        window.addEventListener('handsfree:ready', () => {
                          // Enable .start() buttons
                        })

                        /**
                         * Called the first frame that a face clicks
                         */
                        window.addEventListener('handsfree:mouseDown', (ev) => {
                          const face = ev.detail.face
                          const faceIndex = ev.detail.faceIndex

                          // Do things with face and faceIndex here
                        })

                        /**
                         * Called every frame after a face clicks and is still in "click mode"
                         */
                        window.addEventListener('handsfree:mouseDrag', (ev) => {
                          const face = ev.detail.face
                          const faceIndex = ev.detail.faceIndex

                          // Do things with face and faceIndex here
                        })

                        /**
                         * Called when a face releases a click
                         */
                        window.addEventListener('handsfree:mouseUp', (ev) => {
                          const face = ev.detail.face
                          const faceIndex = ev.detail.faceIndex

                          // Do things with face and faceIndex here
                        })

                  v-card-text
                    p You can use <code>handsfree.dispatch(eventName)</code> to trigger events. This helper is the equivalent of using <code>window.dispatchEvent()</code>. One thing to note is that eventNames are namespaced with <code>handsfree:</code>, for instance:

                    pre
                      code.javascript.
                       // This...
                        handsfree.dispatch('SimpleKeyboard:change', 'abc')

                        // ...and this are equivalent
                        window.dispatchEvent(new CustomEvent('handsfree:SimpleKeyboard:change'), {
                          detail: 'abc'
                        })

              //- Step 5
              v-stepper-content(step='5')
                v-card
                  v-card-title(primary-title)
                    h2.headline.mb-0 Getting Elements
                  v-card-text
                    p You can get the element currently underneath the cursor with <code>.cursor.$target</code>:
                    pre
                      code.javascript.
                       // Outside of plugins
                        const $target = handsfree.faces[n].cursor.$target
                        
                        // Inside plugins
                        handsfree.use({
                          onFrame (face) {
                            const $target = face.cursor.$target
                          }
                        })

                    p You can do anything with the target including manipulating it (eg with jQuery) and dispatching events with the <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events">dispatchEvent API</a>.

            v-stepper-header
              template(v-for='(step, i) in steps')
                v-stepper-step(:complete='currentStep > i + 1' :step='i + 1' editable) {{step}}
                v-divider(v-if='i < steps.length - 1')

  v-container(grid-list-lg)
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

  v-container(grid-list-lg)
    //- Handsfree Starter
    div.push-t-50
    v-layout(justify-center)
      v-flex(xs12 md8)
        v-card
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

  watch: {
    /**
     * Scroll the page to the top of the 
     */
    currentStep () {window.scrollTo(0, window.pageYOffset + this.$refs.instructions.getBoundingClientRect().top - 100)}
  },

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
      },

      // Used to set .hidden on the hero text
      isTitleVisible: false,

      // Whether we're loading (true) or not (false)
      isLoading: true,

      steps: [
        'Install',
        'Config',
        'Plugins',
        'Events',
        '$target'
      ],
      
      // Stepper
      currentStep: 1
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
  opacity: 0
  transition: opacity 1s ease

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
