<div align="center">
  <img src="https://media.giphy.com/media/3Z15Ve7WEQGkLa1FwC/giphy.gif" alt="handsfree.js">
  <p>A platform for creating handsfree user interfaces, tools, games, and experiences for the web and IoT 🤯</p>
  <p>Made possible by <a href="https://github.com/Tastenkunst/brfv4_javascript_examples">BRFv4</a></p>
<p>
  <img class="mr-1" src="https://img.shields.io/github/release-pre/browsehandsfree/handsfreejs.svg"> <img class="mr-1" src="https://img.shields.io/github/last-commit/browsehandsfree/handsfreejs.svg"> <img class="mr-1" src="https://img.shields.io/github/commits-since/browsehandsfree/handsfreejs/0.0.1.svg">
  <img src="https://img.shields.io/github/repo-size/browsehandsfree/handsfreejs.svg">
</p>
<p>
  <img class="mr-1" src="https://img.shields.io/github/issues-raw/browsehandsfree/handsfreejs.svg"> <img class="mr-1" src="https://img.shields.io/github/issues/browsehandsfree/handsfreejs/✨ enhancement.svg"> <img src="https://img.shields.io/github/issues-pr-raw/browsehandsfree/handsfreejs.svg">
</p>
<p>
  <img class="mr-1" src="https://img.shields.io/github/issues/browsehandsfree/handsfreejs/🐞 bug.svg"> <img src="https://img.shields.io/github/issues/browsehandsfree/handsfreejs/👷 help wanted.svg">
</p>
<p>
  <img src="https://travis-ci.org/BrowseHandsfree/handsfreeJS.svg?branch=master">
  <img src="https://img.shields.io/codecov/c/github/BrowseHandsfree/handsfreeJS/master.svg?style=flat">
</p>
</div>

