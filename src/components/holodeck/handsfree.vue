<template lang="pug">
div
  #holodeck.navbar-pad(ref='container')
</template>

<script>
import {TweenMax} from 'gsap'

/**
 * Setup Three
 * @todo Only load when needed
 */
let $script = document.createElement('script')
$script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/99/three.min.js'
document.body.appendChild($script)

/**
 * Holodeck
 * - Emmits a 'handsfree:onFrame' on the iframe with camera config
 */
export default {  
  mounted () {
    this.$store.dispatch('onReady', () => {
      const handsfree = window.handsfree
      this.setupThree()
      
      handsfree.plugin['boids-debugger'].disable()

      handsfree.use({
        name: 'holodeck',

        // Whether the cursor should be visible (true) or not (false) when over the iframe
        showCursor: false,

        // Used for tweening
        tween: {
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0
        },
        
        /**
         * This is called on each webcam frame
         * @param {Array} faces An array of detected faces
         */
        onFrame (faces) {
          faces.forEach(face => {
            // Show/hide cursor
            if (face.cursor.state.mouseDown) {
              this.showCursor = !this.showCursor
            }

            // Hide cursor when over the iframe
            if (face.cursor.$target && face.cursor.$target.nodeName === 'CANVAS') {
              handsfree.cursor.$el.style.display = this.showCursor ? 'inherit' : 'none'
            } else {
              handsfree.cursor.$el.style.display = 'inherit'
            }
            
            // Update positions
            this.tweenPOV(face)
            this.renderer.render(this.scene, this.camera)
          })
        },

        /**
         * Updates the pov
         */
        tweenPOV (face) {
          TweenMax.to(this.tween, 500 / 1000, {
            rotationX: face.rotationX,
            rotationY: face.rotationY,
            rotationZ: face.rotationZ,
            ease: 'Linear.easeNone',
            overwrite: true,
            immediate: true
          })
        }
      })
    })
  },

  methods: {
    /**
     * @see https://www.auduno.com/headtrackr/examples/targets.html
     */
    setupThree () {
      // Wait for THREE
      if (!window.THREE) {
        setTimeout(() => this.setupThree(), 50)
        return
      }
      
      // Setup
      const container = this.$refs.container
      const THREE = window.THREE
      
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(23, window.innerWidth / window.innerHeight, 1, 100000)

      this.scene.fog = new THREE.Fog(0x000000, 1, 5000)
      this.camera.position.z = 6000
      this.scene.add(this.camera)

      //top wall
      const plane1 = new THREE.Mesh( new THREE.PlaneGeometry( 500, 3000, 5, 15 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true } ) )
      plane1.rotation.x = Math.PI/2
      plane1.position.y = 250
      plane1.position.z = 50-1500
      this.scene.add( plane1 )
      
      //left wall
      const plane2 = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 500, 15, 5 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true } ) )
      plane2.rotation.y = Math.PI/2
      plane2.position.x = -250
      plane2.position.z = 50-1500
      this.scene.add( plane2 )
      
      //right wall
      const plane3 = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 500, 15, 5 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true	} ) )
      plane3.rotation.y = -Math.PI/2
      plane3.position.x = 250
      plane3.position.z = 50-1500
      this.scene.add( plane3 )
      
      //bottom wall
      const plane4 = new THREE.Mesh( new THREE.PlaneGeometry( 500, 3000, 5, 15 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true	} ) )
      plane4.rotation.x = -Math.PI/2
      plane4.position.y = -250
      plane4.position.z = 50-1500
      this.scene.add( plane4 )

      // Create targets
      this.createTarget(-150,-150,-550)
      this.createTarget(0,-150,-200)
      this.createTarget(100,0,500)
      this.createTarget(-150,100,0)
      this.createTarget(150,-100,-1050)
      this.createTarget(50,0,1100)
      this.createTarget(-50,-50,600)
      this.createTarget(0,150,-2100)
      this.createTarget(-130,0,-700)      

      // Attach things
      this.renderer = new THREE.WebGLRenderer({clearAlpha: 1})
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(this.renderer.domElement)

      // Render
      this.setupHeadtrackedCamera(this.camera, 27, [0, 0, 50], new THREE.Vector3(0, 0, 0), {damping: 0.5})
      this.renderer.render(this.scene, this.camera)
    },

    /**
     * Adds a target to the THREE scene
     */
    createTarget (x, y, z) {
      const THREE = window.THREE
      
      // Cylinder
      const cylinder = new THREE.Mesh( new THREE.CylinderGeometry(30,30,1,20,1,false), new THREE.MeshBasicMaterial( { color : 0xeeeeee} ) )
      cylinder.position.x = x
      cylinder.rotation.x = Math.PI/2
      cylinder.position.y = y
      cylinder.position.z = z
      this.scene.add( cylinder )
      
      const geometry = new THREE.Geometry()
      geometry.vertices.push( new THREE.Vector3( 0, 0, -80000 ) )
      geometry.vertices.push( new THREE.Vector3( 0, 0, z ) )
      const line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xeeeeee } ) )
      line.position.x = x
      line.position.y = y
      this.scene.add( line )
    },

    /**
     * Controls a THREE.js camera to create pseudo-3D effect
     *
     * Needs the position of "screen" in 3d-model to be given up front, and to be static (i.e. absolute) during headtracking
     * 
     * @see https://www.auduno.com/headtrackr/examples/js/headtrackr.js
     *
     * @param {THREE.PerspectiveCamera} camera
     * @param {number} scaling The scaling of the "screen" in the 3d model. 
     *   This is the vertical size of screen in 3d-model relative to vertical size of computerscreen in real life
     * @param {array} fixedPosition array with attributes x,y,z, position of "screen" in 3d-model
     * @param {THREE.Vector3} lookAt the object/position the camera should be pointed towards
     * @param {object} params optional object with optional parameters
     *
     * Optional parameters:
     *   screenHeight : vertical size of computer screen (default is 20 cm, i.e. typical laptop size)
     */
    setupHeadtrackedCamera (camera, scaling, fixedPosition, lookAt, params = {}) {
      let screenHeight_cms = params.screenHeight || 20
      if (typeof params.damping === 'undefined') params.damping = 1
      
      // Set position
      this.camera.position.x = fixedPosition[0]
      this.camera.position.y = fixedPosition[1]
      this.camera.position.z = fixedPosition[2]
      this.camera.lookAt(lookAt)
      
      this.wh = screenHeight_cms * scaling
      this.ww = this.wh * this.camera.aspect
      
      document.addEventListener('headtrackingEvent', (event) => {
        // update camera
        let xOffset = event.x > 0 ? 0 : -event.x * 2 * params.damping * scaling
        let yOffset = event.y < 0 ? 0 : event.y * 2 * params.damping * scaling
        this.camera.setViewOffset(this.ww + Math.abs(event.x * 2 * params.damping * scaling), this.wh + Math.abs(event.y * params.damping * 2 * scaling), xOffset, yOffset, this.ww, this.wh)
        
        this.camera.position.x = fixedPosition[0] + (event.x * scaling * params.damping )
        this.camera.position.y = fixedPosition[1] + (event.y * scaling * params.damping )
        this.camera.position.z = fixedPosition[2] + (event.z * scaling)
        
        // update lookAt?
        
        // when changing height of window, we need to change field of view
        this.camera.fov = Math.atan((this.wh / 2 + Math.abs(event.y * scaling * params.damping ))/(Math.abs(event.z*scaling)))*360/Math.PI

        //debugger
        this.camera.updateProjectionMatrix()
      }, false)
    }
  },

  data () {
    return {
      // THREE.js
      renderer: null,
      scene: null,
      camera: null,
      ww: 0,
      wh: 0
    }
  }
}
</script>

<style scoped lang="stylus">
>>>#holodeck
  position: fixed
  top: 0
  left: 0
  height: 100%
  width: 100%

  > canvas
    width: 100%
    height: 100%
</style>
