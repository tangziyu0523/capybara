import { eventBus } from '../core/EventBus.js'

/**
 * Detects device capabilities and determines quality preset
 */
export class CompatibilityManager {
  constructor() {
    this.capabilities = this.detectCapabilities()
    this.qualityLevel = this.determineQuality()
  }

  detectCapabilities() {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')

    let maxTextureSize = 4096
    let renderer = 'unknown'
    let vendor = 'unknown'

    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      }
    }

    const capabilities = {
      webgl2: !!canvas.getContext('webgl2'),
      webgpu: 'gpu' in navigator,
      maxTextureSize,
      renderer,
      vendor,
      isMobile: /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      devicePixelRatio: window.devicePixelRatio || 1,
      memory: navigator.deviceMemory || 4, // GB, defaults to 4 if not available
      cores: navigator.hardwareConcurrency || 4
    }

    console.log('Device capabilities:', capabilities)
    return capabilities
  }

  determineQuality() {
    const { webgl2, isMobile, maxTextureSize, memory, devicePixelRatio } = this.capabilities

    // No WebGL2 - minimal quality
    if (!webgl2) {
      console.warn('WebGL2 not available, using minimal quality')
      return 'minimal'
    }

    // Mobile device - low quality by default
    if (isMobile) {
      return memory >= 4 ? 'low' : 'minimal'
    }

    // Desktop with limited GPU
    if (maxTextureSize < 4096) {
      return 'medium'
    }

    // High DPI display might need lower quality
    if (devicePixelRatio > 2) {
      return 'medium'
    }

    // Check for known high-performance GPUs
    const renderer = this.capabilities.renderer.toLowerCase()
    if (
      renderer.includes('rtx') ||
      renderer.includes('radeon rx') ||
      renderer.includes('geforce gtx 10') ||
      renderer.includes('geforce gtx 16') ||
      renderer.includes('geforce rtx')
    ) {
      return 'high'
    }

    // Default to medium for unknown desktop GPUs
    return 'medium'
  }

  /**
   * Get the determined quality preset
   * @returns {'high'|'medium'|'low'|'minimal'}
   */
  getQualityLevel() {
    return this.qualityLevel
  }

  /**
   * Get quality-specific settings
   * @returns {Object}
   */
  getQualityPreset() {
    const presets = {
      minimal: {
        shadowMapSize: 512,
        ssao: false,
        bloom: false,
        smaa: false,
        waterReflection: false,
        lodMultiplier: 0.5,
        maxPixelRatio: 1,
        oceanSubdivisions: 32
      },
      low: {
        shadowMapSize: 1024,
        ssao: false,
        bloom: true,
        smaa: false,
        waterReflection: false,
        lodMultiplier: 0.7,
        maxPixelRatio: 1.5,
        oceanSubdivisions: 64
      },
      medium: {
        shadowMapSize: 2048,
        ssao: true,
        bloom: true,
        smaa: true,
        waterReflection: true,
        lodMultiplier: 1.0,
        maxPixelRatio: 2,
        oceanSubdivisions: 128
      },
      high: {
        shadowMapSize: 4096,
        ssao: true,
        bloom: true,
        smaa: true,
        waterReflection: true,
        lodMultiplier: 1.5,
        maxPixelRatio: 2,
        oceanSubdivisions: 256
      }
    }

    return presets[this.qualityLevel] || presets.medium
  }

  /**
   * Override quality level
   * @param {'high'|'medium'|'low'|'minimal'} level
   */
  setQualityLevel(level) {
    this.qualityLevel = level
    eventBus.emit('quality:changed', {
      level,
      preset: this.getQualityPreset()
    })
  }

  /**
   * Check if a specific feature is supported
   * @param {string} feature
   * @returns {boolean}
   */
  supports(feature) {
    switch (feature) {
      case 'webgl2':
        return this.capabilities.webgl2
      case 'webgpu':
        return this.capabilities.webgpu
      case 'touch':
        return this.capabilities.isTouch
      default:
        return false
    }
  }
}

export const compatibilityManager = new CompatibilityManager()