## License
> Please read the EULA ([eula.txt](eula.txt)) carefully before using Handsfree.js, which depends on [BRFv4](https://www.beyond-reality-face.com/). Once you decide to use handsfree.js commercially, you will need a separate license agreement from them that you must agree to. You can try the handsfree.js free of charge to evaluate if it fits your projects' needs. Once you decided to use BRFv4 in your project, contact Taskenkunst for a commercial license: [http://www.tastenkunst.com/#/contact](http://www.tastenkunst.com/#/contact)

## Prereqs
- [NodeJS](https://nodejs.org/en/)


## Scripts
Run the following from projects root directory:

``` bash
# Install dependencies
npm install

# Start a server with hot-reload at localhost:3000
npm run serve

# Test the library (not the documentation site)
npm run test

# Build for production
npm run build

# Build and deploy (see /deploy.js to configure for your own server)
npm run deploy
```

For detailed explanation on how things work, check out the [Vuetify.js](https://vuetifyjs.com/) and [CLI Plugin](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) documentation.


## Quickstart
Install with an HTML `<script>` tag anywhere after the open `<body>` tag...

```html
<body>
  <!-- Latest with bug fixes (Recommended for production) -->
  <script src="https://unpkg.com/handsfree@<3.1/dist/handsfree.js"></script>

  <!-- Latest with bug fixes and new features (Recommended for development) -->
  <script src="https://unpkg.com/handsfree@<4/dist/handsfree.js"></script>

  <!-- Latest with potential backwards incompatability (Recommended for testers) -->
  <script src="https://unpkg.com/handsfree/dist/handsfree.js"></script>
</body>
```

...or with Node.

```javascript
// Fromt the terminal in the project root
npm i handsfree

// Then in your script
const Handsfree = require('handsfree')
```

Then **in both cases** add the following to your scripts:

```js
handsfree = new Handsfree()
handsfree.start()
```

That will inject handsfree into the page, including the required components (video and canvas elements), initialize models, and start tracking a single face. This setup includes the minimal plugins necessary to operate a web page, including:

- Scrolling
- Clicking
- Virtual Keyboard

## Core Plugins
### Typing
**See:** `/lib/plugins/SimpleKeyboard.js`

![](https://i.giphy.com/495ysDE36USvobWE0y.gif)

## Demos
### Drawing
**See:** `/sandbox/demos/paper.js`

![](https://i.giphy.com/YkBbkI90xxyDM7u8jc.gif)

## Development

The following is our directory sturcture. [In brackets] are 

```
/- public         -| Files available to both the library and documentation site

/- starters       -| [DEVELOPERS] Standalone projects to get you started

/- lib	          -| [CORE DEVELOPERS] The main handsfree.js library
/-- components    -| Cursor
/-- models        -| Machine learning models
/-- plugins       -| Core plugins

/- docs           -| [DOC MAINTAINERS] The documentation site
/-- assets
/-- components
/-- demo
/-- plugins
/-- store
```

## Usage

### Config
You can instantiate Handsfree with the following config (defaults are shown):

```js
const handsfree = new Handsfree({
  // Whether to show (true) the debugger (face mask over video) or not (false)
  debug: false
})
```

### API

```js
// Starts tracking faces and shows the webcam stream if debug is on
handsfree.start()
// Stops the webcam
handsfree.stop()

// Toggles the debugger on (true), off (false), or flips the state (null)
handsfree.toggleDebugger(true|false|null)
```

### Visual Debugging

The debugger is loaded into the first element in the DOM with the `.handsfree-debug-wrap`. If one doesn't exist, then it's added as the last root element of `body`. You should rarely need to debug visually, and it's preferred that you don't draw into this canvas at all.

### Plugins
Handsfree is built around a plugin architecture, which allows us to easily add and share functionality. We can even disable them!

To add a plugin, use the `handsfree.use({})` method with the following form. This method returns the plugin object:

```js
const myPlugin = handsfree.use({
  // Must be unique. Spaces and special characters are fine
  // Plugins are called alphabetically - to make a plugin load before another prefix it with a number
  name: '',

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
  onStop: (handsfree) => {}
})
```

Additionally, every plugin has a `.disable()` and an `enable()` method, which sets a `._isDisabled` flag to either true or false:
```js
handsfree.plugin['my-plugin'].disable() // handsfree.plugin['my-plugin']._isDisabled === true
handsfree.plugin['my-plugin'].enable() // handsfree.plugin['my-plugin']._isDisabled === false
```

Disabled plugins do not run their `on*` hooks.

## The `faces` array
The `onFrame` recieves a `faces` array, which contains an object for each tracked face. The key properties of the a `face` object include:

```js
{
  cursor: {
    // Where the main cursor is drawn (also the point the user is facing)
    x: 0,
    y: 0,
    // The HTML element currently under the mouse
    $target: 0,

    // "Mouse" states for this face
    state: {
      // True during the first frame of a click, false after (even if still held)
      mouseDown: false,
      // True after the first frame of a click and every frame after until release
      mouseDrag: false,
      // True on the last frame of a click, immediately after the click is released
      mouseUp: false
    }
  },

  // A list of all 64 landmarks
  points: [{x, y}, ...],

  // The head's pitch (facing up/down)
  rotationX: 0,
  // The head's yaw (facing left/right)
  rotationY: 0,
  // The head's roll (think of an airplane doing a barrel roll)
  rotationZ: 0,

  // Not really sure...the heads overall size within the camera?
  scale: 0,

  // Where the head is relative to the left edge of the video feed
  translationX: 0,
  // Where the head is relative to the top edge of the video feed
  translationY: 0
}
```

There are 64 landmark points, reflected in the following image: 
![image from BRFv4](src/assets/img/brfv4_landmarks.jpg)

27 is where the cursor's screen vectors are estimated from.

## Events
### handsfree-trackFaces
An alternative to plugins is to use listen in on the window `handsfree-trackFaces` event:

```js
/**
 * Bind to the handsfree-trackFaces event
 * @param {Handsfree} ev.detail.scope The handsfree instance
 * @param {Object}    ev.detail.faces An array of face objects
 */
window.addEventListener('handsfree-trackFaces', (ev) => {
  // Do code with the handsfree instance: ev.detail.scope
  // or with the faces ev.detail.faces.forEach(face => {})
})
```

### handsfree-injectDebugger
The `handsfree-injectDebugger` event is fired after the debugger is injected, but before handsfree is started. Use this event to draw into the canvas without the camera being turned on.

```js
/**
 * Bind to the handsfree-injectDebugger event
 * @param {Handsfree}       ev.detail.scope The handsfree instance
 * @param {Canvas2DContent} ev.detail.canvasContext The 2D debug canvas context
 */
window.addEventListener('handsfree-injectDebugger', (ev) => {
  // Do code with the handsfree instance: ev.detail.scope
  // or draw into the canvas with ev.detail.canvasContext
})
```

## Classes
The document body contains `.handsfree-stopped` when handsfree is stopped (this includes when it's been initialized but not started), and `.handsfree-started` when it's on. This lets you style any page on the page!

## More coming soon

- [@Labofoz](https://twitter.com/labofoz)
- [BrowseHandsfree.com](https://browsehandsfree.com)
- [labofoz.com](https://labofoz.com)

# Thanks for trying out Handsfree.js!
**March 4th 2018**: https://twitter.com/LabOfOz/status/970556829125165056

![](https://media.giphy.com/media/4HvjGXt2Jjwz5LG71Z/giphy.gif)