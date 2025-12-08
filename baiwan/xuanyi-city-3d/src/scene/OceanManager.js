import * as THREE from 'three'
import oceanVertexShader from '../render/shaders/ocean.vert'
import oceanFragmentShader from '../render/shaders/ocean.frag'
import { eventBus } from '../core/EventBus.js'

/**
 * Ocean rendering with custom shader
 */
export class OceanManager {
  /**
   * @param {THREE.Scene} scene
   * @param {Object} options
   */
  constructor(scene, options = {}) {
    this.scene = scene
    this.options = {
      size: options.size ?? 2000,
      subdivisions: options.subdivisions ?? 128,
      waveHeight: options.waveHeight ?? 2.0,
      waveFrequency: options.waveFrequency ?? 0.05,
      deepColor: options.deepColor ?? [0, 0.1, 0.3],
      shallowColor: options.shallowColor ?? [0, 0.4, 0.6],
      fresnelPower: options.fresnelPower ?? 3.0,
      fresnelColor: options.fresnelColor ?? [0.8, 0.9, 1.0],
      ...options
    }

    this.envMap = null
    this.mesh = null
    this.uniforms = null

    this.createOcean()
  }

  createOcean() {
    // Create subdivided plane geometry
    const geometry = new THREE.PlaneGeometry(
      this.options.size,
      this.options.size,
      this.options.subdivisions,
      this.options.subdivisions
    )
    geometry.rotateX(-Math.PI / 2)

    // Create shader uniforms
    this.uniforms = {
      uTime: { value: 0 },
      uWaveHeight: { value: this.options.waveHeight },
      uWaveFrequency: { value: this.options.waveFrequency },
      uDeepColor: { value: new THREE.Color(...this.options.deepColor) },
      uShallowColor: { value: new THREE.Color(...this.options.shallowColor) },
      uFresnelColor: { value: new THREE.Color(...this.options.fresnelColor) },
      uFresnelPower: { value: this.options.fresnelPower },
      uEnvMap: { value: null },
      uEnvMapEnabled: { value: false }
    }

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader: oceanVertexShader,
      fragmentShader: oceanFragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.name = 'ocean'
    this.mesh.receiveShadow = true

    this.scene.add(this.mesh)

    eventBus.emit('ocean:created')
  }

  /**
   * Set environment map for reflections
   * @param {THREE.CubeTexture} envMap
   */
  setEnvironmentMap(envMap) {
    this.envMap = envMap
    this.uniforms.uEnvMap.value = envMap
    this.uniforms.uEnvMapEnabled.value = true
  }

  /**
   * Enable/disable environment reflections
   * @param {boolean} enabled
   */
  setReflectionEnabled(enabled) {
    this.uniforms.uEnvMapEnabled.value = enabled && this.envMap !== null
  }

  /**
   * Set wave height
   * @param {number} height
   */
  setWaveHeight(height) {
    this.uniforms.uWaveHeight.value = height
  }

  /**
   * Set wave frequency
   * @param {number} frequency
   */
  setWaveFrequency(frequency) {
    this.uniforms.uWaveFrequency.value = frequency
  }

  /**
   * Set deep water color
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  setDeepColor(r, g, b) {
    this.uniforms.uDeepColor.value.setRGB(r, g, b)
  }

  /**
   * Set shallow water color
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  setShallowColor(r, g, b) {
    this.uniforms.uShallowColor.value.setRGB(r, g, b)
  }

  /**
   * Set fresnel power
   * @param {number} power
   */
  setFresnelPower(power) {
    this.uniforms.uFresnelPower.value = power
  }

  /**
   * Update ocean animation
   * @param {number} deltaTime
   */
  update(deltaTime) {
    if (this.uniforms) {
      this.uniforms.uTime.value += deltaTime
    }
  }

  /**
   * Set ocean quality (subdivisions)
   * @param {number} subdivisions
   */
  setQuality(subdivisions) {
    // Recreate geometry with new subdivisions
    const oldGeometry = this.mesh.geometry
    this.mesh.geometry = new THREE.PlaneGeometry(
      this.options.size,
      this.options.size,
      subdivisions,
      subdivisions
    )
    this.mesh.geometry.rotateX(-Math.PI / 2)
    oldGeometry.dispose()
  }

  /**
   * Set visibility
   * @param {boolean} visible
   */
  setVisible(visible) {
    this.mesh.visible = visible
  }

  /**
   * Dispose of resources
   */
  dispose() {
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    this.scene.remove(this.mesh)
  }
}
