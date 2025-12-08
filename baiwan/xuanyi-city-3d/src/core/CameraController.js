import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { eventBus } from './EventBus.js'

/**
 * Camera controller with orbit controls
 */
export class CameraController {
  /**
   * @param {HTMLElement} domElement - Canvas element for controls
   */
  constructor(domElement) {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    this.camera.position.set(300, 200, 400)

    this.controls = new OrbitControls(this.camera, domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.screenSpacePanning = false
    this.controls.minDistance = 50
    this.controls.maxDistance = 2000
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1 // Prevent going below ground
    this.controls.target.set(0, 0, 0)

    this.setupEventListeners()
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
    this.controls.addEventListener('change', () => {
      eventBus.emit('camera:change', {
        position: this.camera.position.clone(),
        target: this.controls.target.clone()
      })
    })
  }

  onResize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    eventBus.emit('camera:resize', { width, height })
  }

  /**
   * Update controls (call in animation loop)
   */
  update() {
    this.controls.update()
  }

  /**
   * Get the camera
   * @returns {THREE.PerspectiveCamera}
   */
  getCamera() {
    return this.camera
  }

  /**
   * Set camera position
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  setPosition(x, y, z) {
    this.camera.position.set(x, y, z)
    this.controls.update()
  }

  /**
   * Set orbit target
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  setTarget(x, y, z) {
    this.controls.target.set(x, y, z)
    this.controls.update()
  }

  /**
   * Smoothly move camera to position
   * @param {THREE.Vector3} position - Target position
   * @param {THREE.Vector3} target - Look at target
   * @param {number} duration - Animation duration in ms
   */
  flyTo(position, target, duration = 1000) {
    const startPos = this.camera.position.clone()
    const startTarget = this.controls.target.clone()
    const startTime = performance.now()

    const animate = () => {
      const elapsed = performance.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // Ease out cubic

      this.camera.position.lerpVectors(startPos, position, eased)
      this.controls.target.lerpVectors(startTarget, target, eased)
      this.controls.update()

      if (t < 1) {
        requestAnimationFrame(animate)
      } else {
        eventBus.emit('camera:flyComplete')
      }
    }

    animate()
  }

  /**
   * Dispose of resources
   */
  dispose() {
    window.removeEventListener('resize', this.onResize)
    this.controls.dispose()
  }
}
