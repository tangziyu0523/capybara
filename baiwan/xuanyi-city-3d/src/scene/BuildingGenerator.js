import * as THREE from 'three'

/**
 * Utility for generating building geometry from volume data
 */
export class BuildingGenerator {
  constructor() {
    this.geometryCache = new Map()
  }

  /**
   * Convert volume to building dimensions
   * @param {number} volume - Building volume in m³
   * @param {Object} options
   * @returns {{width: number, height: number, depth: number}}
   */
  volumeToSize(volume, options = {}) {
    const { aspectRatio = 1.5, minHeight = 5, maxHeight = 150 } = options

    // Calculate base footprint from cube root of volume
    const baseSize = Math.pow(volume, 1 / 3)

    // Apply aspect ratio (width:depth = 1:aspectRatio)
    const width = baseSize * 0.9
    const depth = baseSize * aspectRatio * 0.9
    let height = volume / (width * depth)

    // Clamp height
    height = Math.max(minHeight, Math.min(maxHeight, height))

    return { width, height, depth }
  }

  /**
   * Create geometry for a building
   * @param {Object} buildingData
   * @returns {THREE.BufferGeometry}
   */
  createGeometry(buildingData) {
    const { volume, floors } = buildingData
    const size = this.volumeToSize(volume)

    // Check cache
    const cacheKey = `box_${Math.round(size.width)}_${Math.round(size.height)}_${Math.round(size.depth)}`
    if (this.geometryCache.has(cacheKey)) {
      return this.geometryCache.get(cacheKey)
    }

    // Create box geometry
    const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)

    // Shift origin to bottom
    geometry.translate(0, size.height / 2, 0)

    this.geometryCache.set(cacheKey, geometry)
    return geometry
  }

  /**
   * Create simplified geometry for LOD
   * @param {Object} buildingData
   * @param {number} lodLevel - 0=full, 1=simplified, 2=box, 3=sprite
   * @returns {THREE.BufferGeometry}
   */
  createLODGeometry(buildingData, lodLevel) {
    const size = this.volumeToSize(buildingData.volume)

    switch (lodLevel) {
      case 0:
        return this.createGeometry(buildingData)
      case 1:
        // Simplified - same box but lower poly count could be added
        return new THREE.BoxGeometry(size.width, size.height, size.depth, 1, 1, 1)
      case 2:
        // Box proxy
        return new THREE.BoxGeometry(size.width, size.height, size.depth, 1, 1, 1)
      case 3:
        // For LOD3, return null - will use sprite instead
        return null
      default:
        return this.createGeometry(buildingData)
    }
  }

  /**
   * Create material for building type
   * @param {string} type - Building type
   * @param {Object} buildingTypes - Type definitions with colors
   * @param {Object} special - Special properties (glow, etc)
   * @returns {THREE.Material}
   */
  createMaterial(type, buildingTypes, special = {}) {
    const typeConfig = buildingTypes[type] || { color: '#888888' }
    const color = new THREE.Color(typeConfig.color)

    if (special.glow) {
      // Emissive material for glowing buildings
      return new THREE.MeshStandardMaterial({
        color: color,
        emissive: new THREE.Color(special.glowColor || typeConfig.color),
        emissiveIntensity: special.glowIntensity || 1.0,
        roughness: 0.3,
        metalness: 0.1
      })
    }

    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.7,
      metalness: 0.1
    })
  }

  /**
   * Clear geometry cache
   */
  clearCache() {
    this.geometryCache.forEach((geometry) => geometry.dispose())
    this.geometryCache.clear()
  }
}
