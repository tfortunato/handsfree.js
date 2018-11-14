<div align="center">
  <img src="https://media.giphy.com/media/5aY2YXbhIG7j13gnCq/giphy.gif" alt="handsfree.js 2.0">
  <h1>HandsfreeJS</h1>
  <p>A platform for creating handsfree user interfaces, tools, games, and experiences for the web and IoT 🤯</p>
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
<p>
  <a href="https://patreon.com/browsehandsfree">
    <img src="static/patreon-button.png" alt="Support this project on Patron"/>
  </a>
</p>
</div>

## Prereqs
- [NodeJS](https://nodejs.org/en/)


## Scripts
Run the following from projects root directory:

``` bash
# Install dependencies
npm install

# Start a server with hot-reload at localhost:3000
npm run serve

# Build for production
npm run build

# Build and deploy (see /deploy.js to configure for your own server)
npm run deploy
```

For detailed explanation on how things work, check out the [Vuetify.js](https://vuetifyjs.com/) and [CLI Plugin](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) documentation.


## Quickstart

```html
<script src="https://unpkg.com/handsfree@2.0.3"></script>
```

or

```js
npm i handsfree
```

then

```js
// If using node: import Handsfree from 'handsfree'
const handsfree = new Handsfree({debug: true})
handsfree.start()
```

## Core Plugins
### Typing
**See:** `/lib/plugins/SimpleKeyboard.js`

![](https://i.giphy.com/495ysDE36USvobWE0y.gif)

## Demos
### Drawing
**See:** `/sandbox/demos/paper.js`

![](https://i.giphy.com/YkBbkI90xxyDM7u8jc.gif)

## Development

The following is our directory sturcture

```
/- public	        -| Files in available to the library and documentation site

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
  // Whether to show the debugger or not
  debug: false
})
```

### API

```js
// Starts tracking faces and shows the webcam if debug is on
handsfree.start()
// Stops the webcam
handsfree.stop()

// Toggles the debugger on (true), off (false), or flips the state (null)
handsfree.toggleDebugger(true|false|null)
```

### Visual Debugging

The debugger is loaded into the first element in the DOM with the `.handsfree-debug-wrap`. If one doesn't exist, then it's added as the last root element of `body`.

### Plugins
Handsfree is built around a plugin architecture, which allows us to easily add and share functionality. We can even disable them!

To add a plugin, use the `handsfree.use({})` method with the following form:

```js
handsfree.use({
  // Must be unique. Spaces and special characters are fine
  // Plugins are called alphabetically - to make a plugin load before another prefix it with a number
  name: '',

  // Called once when the use method is called and after the plugin is added to the instance
  onUse: () => {},
  // Called once per frame, after calculations, along with the detected face object
  // To overwrite/modify the properties of faces for use within other plugins, return the faces object
  onFrame: (faces, handsfree) => {},

  // Called after Handsfree.start() is called
  onStart: (handsfree) => {},

  // Called after Handsfree.stop() is called
  onStop: (handsfree) => {}
})
```

## The `faces` array
The `onFrame` recieves a `faces` array, which contains an object for each tracked face. The key properties of the a `face` object include:

```js
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
```

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