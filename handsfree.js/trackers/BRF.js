/**                              
 *                                    ....,       ,....
 *          ✨	                    .' ,,, '.   .' ,,, '.
 *           (\.   \      ,/)        .`   `.     .`   `.
 *            \(   |\     )/       : ..... :   : ..... :
 *            //\  | \   /\\          ```   ___   ```
 *           (/ /\_#👓#_/\ \)             ( . . )
 *             \/\  ####  /\/      
 *                  `##'                `.~~~~~~~.`
 *                                        `-...-`
 *         
 *             🔮 handsfree.js/trackers/BRFv4.js 🔮
 * 
 * @description Loads a face tracker (and more) into `handsfree.trackers.brf` 
 * and populates:
 * - `handsfree.pose[].face`
 * 
 * @see https://github.com/tensorflow/tfjs-models/tree/master/brf
 */
const {TweenMax} = require('gsap')
const {throttle} = require('lodash')

module.exports = Handsfree => {
  /**
   * Reads the Web ASM Binary into a buffer if it's supported
   */
  Handsfree.prototype.initBRF = function () {
    if (this.settings.tracker.brf.useWithWorker)
      this.initBRFWorker()
    else
      this.initBRFMainThread()
  }

  /**
   * Initializes brf within main thread
   */
  Handsfree.prototype.initBRFMainThread = function () {
    if (this.isWASMSupported) {
      let xhr = new XMLHttpRequest()
      let url = this.brf.baseURL + this.brf.sdkName + '.wasm'
      let onError = err => this.throwError(err)
      let onProgress = progress => {
        window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: progress.loaded / progress.total * 100}}))
      }

      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 0 && xhr.response) {
          this.brf.WASMBuffer = xhr.response
          this.loadPlugins()
        } else {
          onError()
        }
        this.onReadyHook()
      }
      xhr.onerror = onError
      xhr.onprogress = onProgress
      xhr.send(null)
    } else {
      this.throwError('ERROR: This browser does not support Web Assembly, please try another browser...like Google Chrome!')
    }
  }
  
  /**
   * Initializes BRF within the worker
   */
  Handsfree.prototype.initBRFWorker = function () {
    // Adds inline scripts inside `/public/lib`
    let fileHeader = `
      // eslint-disable-next-line
      process = self;
      module = {exports: {}}
      // eslint-disable-next-line
      importScripts('${Handsfree.libDomain}/models/BRFv4_JS_TK110718_v4.1.0_trial.js');
      `
    let blob = new Blob([fileHeader + require('raw-loader!../../public/workers/brf.js')])

    // Create workers
    for (let i = 0; i < this.settings.tracker.brf.workers; i++) {
      this.tracker.brf.workers.push({
        worker: new Worker(URL.createObjectURL(blob)),
        isReady: false
      })

      const webworker = this.tracker.brf.workers[i]
      webworker.worker.postMessage({
        action: 'setup',
        id: i,
        settings: this.settings,
        canvas: {
          width: this.debug.$canvas.width,
          height: this.debug.$canvas.height
        },
        brf: {
          libDomain: Handsfree.libDomain, 
          baseURL: Handsfree.libDomain + this.brf.baseURL,
          sdkName: this.brf.sdkName
        }
      })    
      webworker.worker.onmessage = ev => this.onBRFWorker(ev)
    }
  }

  /**
   * Called when the worker updates
   */
  Handsfree.prototype.onBRFWorker = function (ev) {
    switch (ev.data.action) {
      case 'brfOnLoad':
        this.tracker.brf.isReady = true
        this.tracker.brf.workers[ev.data.id].isReady = true
      break

      case 'onReadyHook':
        this.onReadyHook()
      break

      case 'brfTracked':
        this.onBRFTrackedWithWorker(ev)
      break

      case 'initSDK':
        this.isTracking = true
        this.trackPoses()  
      break
    }
  }

  /**
   * Handles receiving the brf results from the web worker
   * - Enables `this.tracker.brf.worker[ev.data.id]`
   */
  Handsfree.prototype.onBRFTrackedWithWorker = function (ev) {
    this.tracker.brf.workers[ev.data.id].isReady = true
    this.poseCache.face = ev.data.poses
  }
  
  /**
   * Tracks faces
   * - Will look for opts.settings.maxPoses
   * - Recurses until this.isTracking is false
   * @todo Move this into a BRFv4 interface class
   */
  Handsfree.prototype.trackFaces = function () {
    if (this.settings.tracker.brf.useWithWorker) 
      this.trackFacesWithWorker()
    else
      this.trackFacesInMain()
  }
    
  /**
   * Starts BRFv4 either in the worker or main thread
   */
  Handsfree.prototype.startBRFv4 = function () {
    if (this.settings.tracker.brf.useWithWorker) 
      this.startBRFWithWorker()
    else
      this.startBRFInMain()
  }

  /**
   * Start BRFv4 with the Web Worker
   */
  Handsfree.prototype.startBRFWithWorker = function () {
    this.tracker.brf.workers.forEach(webworker => {
      webworker.isReady = true
      webworker.worker.postMessage({action: 'waitForBRFSDK'})
    })
  }

  /**
   * Actually starts BRFv4 (once stream dimensions are known)
   * @emits handsfree:loading
   */
  Handsfree.prototype.startBRFInMain = function () {
    if (this.debug.$webcam.videoWidth === 0) {
      // @TODO let's optimize this wait time
      setTimeout(() => this.startBRFv4(), 50)
    } else {
      window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 20}}))      
      this.waitForBRFSDK()
    }
  }

  /**
   * Infer with brf within a worker
   */
  Handsfree.prototype.trackFacesWithWorker = throttle(function () {
    // Post to the first available worker
    this.tracker.brf.workers.some(webworker => {
      if (webworker.isReady) {
        webworker.isReady = false
        webworker.worker.postMessage({
          action: 'trackFaces',
          pixels: this.debug.$canvas.getContext('2d').getImageData(0, 0, this.debug.$canvas.width, this.debug.$canvas.height)
        })
        return true
      }
    })
  }, 1000 / 2)

  /**
   * Track faces
   * - Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   *
   * @param {Null|Array} poses Either null to estimate poses, or an array of poses to track
   */
  Handsfree.prototype.trackFacesInMain = function () {
    const ctx = this.debug.ctx
    const resolution = this.brf.resolution

    // mirrors the context
    ctx.drawImage(this.debug.$webcam, 0, 0, resolution.width, resolution.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    // Get faces
    this.brf.manager.update(ctx.getImageData(0, 0, resolution.width, resolution.height).data)
    const faces = this.brf.manager.getFaces()
    faces.forEach((face, n) => this.pose[n].face = face)

    console.log('trackFacesInMain', faces)
  }

  /**
   * Wait for the BRFv4 SDK to finish loading before initializing it
   */
  Handsfree.prototype.waitForBRFSDK = async function () {
    // Set up the namespace and initialize BRFv4.
    // locateFile tells the asm.js version where to find the .mem file.
    // wasmBinary gets the preloaded .wasm file.
    if (this.brf.sdk === null) {
      const BRFvInitializer = await require('../../public/models/BRFv4_JS_TK110718_v4.1.0_trial.js')
      this.brf.sdk = {
        locateFile: fileName => this.brf.baseURL + fileName,
        wasmBinary: this.brf.WASMBuffer
      }
      BRFvInitializer(this.brf.sdk)
      window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 30}}))
    }

    if (this.brf.sdk && this.brf.sdk.sdkReady) {
      this.initBRFSDK()
    } else {
      // @TODO let's optimize this wait time
      setTimeout(() => this.waitForBRFSDK(), 250)
    }
  }

  /**
   * Finally, let's initialize the SDK
   */
  Handsfree.prototype.initBRFSDK = function () {
    this.brf.resolution = new this.brf.sdk.Rectangle(0, 0, this.debug.$canvas.width, this.debug.$canvas.height)
    this.brf.manager = new this.brf.sdk.BRFManager()
    this.brf.manager.init(this.brf.resolution, this.brf.resolution, 'js.handsfree')
    this.brf.manager.setNumFacesToTrack(this.settings.maxPoses)
    window.dispatchEvent(new CustomEvent('handsfree:loading', {detail: {progress: 100}}))

    this.tracker.brf.isReady = true
    this.isTracking = true
    this.trackPoses()
  }

  /**
   * Calculates the X/Y the user is facing
   */
  Handsfree.prototype.getBRFv4Cursors = function () {
    this.pose.forEach((pose, i) => {
      const face = pose.face

      // Add enough helper object.
      while (i >= this.tweenFaces.length) {
        this.tweenFaces.push({
          x: -1,
          y: -1,
          rx: 0.0,
          ry: 0.0,
          positionList: []
        })
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

      this.pose[i].face.cursor = {
        x: tweenFace.x,
        y: tweenFace.y
      }
    })
  }
}