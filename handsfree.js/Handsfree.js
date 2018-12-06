const pkg = require('../package.json')
const {trimStart, merge} = require('lodash')
const {TweenMax} = require('gsap')

class Handsfree {
  constructor (opts = {}) {
    // Flags
    this.isTracking = false
    this.isSupported = false
    this.isWASMSupported = typeof WebAssembly === 'object'

    // The collection of plugins by name
    this.plugin = {}

    // Settings
    opts.settings = opts.settings || {}
    this.settings = merge({
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
    }, opts.settings)

    // Properties
    // @see this.injectDebugger
    this.debug = {
      // Whether we're actually debugging or not
      isDebugging: false,
      // The webcam stream
      $webcam: null,
      // The canvas to display debug info on
      $canvas: null,
      // The canvas context
      ctx: null,
      // The wrapping element
      $wrap: null
    }

    // BRFv4 config
    this.brf = {
      // Will fallback to ASM if Web ASM isn't supported
      baseURL: `${Handsfree.libPath}brf/`,
      // The BRFv4 Manager
      manager: {},
      // The BRFv4 Resolution
      resolution: null,
      // The loaded BRFv4 sdk library
      sdk: null,
      // The SDK version we're using
      sdkName: 'BRFv4_JS_TK110718_v4.1.0_trial',
      // The Web ASM buffer
      WASMBuffer: null
    }

    this.cursor = {
      $el: null,
      x: -100,
      y: -100
    }

    // The tracked faces object
    this.faces = null

    // Helper object to remove jittering
    this.tweenFaces = []

    // Apply config options
    this.opts = opts
    this.applyConfig(opts)

    // Error out if we don't have support
    this.checkForMediaSupport()

    // Inject elements
    this.injectDebugger()
    this.injectCursor()

    // Initialize and read the BRFv4 Web Assembly binoary into a buffer
    this.initAndMaybeReadWASMBinary()
    document.body.classList.add('handsfree-stopped')
  }

