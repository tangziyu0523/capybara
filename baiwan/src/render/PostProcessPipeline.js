import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  SSAOEffect,
  ToneMappingEffect,
  FXAAEffect,
  BlendFunction
} from 'postprocessing';

export default class PostProcessPipeline {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.composer = null;

    this.effects = {};

    this.init();
  }

  init() {
    this.composer = new EffectComposer(this.renderer, {
      frameBufferType: THREE.HalfFloatType
    });

    // 1. Render Pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 2. SSAO (Ambient Occlusion)
    // Adjusted for GIANT SCALE (Radius increased)
    const ssaoEffect = new SSAOEffect(this.camera, this.scene.children[0], {
      blendFunction: BlendFunction.MULTIPLY,
      samples: 32, // Increased samples
      rings: 4,
      distanceThreshold: 1.0,
      distanceFalloff: 0.0,
      rangeThreshold: 0.5,
      rangeFalloff: 0.1,
      luminanceInfluence: 0.6,
      radius: 0.8, // Was 0.1 - Increased for large buildings (approx 80cm world space)
      intensity: 1.5, // Stronger AO
      bias: 0.025
    });
    this.effects.ssao = ssaoEffect;

    // 3. Bloom
    const bloomEffect = new BloomEffect({
      blendFunction: BlendFunction.SCREEN,
      luminanceThreshold: 0.8,
      luminanceSmoothing: 0.2,
      intensity: 1.0,
      mipmapBlur: true
    });
    this.effects.bloom = bloomEffect;

    // 4. Tone Mapping (ACES Filmic)
    const toneMappingEffect = new ToneMappingEffect({
      mode: THREE.ACESFilmicToneMapping,
      resolution: 256,
      whitePoint: 4.0,
      middleGrey: 0.6,
      minLuminance: 0.01,
      averageLuminance: 0.01,
      adaptationRate: 1.0
    });
    this.effects.toneMapping = toneMappingEffect;

    // 5. FXAA (Antialiasing)
    const fxaaEffect = new FXAAEffect();
    this.effects.fxaa = fxaaEffect;

    // Combine effects into passes
    // It's often better to combine effects into fewer passes

    // SSAO usually needs its own pass or be first
    // Wait, postprocessing library SSAOEffect usually works better in its own EffectPass 
    // or combined if compatible. 
    // SSAO is depth-aware, might need to be early.

    const effectPass1 = new EffectPass(this.camera, ssaoEffect, bloomEffect, toneMappingEffect, fxaaEffect);
    this.composer.addPass(effectPass1);

    this.effectPass = effectPass1;
  }

  render(delta) {
    this.composer.render(delta);
  }

  setSize(width, height) {
    this.composer.setSize(width, height);
  }

  // Toggles
  setEffectEnabled(name, enabled) {
    if (this.effects[name]) {
      // For EffectPass, we might need to re-create or manage blend modes, 
      // but simpler is to just set blend mode to SKIP if disabled?
      // Or easier: postprocessing effects often have blendMode.
      // Actually EffectPass has internal management.

      // Better way for toggle: 
      // Most effects don't have a simple 'enabled' property exposed directly on the effect instance for rendering logic 
      // (except for some like Bloom might be able to set intensity 0).
      // But EffectPass handles this. 
      // Let's try blend mode approach or intensity 0 for now, or look up proper way.

      // A common way in postprocessing lib is to just pass the list of enabled effects to EffectPass
      // But that requires re-creating the pass.

      // Let's assume we just toggle intensity/blendMode for MVP
      if (name === 'ssao') {
        // SSAO doesn't have simple enable/disable on the fly without recompiling shader usually
        // But we can set blendFunction to SKIP
        this.effects.ssao.blendMode.setBlendFunction(enabled ? BlendFunction.MULTIPLY : BlendFunction.SKIP);
      } else if (name === 'bloom') {
        this.effects.bloom.blendMode.setBlendFunction(enabled ? BlendFunction.SCREEN : BlendFunction.SKIP);
      } else if (name === 'fxaa') {
        // FXAA is cheap, maybe just leave it? Or use SKIP.
        // FXAAEffect doesn't have blend mode the same way always? 
        // Actually all Effects extend Effect.
        this.effects.fxaa.blendMode.setBlendFunction(enabled ? BlendFunction.NORMAL : BlendFunction.SKIP);
      } else if (name === 'toneMapping') {
        this.effects.toneMapping.blendMode.setBlendFunction(enabled ? BlendFunction.NORMAL : BlendFunction.SKIP);
      }
    }
  }
}
