/**
 * Sets up handsfree.js
 */
require('./assets/handsfree.styl')
const OzWinkyFace = require('./store/faces/oz-winky-face.json')

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line
  window.handsfree = new Handsfree({debug: true})
  const handsfree = window.handsfree

  /**
   * Boids Debugger Plugin
   * - Adds a fullscreen canvas
   * - Places boids on the screen
   * - Boids do their own thing when camera is off
   * - Boids gather to face landmark points when turned on
   * 
   * @see https://codepen.io/scorch/pen/aWzJgW
   */
  const BoidsDebugger = handsfree.use({
    name: 'boids-debugger',

    // The canvas context
    canvas: [
      // Boids
      {$: null, ctx: null},
      // Orbs
      {$: null, ctx: null}
    ],

    // The element containing the canvases
    $wrap: null,

    // The offset to move boids to
    offset: {
      x: 0,
      y: 0
    },
    
    // How fast to move by
    rateOfChange: 0.01,
    // How much extra time to wait before flying back
    doYourOwnThingTimer: 3000,
    // When a Boid is deleted, it's ID is added here for reuse
    // Id's match a corresponding face landmark
    freedIDs: [],
    
    // The point boids return to
    returnPoint: {
      x: 0,
      y: 0
    },
    
    // Defaulting to 64 since we have 64 face landmarks
    maxBoids: 64,
    // Collection of boid instances
    boids: [],

    /**
     * Setup the canvas and boids
     */
    onUse () {
      // Add the wrapper
      this.$wrap = document.createElement('div')
      this.$wrap.classList.add('handsfree-boids-debugger-wrap')
      this.$wrap.width = window.innerWidth
      document.body.appendChild(this.$wrap)

      // Add the canvas
      for (let i = 0; i < 2; i++) {
        this.canvas[i].$ = document.createElement('canvas')
        this.canvas[i].ctx = this.canvas[i].$.getContext('2d')
        this.$wrap.appendChild(this.canvas[i].$)
      }
      this.canvas[0].$.classList.add('handsfree-boids-debugger-primary-canvas')
      this.canvas[0].$.classList.add('handsfree-boids-debugger-secondary-canvas')

      // Reponsive
      setInterval(() => this.animateBoids(), 1000/29.9)
      window.addEventListener('resize', () => this.onResize())
      this.onResize()

      // update point to where the mouse cursor is
      document.onmousemove = e => this.returnPoint = {x: e.pageX, y: e.pageY}
      
      // Start boid loop
      setTimeout(() => this.createInitialBoids(), 0)
      setTimeout(() => {
        this.rateOfChange = 0.98
        this.doYourOwnThingTimer = 0
      }, 3000)
    },
    
    /**
     * Animates the boids
     */
    animateBoids () {
      // Draw orbs
      this.canvas[1].ctx.beginPath()
      this.canvas[1].ctx.rect(0, 0, this.canvas[1].$.width, this.canvas[1].$.height)
      this.canvas[1].ctx.fillStyle = 'rgba(18, 10, 34, 0.5)'
      this.canvas[1].ctx.fill()

      // Draw Boids
      if (this.boids.length < this.maxBoids) {
        const boid = new Boid()
        boid.id = this.freedIDs.pop()
        boid.color = handsfree.getPointColor(boid.id)
        this.boids.push(boid)
      }
      this.canvas[0].ctx.clearRect(0, 0, this.canvas[0].$.width, this.canvas[0].$.height)
      this.canvas[0].ctx.globalAlpha = 0.1

      // Remove any boids who's update method returns false,
      // meaning it was out of bounds
      this.boids = this.boids.filter(p => p.update())
    },

    /**
     * Resizes an element to match the window size
     */
    resize ($el) {
      $el.width = window.innerWidth
      $el.height = window.innerHeight
    },

    /**
     * Resizes all canvas elements
     */
    onResize () {
      this.resize(this.$wrap)
      this.resize(this.canvas[0].$)
      this.resize(this.canvas[1].$)

      this.offset.x = window.innerWidth / 2 - OzWinkyFace[0].translationX
      this.offset.y = -OzWinkyFace[0].translationY / 4
    },

    /**
     * Creates the 64 initial boids in a "face" position
     */
    createInitialBoids () {
      for(let i = 0; i < 65; i++) {
        const boid = new Boid()
        boid.pos = {
          x: OzWinkyFace[0].points[i].x + this.offset.x,
          y: OzWinkyFace[0].points[i].y + this.offset.y
        }
        boid.color = handsfree.getPointColor(i)
        boid.id = i
        this.boids.push(boid)
      }
    }
  })

  /**
   * Represents a single boid
   */
  const Boid = function () {
    this.pos = {
      x: Math.random() * BoidsDebugger.canvas[0].$.width * 0.8 + BoidsDebugger.canvas[0].$.width * 0.1,
      y: Math.random() * BoidsDebugger.canvas[0].$.height * 0.8 + BoidsDebugger.canvas[0].$.height * 0.1
    }
    this.r = 1
    this.speed = 6
    this.step = Math.random() * 400
    this.vx = Math.random() * this.speed / 4 - this.speed / 8
    this.vy = Math.random() * this.speed / 4 - this.speed / 8
    this.color = '#ff0'
    this.history = []
    
    this.update = function () {
      //////////////////////////////////////
      this.step ++
      this.step %= 400
      if (this.history.length > 5){
        this.history.shift()
      }
      this.pos.x += this.vx
      this.pos.y += this.vy
      this.vx = this.vx * BoidsDebugger.rateOfChange + (Math.random() * this.speed * 2 - this.speed) * 0.12
      this.vy = this.vy * BoidsDebugger.rateOfChange + (Math.random() * this.speed * 2 - this.speed) * 0.12
      
      var dx = OzWinkyFace[0].points[this.id].x - this.pos.x 
      var dy = OzWinkyFace[0].points[this.id].y - this.pos.y 

      // After some time, "fly back home"
      if(this.step > 365 + this.doYourOwnThingTimer) {
        //mouse
        this.vx = this.vx * 0.9 + dx * 0.004
        this.vy = this.vy * 0.9 + dy * 0.004
        this.vx = Math.min(this.vx,  4.0)
        this.vx = Math.max(this.vx, -4.0)
        this.vy = Math.min(this.vy,  4.0)
        this.vy = Math.max(this.vy, -4.0)
      }
      
      // Repel from mouse
      if (handsfree.isTracking) {
        // > Repel
        // this.vx = this.vx * 0.9 - (OzWinkyFace[0].points[this.id].x - this.pos.x ) * 0.002
        // this.vy = this.vy * 0.9 - (OzWinkyFace[0].points[this.id].y - this.pos.y ) * 0.002
        // > Attract
        this.vx = this.vx * 0.9 - (this.pos.x - OzWinkyFace[0].points[this.id].x - BoidsDebugger.offset.x) * 0.025
        this.vy = this.vy * 0.9 - (this.pos.y - OzWinkyFace[0].points[this.id].y - BoidsDebugger.offset.y) * 0.025
      }
      
      //////////////////////////////////////
      if (this.history.length > 4){
        BoidsDebugger.canvas[1].ctx.beginPath()
        BoidsDebugger.canvas[1].ctx.moveTo(this.pos.x ,this.pos.y)
        for (var i = this.history.length-1; i >= 0;  i--){
          BoidsDebugger.canvas[1].ctx.lineTo(this.history[i].x ,this.history[i].y)
        }
        // BoidsDebugger.canvas[1].ctx.fillStyle = `hsla(${Math.sin( this.step / 300) * 70 + 70},${99}%,${50}%,1)`
        // BoidsDebugger.canvas[1].ctx.strokeStyle = `hsla(${Math.sin( this.step / 300) * 70 + 70},${99}%,${50}%,0.5)`
        BoidsDebugger.canvas[1].ctx.fillStyle = this.color
        BoidsDebugger.canvas[1].ctx.strokeStyle = this.color
        BoidsDebugger.canvas[1].ctx.fill()
        BoidsDebugger.canvas[1].ctx.lineWidth = 2
        BoidsDebugger.canvas[1].ctx.lineJoin = "round"
        // BoidsDebugger.canvas[1].ctx.closePath()
        BoidsDebugger.canvas[1].ctx.stroke()
        
        // orb
        BoidsDebugger.canvas[0].ctx.beginPath()
        BoidsDebugger.canvas[0].ctx.fillStyle = `rgba(250,250,250,0.05)`
        BoidsDebugger.canvas[0].ctx.fillStyle = this.color
        
        BoidsDebugger.canvas[0].ctx.arc(this.history[4].x ,this.history[4].y , 13.4, 0, 2 * Math.PI)
        BoidsDebugger.canvas[0].ctx.fill()
      }
      
      // Delete the boid if it goes out of bounds
      if (this.pos.x > BoidsDebugger.canvas[0].$.width || this.pos.x < 0 || this.pos.y > BoidsDebugger.canvas[0].$.height || this.pos.y < 0) {
        BoidsDebugger.freedIDs.push(this.id)
        delete this.pos
        delete this.history
        return false
      }

      // The boid is still in bounds, lets update its history
      this.history.push({
        x: this.pos.x,
        y: this.pos.y
      })
      return true
    }  
  }
})