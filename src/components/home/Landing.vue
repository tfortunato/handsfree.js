<template lang="pug">
div
  v-container(grid-list-lg)
    v-layout.mb-5(justify-center wrap)
      v-flex(mb-4 xs12 md6)
        //- p.mb-3.text-xs-center
        //-   img(src='https://media.giphy.com/media/AFXBi87gYqWMth1T6m/giphy.gif')
        h1.text-xs-center.display-2.font-weight-bold.mb-3(style='margin-top: 250px') Handsfree.js
        p.text-xs-center
          | With support from <a href="https://glitch.com">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, and you:
        p.text-xs-center
          a(href='https://www.npmjs.com/package/handsfree')
            img.mr-2(src='https://img.shields.io/npm/v/handsfree.svg')
          a(href='https://github.com/labofoz/handsfree.js/commits/master')
            img.mr-2(src='https://img.shields.io/github/last-commit/labofoz/handsfree.js.svg')
          a(href='https://travis-ci.org/labofoz/handsfree.js')
            img.mr-2(src='https://travis-ci.org/labofoz/handsfree.js.svg?branch=master')
          a(href='https://codecov.io/gh/labofoz/handsfree.js')
            img.mr-2(src='https://img.shields.io/codecov/c/github/labofoz/handsfree.js/master.svg?style=flat')
          span(style='margin-top: 5px; display: inline-block; vertical-align: middle')
            a.github-button(href='https://github.com/labofoz/handsfree.js' data-show-count='true' aria-label='Star labofoz/handsfree.js on GitHub' data-icon='octicon-star') GitHub
        p.subheading.font-weight-regular
          | A drop-in library for adding handsfree interfaces to any website, service, and Internet of Thing. Runs on any device that supports <a href="https://caniuse.com/#feat=stream">getUserMedia()</a>
        p.text-xs-center
          v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam' :disabled='isHandsfreeLoading')
            v-icon.mr-2 videocam
            | Start Webcam
          v-btn.primary.handsfree-show-when-started.hidden(large color='error' @click='stopWebcam')
            v-icon.mr-2 videocam_off
            | Stop Webcam
        p.text-xs-center
          small Powered by <a href="https://github.com/Tastenkunst/brfv4_javascript_examples">BRFv4</a> and <a href="https://js.tensorflow.org/">TensorFlow.js</a>

      v-flex(mb-4 xs12 md6)
        v-card(light)
          v-card-title(primary-title)
            h2.headline.mb-0 🎨 Try It
          v-card-text
            p Smile wide to start a click and make a normal face to release it. Lean in and back to adjust brush size. <a href="https://glitch.com/~handsfree-drawing">Try the Handsfree Drawing Starter Kit on Glitch</a>.
            canvas#paperjs(style='width: 100%; height: 400px; box-shadow: 0 0 3px rgba(0,0,0,0.35)' resize)
            div
              v-btn.mx-0(large color='primary' @click='clearDrawing' style='width: 100%;')
                v-icon.mr-2 refresh
                | Clear Drawing

    //- Tweets
    v-layout(style='margin-top: 200px' wrap)
      v-flex(xs12)
        h1 Check out these examples
    
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

  //- Instructions
  v-container(ref='instructions' grid-list-lg style='margin-top: 200px')
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
                        // Maximum number of poses to track
                        maxPoses: 1,

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
                        },

                        // Sets up the webcam
                        webcam: {
                          video: {
                            width: 640,
                            height: 480
                          }
                        },

                        tracker: {
                          // PoseNet
                          // @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
                          posenet: {
                            // @todo Make these comments more succinct
                            // The float multiplier for the depth (number of channels) for all convolution operations.
                            // - The value corresponds to a MobileNet architecture and checkpoint
                            // - The larger the value, the larger the size of the layers, and more accurate the model at the cost of speed
                            // - Set this to a smaller value to increase speed at the cost of accuracy.
                            // - Possible values [0.5, 0.75, 1.0, 1.01]
                            multiplier: 0.75,
                            // A number between 0.2 and 1.0 representing what to scale the image by before feeding it through the network
                            // - Set this number lower to scale down the image and increase the speed when feeding through the network at the cost of accuracy.
                            imageScaleFactor: 0.4,
                            // The minimum overall confidence score required for the a pose/person to be detected.
                            minPoseConfidence: 0.1,
                            // The minimum confidence score for an individual keypoint, like the nose or a shoulder, to be detected.
                            minPartConfidence: 0.5,
                            // the desired stride for the outputs when feeding the image through the model.
                            // - The higher the number, the faster the performance but slower the accuracy
                            // - Possible values [8, 16, 32]
                            outputStride: 16,
                            // Non-maximum suppression part distance
                            // - It needs to be strictly positive
                            // - Two parts suppress each other if they are less than nmsRadius pixels away
                            nmsRadius: 20,
                            // Only return instance detections that have root part score greater or equal to this value.
                            scoreThreshold: 0.5
                          }
                        }

                  p Settings can later be updated with <code>handsfree.settings['my.setting'] = newValue;</code>
            
            //- Step 3
            v-stepper-content(step='3')
              v-card
                v-card-title(primary-title)
                  h2.headline.mb-0 Adding Plugins
                v-card-text
                  p Handsfree.js is built around plugins. Plugins have several callbacks that hook into different events, and are added with <code>handsfree.use(config)</code>.
                  p Each callback receives two arguments, <code>(poses, instance)</code>. <code>instance</code> refers to the <code>new Handsfree</code> instance you created. <code>poses</code> is an array of objects containing the following:
                  pre
                    code.javascript.
                      {
                        /**
                         * A BRFv4 tracked face
                         * @see https://tastenkunst.github.io/brfv4_docs/#hl_BRFFace
                         */
                        face: {
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

                        // Called once per frame, after calculations, along with the detected pose object
                        // - {Return}       To overwrite/modify the properties of handsfree.pose for use within other plugins, return an array with modifications
                        onFrame: (poses, handsfree) => {},

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
                        * Bind to the handsfree:trackPoses event, which is called once per frame
                        * @param {Handsfree} ev.detail.scope The handsfree instance
                        * @param {Array}     ev.detail.poses Collection of pose objects
                        */
                      window.addEventListener('handsfree:trackPoses', (ev) => {
                        // Do code with the handsfree instance: ev.detail.scope
                        // or with the the pose: ev.detail.poses
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
                      const $target = handsfree.poses[n].face.cursor.$target
                      
                      // Inside plugins
                      handsfree.use({
                        onFrame (poses) {
                          const $target = poses[n].cursor.$target
                        }
                      })

                  p You can do anything with the target including manipulating it (eg with jQuery) and dispatching events with the <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events">dispatchEvent API</a>.

          v-stepper-header
            template(v-for='(step, i) in steps')
              v-stepper-step(:complete='currentStep > i + 1' :step='i + 1' editable) {{step}}
              v-divider(v-if='i < steps.length - 1')

  //- Going further
  v-container(style='margin-top: 200px; margin-bottom: 200px')
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
</template>

<script>
import hljs from 'highlight.js'
import './handsfree.js'
import {mapState} from 'vuex'

export default {
  computed: mapState(['isHandsfreeLoading']),
  
  data () {
    return {
      // Stepper
      currentStep: 1,

      steps: [
        'Install',
        'Config',
        'Plugins',
        'Events',
        '$target'
      ]
    }
  },
  
  mounted () {
    window.hljs = hljs
    hljs.initHighlighting.called = false
    hljs.initHighlighting()

    // @TODO Let's make use of plugin enable/disables
    window.handsfree && window.handsfree.plugin.PaperDraw.reInit()
    window.addEventListener('load', () => {window.handsfree.plugin.PaperDraw.reInit()})

    // Add scripts
    let scripts = ['https://platform.twitter.com/widgets.js', 'https://buttons.github.io/buttons.js']
    scripts.forEach(script => {
      const $script = document.createElement('script')
      $script.src = script
      document.body.appendChild($script)
    })
  },

  methods: {
    startWebcam () {window.handsfree.start()},
    stopWebcam () {window.handsfree.stop()},
    clearDrawing () {window.paper.project.clear()}
  }
}
</script>

<style scoped lang="stylus">
h1
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5)
</style>
