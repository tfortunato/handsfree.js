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
    
    // The point boids return to
    returnPoint: {
      x: 0,
      y: 0
    },
    
    // Defaulting to 64 since we have 64 face landmarks
    maxBoids: 64,
    // Collection of boid instances
    boids: [],

    // Boid Colors
    colors: ['#FF5722', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#B71C1C', '#00BCD4', '#00BCD4', '#009688'],
    
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
      this.boids.length < this.maxBoids && this.boids.push(new Boid())
      this.canvas[0].ctx.clearRect(0, 0, this.canvas[0].$.width, this.canvas[0].$.height)
      this.canvas[0].ctx.globalAlpha = 0.1
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
    },

    /**
     * Creates the 64 initial boids in a "face" position
     */
    createInitialBoids () {
      for(let i = 0; i < 65; i++) {
        const boid = new Boid()
        boid.pos = OzWinkyFace[0].points[i]
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
    this.colIndex = Math.floor(Math.random() * BoidsDebugger.colors.length)
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
      this.vx = this.vx * 0.98 + (Math.random() * this.speed * 2 - this.speed) * 0.12
      this.vy = this.vy * 0.98 + (Math.random() * this.speed * 2 - this.speed) * 0.12
      
      var dx = BoidsDebugger.returnPoint.x - this.pos.x 
      var dy = BoidsDebugger.returnPoint.y - this.pos.y 

      // After some time, "fly back home"
      if(this.step > 365) {
        //mouse
        this.vx = this.vx * 0.9 + dx * 0.004
        this.vy = this.vy * 0.9 + dy * 0.004
        this.vx = Math.min(this.vx,  4.0)
        this.vx = Math.max(this.vx, -4.0)
        this.vy = Math.min(this.vy,  4.0)
        this.vy = Math.max(this.vy, -4.0)
        // center
        // this.vx = this.vx * 0.9 + (canvas.width/2 - this.pos.x ) * 0.002
        // this.vy = this.vy * 0.9 + (canvas.height/2 - this.pos.y ) * 0.002
      }
      
      if(this.step > 100 && this.step < 110) {
        //mouse
        var d = dx * dx + dy * dy
        if (d < (BoidsDebugger.canvas[0].$.height/8 * BoidsDebugger.canvas[0].$.height/8)){
          this.vx = this.vx * 0.9 - (BoidsDebugger.returnPoint.x - this.pos.x ) * 0.002
          this.vy = this.vy * 0.9 - (BoidsDebugger.returnPoint.y - this.pos.y ) * 0.002
        }
        // center
        // this.vx = this.vx * 0.9 + (canvas.width/2 - this.pos.x ) * 0.002
        // this.vy = this.vy * 0.9 + (canvas.height/2 - this.pos.y ) * 0.002
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
        BoidsDebugger.canvas[1].ctx.fillStyle = BoidsDebugger.colors[this.colIndex] 
        BoidsDebugger.canvas[1].ctx.strokeStyle = BoidsDebugger.colors[this.colIndex] 
        BoidsDebugger.canvas[1].ctx.fill()
        BoidsDebugger.canvas[1].ctx.lineWidth = 2
        BoidsDebugger.canvas[1].ctx.lineJoin = "round"
        // BoidsDebugger.canvas[1].ctx.closePath()
        BoidsDebugger.canvas[1].ctx.stroke()
        
        // orb
        BoidsDebugger.canvas[0].ctx.beginPath()
        BoidsDebugger.canvas[0].ctx.fillStyle = `rgba(250,250,250,0.05)`
        BoidsDebugger.canvas[0].ctx.fillStyle = BoidsDebugger.colors[this.colIndex]
        
        BoidsDebugger.canvas[0].ctx.arc(this.history[4].x ,this.history[4].y , 13.4, 0, 2 * Math.PI)
        BoidsDebugger.canvas[0].ctx.fill()
      }
      
      //////////////////////////////////////
      if (this.pos.x > BoidsDebugger.canvas[0].$.width || this.pos.x < 0 || this.pos.y > BoidsDebugger.canvas[0].$.height || this.pos.y < 0) {
        delete this.pos
        delete this.history
        return false
      }
      this.history.push({
        x: this.pos.x,
        y: this.pos.y
      })
      return true
    }  
  }
})