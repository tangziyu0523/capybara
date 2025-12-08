import * as THREE from 'three'
import { BuildingGenerator } from './BuildingGenerator.js'
import { eventBus } from '../core/EventBus.js'

/**
 * Manages rendering of all city districts
 */
export class DistrictsManager {
  /**
   * @param {THREE.Scene} scene
   */
  constructor(scene) {
    this.scene = scene
    this.buildingGenerator = new BuildingGenerator()
    this.districtGroups = new Map()
    this.instancedMeshes = new Map()
    this.buildingTypes = {}
    this.time = 0
  }

  /**
   * Load and render all districts from data
   * @param {Object} data - Building data from JSON
   */
  loadFromData(data) {
    this.buildingTypes = data.buildingTypes || {}

    // Create each district
    for (const [key, district] of Object.entries(data.districts)) {
      this.createDistrict(key, district)
    }

    eventBus.emit('districts:loaded', {
      count: Object.keys(data.districts).length
    })
  }

  /**
   * Create a single district
   * @param {string} key - District key
   * @param {Object} district - District data
   */
  createDistrict(key, district) {
    const group = new THREE.Group()
    group.name = district.id
    group.position.set(...district.position)

    // Group buildings by type for instancing
    const buildingsByType = this.groupBuildingsByType(district.buildings)

    // Create instanced meshes for each type
    for (const [type, buildings] of Object.entries(buildingsByType)) {
      const instancedMesh = this.createInstancedMesh(type, buildings, district)
      if (instancedMesh) {
        group.add(instancedMesh)
        this.instancedMeshes.set(`${key}_${type}`, instancedMesh)
      }
    }

    // Handle special buildings (landmarks with glow)
    for (const building of district.buildings) {
      if (building.special?.glow) {
        const mesh = this.createSpecialBuilding(building)
        group.add(mesh)
      }
    }

    // Mark floating districts
    group.userData.floating = district.floating || false
    group.userData.districtId = district.id

    this.districtGroups.set(key, group)
    this.scene.add(group)

    eventBus.emit('district:created', {
      id: district.id,
      name: district.name,
      buildingCount: district.buildings.length
    })
  }

  /**
   * Group buildings by type
   * @param {Array} buildings
   * @returns {Object}
   */
  groupBuildingsByType(buildings) {
    const groups = {}
    for (const building of buildings) {
      // Skip special buildings (they're rendered separately)
      if (building.special?.glow) continue

      const type = building.type || 'default'
      if (!groups[type]) {
        groups[type] = []
      }

      // Handle buildings with count property (multiple instances)
      const count = building.count || 1
      for (let i = 0; i < count; i++) {
        groups[type].push({
          ...building,
          instanceIndex: i
        })
      }
    }
    return groups
  }

  /**
   * Create instanced mesh for a building type
   * @param {string} type
   * @param {Array} buildings
   * @param {Object} district
   * @returns {THREE.InstancedMesh}
   */
  createInstancedMesh(type, buildings, district) {
    if (buildings.length === 0) return null

    // Create material
    const material = this.buildingGenerator.createMaterial(type, this.buildingTypes)

    // Use a single geometry for the instance (we'll scale per instance)
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    const mesh = new THREE.InstancedMesh(geometry, material, buildings.length)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.name = `instanced_${type}`

    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3()

    buildings.forEach((building, i) => {
      const size = this.buildingGenerator.volumeToSize(building.volume)

      // Calculate position
      const basePos = building.position || [0, 0, 0]
      let offsetX = 0
      let offsetZ = 0

      // Spread multiple instances
      if (building.instanceIndex > 0) {
        const angle = (building.instanceIndex / (building.count || 1)) * Math.PI * 2
        const radius = 20
        offsetX = Math.cos(angle) * radius
        offsetZ = Math.sin(angle) * radius
      }

      position.set(
        basePos[0] + offsetX,
        size.height / 2 + (building.position?.[1] || 0),
        basePos[2] + offsetZ
      )

      scale.set(size.width, size.height, size.depth)

      // Apply rotation if specified
      if (building.rotation) {
        quaternion.setFromEuler(new THREE.Euler(0, building.rotation, 0))
      } else {
        quaternion.identity()
      }

      matrix.compose(position, quaternion, scale)
      mesh.setMatrixAt(i, matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
    return mesh
  }

  /**
   * Create a special building (landmark with glow)
   * @param {Object} building
   * @returns {THREE.Mesh}
   */
  createSpecialBuilding(building) {
    const size = this.buildingGenerator.volumeToSize(building.volume)
    const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)

    const material = this.buildingGenerator.createMaterial(
      building.type,
      this.buildingTypes,
      building.special
    )

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(
      building.position?.[0] || 0,
      size.height / 2,
      building.position?.[2] || 0
    )
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.name = building.id
    mesh.userData.isLandmark = true
    mesh.userData.buildingData = building

    return mesh
  }

  /**
   * Update floating districts (gentle bob animation)
   * @param {number} deltaTime
   */
  update(deltaTime) {
    this.time += deltaTime

    this.districtGroups.forEach((group) => {
      if (group.userData.floating) {
        // Gentle bobbing motion
        const bobAmount = Math.sin(this.time * 0.5) * 0.5
        group.position.y = bobAmount
      }
    })
  }

  /**
   * Get district group by key
   * @param {string} key
   * @returns {THREE.Group}
   */
  getDistrict(key) {
    return this.districtGroups.get(key)
  }

  /**
   * Get all district groups
   * @returns {Map}
   */
  getAllDistricts() {
    return this.districtGroups
  }

  /**
   * Set visibility of a district
   * @param {string} key
   * @param {boolean} visible
   */
  setDistrictVisible(key, visible) {
    const group = this.districtGroups.get(key)
    if (group) {
      group.visible = visible
    }
  }

  /**
   * Dispose of all resources
   */
  dispose() {
    this.districtGroups.forEach((group) => {
      group.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
      this.scene.remove(group)
    })

    this.districtGroups.clear()
    this.instancedMeshes.clear()
    this.buildingGenerator.clearCache()
  }
}
