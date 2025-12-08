import * as THREE from 'three'
import { eventBus } from './EventBus.js'
import { SceneManager } from './SceneManager.js'
import { CameraController } from './CameraController.js'

/**
 * Main application entry point
 */
export class Application {
  /**
   * @param {HTMLElement} container - Container element for the canvas
   */
  constructor(container) {
    this.container = container
    this.isRunning = false
    this.clock = new THREE.Clock()

    this.initRenderer()
    this.sceneManager = new SceneManager()
    this.cameraController = new CameraController(this.renderer.domElement)

    this.systems = []

    this.setupEventListeners()
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.container.appendChild(this.renderer.domElement)
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))

    eventBus.on('camera:resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  /**
   * Register a system to be updated each frame
   * @param {Object} system - System with update(deltaTime) method
   */
  addSystem(system) {
    this.systems.push(system)
  }

  /**
   * Remove a system
   * @param {Object} system - System to remove
   */
  removeSystem(system) {
    const index = this.systems.indexOf(system)
    if (index !== -1) {
      this.systems.splice(index, 1)
    }
  }

  /**
   * Start the animation loop
   */
  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.clock.start()
    this.animate()
    eventBus.emit('app:started')
  }

  /**
   * Stop the animation loop
   */
  stop() {
    this.isRunning = false
    this.clock.stop()
    eventBus.emit('app:stopped')
  }

  animate() {
    if (!this.isRunning) return

    requestAnimationFrame(this.animate.bind(this))

    const deltaTime = this.clock.getDelta()

    // Update camera controls
    this.cameraController.update()

    // Update all registered systems
    for (const system of this.systems) {
      if (system.update) {
        system.update(deltaTime)
      }
    }

    // Render
    this.render()

    eventBus.emit('app:frame', { deltaTime })
  }

  /**
   * Render the scene (can be overridden by PostProcessPipeline)
   */
  render() {
    this.renderer.render(
      this.sceneManager.getScene(),
      this.cameraController.getCamera()
    )
  }

  /**
   * Set custom render function (for post-processing)
   * @param {Function} renderFn - Custom render function
   */
  setRenderFunction(renderFn) {
    this.render = renderFn
  }

  /**
   * Get renderer info for debugging
   * @returns {Object}
   */
  getRendererInfo() {
    const info = this.renderer.info
    return {
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      textures: info.memory.textures,
      geometries: info.memory.geometries
    }
  }

  /**
   * Dispose of all resources
   */
  dispose() {
    this.stop()
    this.sceneManager.dispose()
    this.cameraController.dispose()
    this.renderer.dispose()
    this.container.removeChild(this.renderer.domElement)
  }
}
