import * as THREE from 'three'
import { eventBus } from '../core/EventBus.js'

/**
 * Level of Detail manager for optimizing rendering
 */
export class LODManager {
  /**
   * @param {THREE.Camera} camera
   * @param {Object} options
   */
  constructor(camera, options = {}) {
    this.camera = camera
    this.lodGroups = []

    this.distances = options.distances ?? [100, 300, 600]
    this.multiplier = options.multiplier ?? 1.0
  }

  /**
   * Create LOD object for a building
   * @param {THREE.BufferGeometry[]} geometries - Array of geometries for each LOD level
   * @param {THREE.Material} material
   * @param {Object} buildingData
   * @returns {THREE.LOD}
   */
  createLOD(geometries, material, buildingData) {
    const lod = new THREE.LOD()

    // LOD0 - Full detail
    if (geometries[0]) {
      const mesh0 = new THREE.Mesh(geometries[0], material)
      mesh0.castShadow = true
      mesh0.receiveShadow = true
      lod.addLevel(mesh0, 0)
    }

    // LOD1 - Simplified
    if (geometries[1]) {
      const mesh1 = new THREE.Mesh(geometries[1], material)
      mesh1.castShadow = true
      mesh1.receiveShadow = true
      lod.addLevel(mesh1, this.distances[0] * this.multiplier)
    }

    // LOD2 - Box proxy
    if (geometries[2]) {
      const mesh2 = new THREE.Mesh(geometries[2], material)
      mesh2.castShadow = false
      mesh2.receiveShadow = true
      lod.addLevel(mesh2, this.distances[1] * this.multiplier)
    }

    // LOD3 - Billboard/sprite
    const sprite = this.createBillboard(buildingData, material)
    if (sprite) {
      lod.addLevel(sprite, this.distances[2] * this.multiplier)
    }

    lod.userData.buildingData = buildingData
    this.lodGroups.push(lod)

    return lod
  }

  /**
   * Create billboard sprite for distant LOD
   * @param {Object} buildingData
   * @param {THREE.Material} material
   * @returns {THREE.Sprite}
   */
  createBillboard(buildingData, material) {
    const color = material.color || new THREE.Color(0x888888)

    // Create a simple colored sprite
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')

    // Draw building silhouette
    ctx.fillStyle = `#${color.getHexString()}`
    ctx.fillRect(16, 8, 32, 48)

    const texture = new THREE.CanvasTexture(canvas)
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true
    })

    const sprite = new THREE.Sprite(spriteMaterial)

    // Scale based on building size
    const size = buildingData.volume ? Math.pow(buildingData.volume, 1 / 3) : 20
    sprite.scale.set(size * 0.5, size * 0.8, 1)

    return sprite
  }

  /**
   * Update all LOD objects
   */
  update() {
    for (const lod of this.lodGroups) {
      lod.update(this.camera)
    }
  }

  /**
   * Set LOD distance multiplier
   * @param {number} multiplier
   */
  setMultiplier(multiplier) {
    this.multiplier = multiplier
    // Would need to rebuild LODs to apply new distances
    eventBus.emit('lod:multiplierChanged', multiplier)
  }

  /**
   * Set LOD distances
   * @param {number[]} distances
   */
  setDistances(distances) {
    this.distances = distances
    eventBus.emit('lod:distancesChanged', distances)
  }

  /**
   * Get current LOD level for a position
   * @param {THREE.Vector3} position
   * @returns {number}
   */
  getLODLevel(position) {
    const distance = this.camera.position.distanceTo(position)
    const d = this.distances.map((d) => d * this.multiplier)

    if (distance < d[0]) return 0
    if (distance < d[1]) return 1
    if (distance < d[2]) return 2
    return 3
  }

  /**
   * Get statistics about current LOD distribution
   * @returns {Object}
   */
  getStats() {
    const stats = { lod0: 0, lod1: 0, lod2: 0, lod3: 0, total: this.lodGroups.length }

    for (const lod of this.lodGroups) {
      const level = lod.getCurrentLevel()
      if (level === 0) stats.lod0++
      else if (level === 1) stats.lod1++
      else if (level === 2) stats.lod2++
      else stats.lod3++
    }

    return stats
  }

  /**
   * Show LOD levels visually (for debugging)
   * @param {boolean} show
   */
  showLODLevels(show) {
    const colors = [0x00ff00, 0xffff00, 0xff8800, 0xff0000]

    for (const lod of this.lodGroups) {
      if (show) {
        const level = lod.getCurrentLevel()
        lod.traverse((child) => {
          if (child.material && child.material.emissive) {
            child.material.emissive.setHex(colors[level] || 0x000000)
            child.material.emissiveIntensity = 0.3
          }
        })
      } else {
        lod.traverse((child) => {
          if (child.material && child.material.emissive) {
            child.material.emissiveIntensity = 0
          }
        })
      }
    }
  }

  /**
   * Dispose of all LOD objects
   */
  dispose() {
    for (const lod of this.lodGroups) {
      lod.traverse((child) => {
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (child.material.map) child.material.map.dispose()
          child.material.dispose()
        }
      })
    }
    this.lodGroups = []
  }
}
