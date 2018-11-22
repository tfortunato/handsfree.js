<template lang="pug">
  div
    v-container(grid-list-md)
      v-layout.mb-5(justify-center wrap)
        v-flex(mb-4 xs12 md6 style='margin-top: 300px')
          h1.text-xs-center.display-2.font-weight-bold.mb-3 Handsfree.js
          p.text-xs-center
            | Made possible by <a href="https://github.com/Tastenkunst/brfv4_javascript_examples">BRFv4</a> and <a href="https://js.tensorflow.org/">TensorFlow.js</a>
          p.text-xs-center
            a(href='https://www.npmjs.com/package/handsfree')
              img.mr-2(src='https://img.shields.io/npm/v/handsfree.svg')
            a(href='https://github.com/BrowseHandsfree/handsfreeJS/commits/master')
              img.mr-2(src='https://img.shields.io/github/last-commit/BrowseHandsfree/handsfreeJS.svg')
            a(href='https://travis-ci.org/BrowseHandsfree/handsfreeJS')
              img.mr-2(src='https://travis-ci.org/BrowseHandsfree/handsfreeJS.svg?branch=master')
            a(href='https://codecov.io/gh/BrowseHandsfree/handsfreeJS')
              img.mr-2(src='https://img.shields.io/codecov/c/github/BrowseHandsfree/handsfreeJS/master.svg?style=flat')
            a.github-button(href='https://github.com/browsehandsfree/handsfreejs' data-show-count='true' aria-label='Star browsehandsfree/handsfreejs on GitHub' data-icon='octicon-star') GitHub
          p.subheading.font-weight-regular
            | A JavaScript drop-in library for adding handsfree interfaces to any website, service, and Internet of Thing. Runs on any device that supports <a href="https://caniuse.com/#feat=stream">getUserMedia()</a>
          p.text-xs-center
            v-btn.primary.handsfree-show-when-stopped(large @click='startWebcam') Start Webcam
            v-btn.primary.handsfree-show-when-started.hidden(large color='error' @click='stopWebcam') Stop Webcam

        v-flex(mb-4 xs12 md6)
          v-card(light)
            v-card-title(primary-title)
              h2.headline.mb-0 Drawing Canvas
            v-card-text
              p 😊 Smiles activate clicks. Lean in and back to adjust brush size. Give it a try by drawing shapes in the canvas below 🎨
              canvas#paperjs(style="width: 100%; height: 400px; box-shadow: 0 0 3px rgba(0,0,0,0.35)")

      v-layout(style='margin-top: 200px' wrap)
        v-flex(xs12)
          h1 Check out these examples!
      
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 005: Handsfree DOOM 🤘<br>Glitch: <a href="https://t.co/PLhrNtNZsQ">https://t.co/PLhrNtNZsQ</a><br><br>Day 6: Works best on desktops for now, once settings API is in place it will be performant on mobile devices too! Tutorial in next day or so <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/09qlGMK0eE">pic.twitter.com/09qlGMK0eE</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1064765062416523264?ref_src=twsrc%5Etfw">November 20, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 003: A-Magic Window, built on <a href="https://twitter.com/aframevr?ref_src=twsrc%5Etfw">@aframevr</a><br>Glitch: <a href="https://t.co/rYXOxjWHMp">https://t.co/rYXOxjWHMp</a><br>More info: <a href="https://t.co/pA1D9XP9Er">https://t.co/pA1D9XP9Er</a><br><br>Day 4: Making more progress on realtime Image Segmentation. Also started the handsfree YouTube client for BrowseHandsfree (demo soon!) <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/ujBkhTYCZ1">pic.twitter.com/ujBkhTYCZ1</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1063934103269990400?ref_src=twsrc%5Etfw">November 17, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;duckhunt-handsfree&quot; by <a href="https://twitter.com/LabOfOz?ref_src=twsrc%5Etfw">@labofoz</a> is a recreation of the arcade classic shooting game, but using your webcam to control the sight and trigger <a href="https://t.co/dn8ZwWGLp9">https://t.co/dn8ZwWGLp9</a> 😗🦆 <a href="https://t.co/szfcpwEc6X">pic.twitter.com/szfcpwEc6X</a></p>&mdash; 🎏Glitch (@glitch) <a href="https://twitter.com/glitch/status/1063193718172381186?ref_src=twsrc%5Etfw">November 15, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Smile with Caution! Mixing <a href="https://twitter.com/hashtag/Minesweeper?src=hash&amp;ref_src=twsrc%5Etfw">#Minesweeper</a> + <a href="https://t.co/n99yMYKqW7">https://t.co/n99yMYKqW7</a> = <a href="https://twitter.com/hashtag/Smilesweeper?src=hash&amp;ref_src=twsrc%5Etfw">#Smilesweeper</a> <br>Demo: <a href="https://t.co/HBXt3TcvfX">https://t.co/HBXt3TcvfX</a><br>Code: <a href="https://t.co/pS3oABf1pY">https://t.co/pS3oABf1pY</a><br>Credit: <a href="https://twitter.com/LabOfOz?ref_src=twsrc%5Etfw">@LabOfOz</a> <a href="https://twitter.com/sirajraval?ref_src=twsrc%5Etfw">@sirajraval</a> <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://t.co/5PyqDC6Jj5">pic.twitter.com/5PyqDC6Jj5</a></p>&mdash; Eddy (@Eddywi) <a href="https://twitter.com/Eddywi/status/1057344666402664448?ref_src=twsrc%5Etfw">October 30, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demo 002: Pan and Zoom Google Maps Handsfree 🧙‍♂️<br>Glitch: <a href="https://t.co/HMi0ir4z0H">https://t.co/HMi0ir4z0H</a> …<br>Tutorial: <a href="https://t.co/S0Oxe9rGyF">https://t.co/S0Oxe9rGyF</a> …<br><br>Day 3: Today I also launched a forum, the placeholder for <a href="https://t.co/w99puonGRG">https://t.co/w99puonGRG</a> , and continued studying Image Segmentation! <a href="https://twitter.com/hashtag/100DaysOfMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfMLCode</a> <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://t.co/ZKL9HIa329">pic.twitter.com/ZKL9HIa329</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1063644373043171328?ref_src=twsrc%5Etfw">November 17, 2018</a></blockquote>
        v-flex(xs12 md6 lg4)
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Finished implementing the first stretch of the handsfree YouTube workflow on <a href="https://t.co/sythDbZSPq">https://t.co/sythDbZSPq</a>. Now you can:<br><br>- Start/stop videos<br>- Look around<br>- Navigate to different pages (w/o turning cam off)<br>- Load new videos <a href="https://t.co/a8xrZ6w6F1">pic.twitter.com/a8xrZ6w6F1</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1064413285812817920?ref_src=twsrc%5Etfw">November 19, 2018</a></blockquote>

      v-layout(justify-center style='margin-top: 200px')
        v-flex(xs12 md8)
          v-card(light)
            v-card-title(primary-title)
              h2.headline.mb-0 Installation
            v-card-text
              h3 With HTML:
              p This is how we encourage you to use Handsfree.js when using standard web technologies or when experimenting on sites like <a href="https://glitch.com/~handsfree-starter">Glitch.com (check out the Handsfree Starter!)</a>:
              pre 
                code.xml.
                 &lt;!-- Latest with bug fixes (Recommended for production) --&gt;
                  &lt;script src="https://unpkg.com/handsfree@&lt;3.1/dist/handsfree.js">&lt;/script&gt;

                  &lt;!-- Latest with bug fixes and new features (Recommended for development) --&gt;
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

      v-layout(justify-center style='margin-top: 200px')
        v-flex(xs12 md8)
          v-card(light)
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
                img(src='../assets/img/brfv4_landmarks.jpg')
                  
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

      v-layout(justify-center style='margin-top: 200px')
        v-flex(xs12 md8)
          v-card(light)
            v-card-title(primary-title)
              h2.headline.mb-0 Window Events
            v-card-text
                p If you don't have access to the handsfree instance, or if you don't want to create a plugin, an alternative is to just listen to the following window events:
                
                pre
                  code.javascript.
                    /**
                    * Bind to the handsfree-trackFaces event, which is called once per frame
                    * @param {Handsfree} ev.detail.scope The handsfree instance
                    * @param {Object}    ev.detail.faces An array of face objects
                    */
                    window.addEventListener('handsfree-trackFaces', (ev) => {
                      // Do code with the handsfree instance: ev.detail.scope
                      // or with the faces ev.detail.faces.forEach(face => {})
                    })
                    
                    /**
                    * Bind to the handsfree-injectDebugger event
                    * @param {Handsfree}       ev.detail.scope The handsfree instance
                    * @param {Canvas2DContent} ev.detail.canvasContext The 2D debug canvas context
                    */
                    window.addEventListener('handsfree-injectDebugger', (ev) => {
                      // Do code with the handsfree instance: ev.detail.scope
                      // or draw into the canvas with ev.detail.canvasContext
                    })

      v-layout(justify-center style='margin-top: 200px')
        v-flex(xs12 md8)
          v-card(light)
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

      v-layout(justify-center style='margin-top: 200px')
        v-flex(xs12 md8)
          v-card(light)
            v-card-title(primary-title)
              h2.headline.mb-0 Simple Keyboard
            v-card-text
              p The <code>SimpleKeyboard</code> plugin adds a simple keyboard to the page. The keyboard is rendered into any element with <code>.handsfree-simple-keyboard</code>, allowing you to inject it into modals or hide the keyboard until it's needed. <strong>Click with a smile gesture :)</strong>

    .handsfree-simple-keyboard(style='width: 100%; color: #000')

    v-container(style='margin-top: 200px')
      v-layout(justify-center)
        v-flex(xs12 md8)
          v-card(light)
            v-card-title(primary-title)
              h2.headline.mb-0 <strong>Demo:</strong> Drawing
            v-card-text
              p Here we demo the use of <code>face.cursor.state</code>'s. Each face has it's own "state" which you can use within the <code>onFrame</code> callback of a plugin. For instance:
              pre
                code.javascript.
                  handsfree.use({
                    name: 'PaperDraw',
                  
                    onFrame (faces) {
                      faces.forEach(face => {
                        // Only catch events when the cursor is over the $canvas
                        if (face.cursor.$target === $canvas) {
                          // Called once when the user first clicks
                          if (face.cursor.state.mouseDown) {
                            // ...
                          }
                          
                          // Called when the user is still holding a click
                          if (face.cursor.state.mouseDrag) {
                            // ...
                          }
                  
                          // Called after the user releases a click
                          if (face.cursor.state.mouseUp) {
                            // ...
                          }
                        }
                      })
                    }
                  })
</template>

<script>
import hljs from 'highlight.js'

export default {
  mounted () {
    window.hljs = hljs
    hljs.initHighlighting()
    require('../demo/paper.js')
  },

  methods: {
    startWebcam () {window.handsfree.start()},
    stopWebcam () {window.handsfree.stop()}
  }
}
</script>

<style scoped lang="stylus">
  h1
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5)
</style>
