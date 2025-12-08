import * as THREE from 'three'
import { eventBus } from './EventBus.js'

/**
 * Manages the Three.js scene lifecycle
 */
export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x87ceeb) // Default sky blue
  }

  /**
   * Add an object to the scene
   * @param {THREE.Object3D} object - Object to add
   */
  add(object) {
    this.scene.add(object)
    eventBus.emit('scene:objectAdded', object)
  }

  /**
   * Remove an object from the scene
   * @param {THREE.Object3D} object - Object to remove
   */
  remove(object) {
    this.scene.remove(object)
    eventBus.emit('scene:objectRemoved', object)
  }

  /**
   * Set scene background color
   * @param {number|THREE.Color} color - Background color
   */
  setBackground(color) {
    if (color instanceof THREE.Color) {
      this.scene.background = color
    } else {
      this.scene.background = new THREE.Color(color)
    }
  }

  /**
   * Set environment map for reflections
   * @param {THREE.CubeTexture} envMap - Environment map
   */
  setEnvironment(envMap) {
    this.scene.environment = envMap
  }

  /**
   * Get the Three.js scene object
   * @returns {THREE.Scene}
   */
  getScene() {
    return this.scene
  }

  /**
   * Traverse all objects in scene
   * @param {Function} callback - Callback for each object
   */
  traverse(callback) {
    this.scene.traverse(callback)
  }

  /**
   * Dispose of scene resources
   */
  dispose() {
    this.scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
    this.scene.clear()
  }
}
