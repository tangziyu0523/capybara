import * as THREE from 'three'
import { eventBus } from '../core/EventBus.js'

/**
 * Dynamic day/night lighting system
 */
export class LightingSystem {
  /**
   * @param {THREE.Scene} scene
   * @param {Object} options
   */
  constructor(scene, options = {}) {
    this.scene = scene
    this.timeOfDay = options.initialTime ?? 0.3 // Default to morning
    this.autoCycle = false
    this.cycleSpeed = options.cycleSpeed ?? 0.01 // Full cycle per 100 seconds

    // Sky colors for different times
    this.skyColors = {
      night: { sky: 0x0a0a20, ambient: 0x1a1a40, sun: 0x4444aa, intensity: 0.1 },
      dawn: { sky: 0xff7744, ambient: 0x664422, sun: 0xffaa44, intensity: 0.5 },
      day: { sky: 0x87ceeb, ambient: 0x404040, sun: 0xffffff, intensity: 1.0 },
      dusk: { sky: 0xff6644, ambient: 0x442222, sun: 0xff8844, intensity: 0.8 }
    }

    this.setupLights()
  }

  setupLights() {
    // Sun (directional light)
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1)
    this.sunLight.castShadow = true
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.camera.near = 1
    this.sunLight.shadow.camera.far = 2000
    this.sunLight.shadow.camera.left = -500
    this.sunLight.shadow.camera.right = 500
    this.sunLight.shadow.camera.top = 500
    this.sunLight.shadow.camera.bottom = -500
    this.sunLight.shadow.bias = -0.0001
    this.scene.add(this.sunLight)

    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    this.scene.add(this.ambientLight)

    // Hemisphere light (sky-ground)
    this.hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.3)
    this.scene.add(this.hemiLight)

    // Initialize lighting based on time
    this.updateLighting()
  }

  /**
   * Set time of day (0-1)
   * @param {number} time - 0=midnight, 0.25=sunrise, 0.5=noon, 0.75=sunset
   */
  setTime(time) {
    this.timeOfDay = ((time % 1) + 1) % 1 // Normalize to 0-1
    this.updateLighting()
    eventBus.emit('lighting:timeChanged', this.timeOfDay)
  }

  /**
   * Get current time of day
   * @returns {number}
   */
  getTime() {
    return this.timeOfDay
  }

  /**
   * Enable/disable auto cycle
   * @param {boolean} enabled
   */
  setAutoCycle(enabled) {
    this.autoCycle = enabled
    eventBus.emit('lighting:autoCycleChanged', enabled)
  }

  /**
   * Set cycle speed
   * @param {number} speed - Time units per second
   */
  setCycleSpeed(speed) {
    this.cycleSpeed = speed
  }

  /**
   * Update called each frame
   * @param {number} deltaTime
   */
  update(deltaTime) {
    if (this.autoCycle) {
      this.setTime(this.timeOfDay + this.cycleSpeed * deltaTime)
    }
  }

  updateLighting() {
    const t = this.timeOfDay

    // Calculate sun position (circular path)
    const sunAngle = t * Math.PI * 2 - Math.PI / 2
    const sunRadius = 500
    this.sunLight.position.set(
      Math.cos(sunAngle) * sunRadius * 0.3,
      Math.sin(sunAngle) * sunRadius,
      Math.cos(sunAngle) * sunRadius
    )
    this.sunLight.target.position.set(0, 0, 0)

    // Get interpolated colors
    const colors = this.getInterpolatedColors(t)

    // Apply colors
    this.sunLight.color.setHex(colors.sun)
    this.sunLight.intensity = colors.sunIntensity
    this.ambientLight.color.setHex(colors.ambient)
    this.ambientLight.intensity = Math.max(0.2, colors.sunIntensity * 0.5)
    this.hemiLight.color.setHex(colors.sky)
    this.hemiLight.groundColor.setHex(0x8b4513)
    this.hemiLight.intensity = colors.sunIntensity * 0.3

    // Update scene background
    this.scene.background = new THREE.Color(colors.sky)

    // Emit color change for other systems
    eventBus.emit('lighting:colorsChanged', colors)
  }

  getInterpolatedColors(t) {
    // Time periods:
    // 0.00-0.20: Night
    // 0.20-0.30: Dawn
    // 0.30-0.70: Day
    // 0.70-0.80: Dusk
    // 0.80-1.00: Night

    if (t < 0.20 || t >= 0.80) {
      return { ...this.skyColors.night, sunIntensity: 0.1 }
    } else if (t < 0.30) {
      const blend = (t - 0.20) / 0.10
      return this.lerpColors(this.skyColors.night, this.skyColors.dawn, blend, 0.1, 0.5)
    } else if (t < 0.50) {
      const blend = (t - 0.30) / 0.20
      return this.lerpColors(this.skyColors.dawn, this.skyColors.day, blend, 0.5, 1.0)
    } else if (t < 0.70) {
      const blend = (t - 0.50) / 0.20
      return this.lerpColors(this.skyColors.day, this.skyColors.dusk, blend, 1.0, 0.8)
    } else {
      const blend = (t - 0.70) / 0.10
      return this.lerpColors(this.skyColors.dusk, this.skyColors.night, blend, 0.8, 0.1)
    }
  }

  lerpColors(from, to, t, fromIntensity, toIntensity) {
    return {
      sky: this.lerpColor(from.sky, to.sky, t),
      ambient: this.lerpColor(from.ambient, to.ambient, t),
      sun: this.lerpColor(from.sun, to.sun, t),
      sunIntensity: fromIntensity + (toIntensity - fromIntensity) * t
    }
  }

  lerpColor(c1, c2, t) {
    const color1 = new THREE.Color(c1)
    const color2 = new THREE.Color(c2)
    return color1.lerp(color2, t).getHex()
  }

  /**
   * Set shadow map size
   * @param {number} size
   */
  setShadowMapSize(size) {
    this.sunLight.shadow.mapSize.set(size, size)
    this.sunLight.shadow.map?.dispose()
    this.sunLight.shadow.map = null
  }

  /**
   * Get time presets
   * @returns {Object}
   */
  static getPresets() {
    return {
      midnight: 0.0,
      dawn: 0.25,
      morning: 0.35,
      noon: 0.5,
      afternoon: 0.6,
      dusk: 0.75,
      night: 0.9
    }
  }

  /**
   * Dispose of resources
   */
  dispose() {
    this.scene.remove(this.sunLight)
    this.scene.remove(this.ambientLight)
    this.scene.remove(this.hemiLight)
    this.sunLight.shadow.map?.dispose()
  }
}