  /**
   * Starts the webcam stream
   */
  start () {
    this.toggleDebugger(this.opts.debug)
    document.body.classList.add('handsfree-started')
    document.body.classList.remove('handsfree-stopped')
    window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 0}}))

    window.navigator.mediaDevices.getUserMedia({
      video: {width: 640, height: 480, frameRate: 30}
    }).then(mediaStream => {
      this.debug.$webcam.srcObject = mediaStream
      this.debug.$webcam.play()
      this.onStartHooks()

      if (!this.brf.sdk) {
        window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 10}}))
        this.startBRFv4()
      } else {
        window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 100}}))
        this.isTracking = true
        this.brf.manager.setNumFacesToTrack(this.settings.maxFaces)
        this.trackFaces()
      }
    }).catch(() => this.throwError('There are no cameras available.'))
  }

  /**
   * Stop tracking and release webcam streams
   */
  stop () {
    document.body.classList.remove('handsfree-started')
    document.body.classList.add('handsfree-stopped')

    if (this.isTracking) {
      this.isTracking = false
      this.debug.$webcam.srcObject.getTracks().forEach(track => track.stop())
      this.toggleDebugger(false)
      this.onStopHooks()
    }
  }

  /**
   * Tracks faces
   */
  trackFaces () {
    const ctx = this.debug.ctx
    const resolution = this.brf.resolution

    // mirrors the context
    ctx.drawImage(this.debug.$webcam, 0, 0, resolution.width, resolution.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    // Get faces
    this.brf.manager.update(ctx.getImageData(0, 0, resolution.width, resolution.height).data)
    this.faces = this.brf.manager.getFaces()

    // Do things with faces
    this.debug.isDebugging && this.drawFaces()
    this.calculateXY()
    this.setTouchedElement()
    this.onFrameHooks(this.faces)

    // Dispatch global event
    window.dispatchEvent(new CustomEvent('handsfree-trackFaces', {detail: {
        scope: this,
        faces: this.faces
      }}))

    // Only loop if we're tracking
    this.isTracking && requestAnimationFrame(() => this.trackFaces())
  }

  /**
   * Returns the element under the face and stores it as face.$target
   */
  setTouchedElement () {
    this.faces.forEach((face, i) => {
      this.faces[i].cursor.$target = document.elementFromPoint(face.cursor.x, face.cursor.y)
    })
  }

  /**
   * Calculates the X/Y the user is facing
   */
  calculateXY () {

    this.faces.forEach((face, i) => {

      // Add enough helper object.

      while(i >= this.tweenFaces.length) {

        this.tweenFaces.push({
          x: -1, y: -1, rx: 0.0, ry: 0.0, positionList: []
        });
      }

      // @TODO Include offsets and cursor dimensions
      // Calculate X/Y

      let rx          = face.rotationX * 180.0 / Math.PI; // radian to degree
      let ry          = face.rotationY * 180.0 / Math.PI;

      rx              = rx + 1 -  4.000 * (Math.abs(ry) / 45.0); // a bit of compensation for edge cases

      const maxRyp    = 30.0; // consider a certain range for rotationY and rotation X
      const maxRxp    = 20.0;

      if(ry < -maxRyp) ry = -maxRyp; // clip both values
      if(ry >  maxRyp) ry =  maxRyp;
      if(rx < -maxRxp) rx = -maxRxp;
      if(rx >  maxRxp) rx =  maxRxp;

      // Remove some jittering by tweening the rotations values using TweenMax.
      // We could do it without TweenMax: 0.15 seconds is 15% of 1 second, so it tween over 4,5 frames (30 fps)
      // but TweenMax is so convenient for that purpose.

      let tweenFace   = this.tweenFaces[i]; // our helper for this face index

      // Stabilizer
      const stabilizer = [
        {jitter: 0, tween: 0},
        {jitter: 0.5, tween: 0.25},
        {jitter: 5, tween: 1.5},
        {jitter: 10, tween: 3}
      ]
      // Number of degrees needed to change before forcing a position (vs tweening it eg stabilizing it)
      const jitterFactor = stabilizer[this.settings.stabilizer.factor].jitter
      // How long to tween while stabilizing. Higher = slower, lower = faster
      let tweenDuration = stabilizer[this.settings.stabilizer.factor].tween;

      if(Math.abs(tweenFace.rx - rx) > jitterFactor) { tweenDuration = 0.0; }
      if(Math.abs(tweenFace.ry - ry) > jitterFactor) { tweenDuration = 0.0; }

      TweenMax.to(tweenFace, tweenDuration, { rx: rx, ry: ry, overwrite: true, ease: 'Linear.easeNone'});

      let ryp         = Math.sin((tweenFace.ry / maxRyp * (Math.PI * 0.5)));
      let rxp         = Math.sin((tweenFace.rx / maxRxp * (Math.PI * 0.5)));

      // ryp and rxp are between -1.0 to 1.0 with slower movements on the edges due to Math.sin
      // Center of screen is (window.innerWidth * 0.5), so eg. 0.5 + 1.0 would be too much over the edge

      // Let's reduce the values by 40% to go only 10% over the edge...

      // ryp *= 0.60;
      // rxp *= 0.60;

      // ... or only 30%, to go over the edge by 20%.

      rxp *= this.settings.sensitivity.xy;
      ryp *= this.settings.sensitivity.xy;

      let _x          = window.innerWidth  * (ryp + 0.5);
      let _y          = window.innerHeight * (rxp + 0.5);

      if(face.state !== this.brf.sdk.BRFState.FACE_TRACKING) {
        // reset
        tweenFace.x   = window.innerWidth  * 0.5;
        tweenFace.y   = window.innerHeight * 0.5;

        tweenFace.positionList.length = 0;
      }

      // So at this stage it's a bit less jittering, but to improve the overall placement when the face stands
      // still, let's average out the position over 1 second (30 frames). This will lead to a bit of delay when
      // moving the head fast, but it will greatly improve slow movements.
      if(tweenFace.positionList.length < this.settings.stabilizer.buffer) {

        // add helper objects until the array is full

        tweenFace.positionList.push({x: _x, y: _y});

        // leave the cursor in the center to get rid
        // of the annoying jumping at start up.

        tweenFace.x   = window.innerWidth  * 0.5;
        tweenFace.y   = window.innerHeight * 0.5;

      } else {

        const position = tweenFace.positionList.shift();

        position.x = _x;
        position.y = _y;

        tweenFace.positionList.push(position);

        const numPositions = tweenFace.positionList.length;
        let avgX = 0;
        let avgY = 0;

        for(let i = 0; i < numPositions; i++) {

          avgX += tweenFace.positionList[i].x;
          avgY += tweenFace.positionList[i].y;
        }

        tweenFace.x = avgX / numPositions;
        tweenFace.y = avgY / numPositions;
      }

      this.cursor.x = tweenFace.x;
      this.cursor.y = tweenFace.y;

      // Update pointer and vars
      this.cursor.$el.style.left = `${tweenFace.x}px`
      this.cursor.$el.style.top  = `${tweenFace.y}px`

      face.cursor = {
        x: tweenFace.x,
        y: tweenFace.y
      }
    })
  }
}

// Add class to body to style loading
document.body.classList.add('handsfree-is-loading')

// Set the lib path to whereever this file is, this is required for loading the BRFv4 SDK
Handsfree.libPath = trimStart(document.currentScript.getAttribute('src').replace('handsfree.js', ''), '/')
Handsfree.version = pkg.version

// Remember: to kick things off you'll want to instantiate this with `new`
require('./Setup')(Handsfree)
require('./Util')(Handsfree)
require('./Debug')(Handsfree)
require('./Plugin')(Handsfree)
require('./components/Cursor')(Handsfree)
module.exports = Handsfree
