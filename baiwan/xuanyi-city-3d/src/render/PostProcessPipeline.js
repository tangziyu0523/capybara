import * as THREE from 'three'
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  SMAAEffect,
  ToneMappingEffect,
  ToneMappingMode
} from 'postprocessing'
import { eventBus } from '../core/EventBus.js'

/**
 * Post-processing pipeline with configurable effects
 */
export class PostProcessPipeline {
  /**
   * @param {THREE.WebGLRenderer} renderer
   * @param {THREE.Scene} scene
   * @param {THREE.Camera} camera
   */
  constructor(renderer, scene, camera) {
    this.renderer = renderer
    this.scene = scene
    this.camera = camera

    this.composer = new EffectComposer(renderer)
    this.effects = {}
    this.passes = {}

    this.config = {
      ssao: true,
      bloom: true,
      smaa: true,
      toneMapping: true
    }

    this.setupPipeline()
  }

  setupPipeline() {
    // Render pass
    this.passes.render = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.passes.render)

    // Bloom effect
    this.effects.bloom = new BloomEffect({
      intensity: 0.5,
      luminanceThreshold: 0.85,
      luminanceSmoothing: 0.4,
      mipmapBlur: true
    })

    // Tone mapping
    this.effects.toneMapping = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
      resolution: 256,
      whitePoint: 4.0,
      middleGrey: 0.6,
      minLuminance: 0.01,
      averageLuminance: 0.01,
      adaptationRate: 1.0
    })

    // SMAA anti-aliasing
    this.effects.smaa = new SMAAEffect()

    // Combined effects pass
    this.passes.effects = new EffectPass(
      this.camera,
      this.effects.bloom,
      this.effects.toneMapping,
      this.effects.smaa
    )
    this.composer.addPass(this.passes.effects)
  }

  /**
   * Enable or disable SSAO
   * @param {boolean} enabled
   */
  setSSAOEnabled(enabled) {
    this.config.ssao = enabled
    // Note: Using simplified approach without N8AO for now due to dependency complexity
    eventBus.emit('postprocess:ssaoChanged', enabled)
  }

  /**
   * Enable or disable Bloom
   * @param {boolean} enabled
   */
  setBloomEnabled(enabled) {
    this.config.bloom = enabled
    if (this.effects.bloom) {
      this.effects.bloom.intensity = enabled ? 0.5 : 0
    }
    eventBus.emit('postprocess:bloomChanged', enabled)
  }

  /**
   * Set bloom parameters
   * @param {Object} params
   */
  setBloomParams(params) {
    if (this.effects.bloom) {
      if (params.intensity !== undefined) {
        this.effects.bloom.intensity = params.intensity
      }
      if (params.threshold !== undefined) {
        this.effects.bloom.luminanceThreshold = params.threshold
      }
    }
  }

  /**
   * Enable or disable SMAA anti-aliasing
   * @param {boolean} enabled
   */
  setSMAAEnabled(enabled) {
    this.config.smaa = enabled
    if (this.passes.effects) {
      // Toggle by removing/adding pass
      this.rebuildEffectsPass()
    }
    eventBus.emit('postprocess:smaaChanged', enabled)
  }

  /**
   * Enable or disable tone mapping
   * @param {boolean} enabled
   */
  setToneMappingEnabled(enabled) {
    this.config.toneMapping = enabled
    this.rebuildEffectsPass()
    eventBus.emit('postprocess:toneMappingChanged', enabled)
  }

  /**
   * Set exposure for tone mapping
   * @param {number} exposure
   */
  setExposure(exposure) {
    if (this.effects.toneMapping) {
      this.effects.toneMapping.middleGrey = exposure * 0.6
    }
  }

  rebuildEffectsPass() {
    // Remove old effects pass
    if (this.passes.effects) {
      this.composer.removePass(this.passes.effects)
    }

    // Build effects array based on config
    const activeEffects = []
    if (this.config.bloom && this.effects.bloom) {
      activeEffects.push(this.effects.bloom)
    }
    if (this.config.toneMapping && this.effects.toneMapping) {
      activeEffects.push(this.effects.toneMapping)
    }
    if (this.config.smaa && this.effects.smaa) {
      activeEffects.push(this.effects.smaa)
    }

    if (activeEffects.length > 0) {
      this.passes.effects = new EffectPass(this.camera, ...activeEffects)
      this.composer.addPass(this.passes.effects)
    }
  }

  /**
   * Apply quality preset
   * @param {'high'|'medium'|'low'|'minimal'} preset
   */
  applyPreset(preset) {
    const presets = {
      high: {
        ssao: true,
        bloom: true,
        smaa: true,
        toneMapping: true,
        bloomIntensity: 0.5
      },
      medium: {
        ssao: true,
        bloom: true,
        smaa: true,
        toneMapping: true,
        bloomIntensity: 0.4
      },
      low: {
        ssao: false,
        bloom: true,
        smaa: false,
        toneMapping: true,
        bloomIntensity: 0.3
      },
      minimal: {
        ssao: false,
        bloom: false,
        smaa: false,
        toneMapping: true,
        bloomIntensity: 0
      }
    }

    const p = presets[preset] || presets.medium

    this.setSSAOEnabled(p.ssao)
    this.setBloomEnabled(p.bloom)
    this.setSMAAEnabled(p.smaa)
    this.setToneMappingEnabled(p.toneMapping)
    this.setBloomParams({ intensity: p.bloomIntensity })

    eventBus.emit('postprocess:presetApplied', preset)
  }

  /**
   * Update camera reference (call if camera changes)
   * @param {THREE.Camera} camera
   */
  setCamera(camera) {
    this.camera = camera
    this.passes.render.camera = camera
    this.rebuildEffectsPass()
  }

  /**
   * Resize the composer
   * @param {number} width
   * @param {number} height
   */
  setSize(width, height) {
    this.composer.setSize(width, height)
  }

  /**
   * Render with post-processing
   */
  render() {
    this.composer.render()
  }

  /**
   * Dispose of resources
   */
  dispose() {
    this.composer.dispose()
  }
}
