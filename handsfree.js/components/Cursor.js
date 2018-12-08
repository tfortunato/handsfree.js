module.exports = Handsfree => {
  /**
   * Injects the cursor the user moves around
   */
  Handsfree.prototype.injectCursor = function () {
    const $cursor = this.cursor.$el = document.createElement('div')

    $cursor.classList.add('handsfree-cursor')
    $cursor.style.position = 'fixed'
    $cursor.style.background = '#f00'
    $cursor.style.left = '-100px'
    $cursor.style.top = '-100px'
    $cursor.style.width = '20px'
    $cursor.style.height = '20px'
    $cursor.style.borderRadius = '20px'
    $cursor.style.pointerEvents = 'none'
    $cursor.style.zIndex = 99999999999

    document.body.appendChild($cursor)
  }

  /**
   * Calculates the X/Y the user is facing
   */
  Handsfree.prototype.calculateXY = function () {

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
