export default class CompatibilityManager {
  constructor(app) {
    this.app = app;
    this.renderer = app.renderer;
    this.postProcess = app.postProcess;
    this.sceneManager = app.sceneManager;
    
    this.presets = {
      HIGH: 'high',
      MEDIUM: 'medium',
      LOW: 'low',
      MINIMAL: 'minimal'
    };
    
    this.currentPreset = this.detectPreset();
    this.applyPreset(this.currentPreset);
  }

  detectPreset() {
    // Simple detection logic
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const gpuTier = this.getGPUTier();
    
    if (isMobile) {
      return gpuTier === 'high' ? this.presets.MEDIUM : this.presets.LOW;
    } else {
      return gpuTier === 'high' ? this.presets.HIGH : this.presets.MEDIUM;
    }
  }

  getGPUTier() {
    // Very basic check, can be improved with gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    // For now assume high unless we know better
    return 'high';
  }

  applyPreset(preset) {
    console.log(`Applying Quality Preset: ${preset}`);
    this.currentPreset = preset;
    
    switch (preset) {
      case this.presets.HIGH:
        this.setShadowQuality(4096);
        this.setPostProcessing(true, true, true, true); // SSAO, Bloom, ToneMap, FXAA
        this.setWaterQuality(true);
        break;
      case this.presets.MEDIUM:
        this.setShadowQuality(2048);
        this.setPostProcessing(true, true, true, true); // Keep effects but maybe lower samples if possible
        this.setWaterQuality(true);
        break;
      case this.presets.LOW:
        this.setShadowQuality(1024);
        this.setPostProcessing(false, true, true, true); // No SSAO
        this.setWaterQuality(false); // Simplified water
        break;
      case this.presets.MINIMAL:
        this.setShadowQuality(512);
        this.setPostProcessing(false, false, true, false); // Only ToneMap
        this.setWaterQuality(false);
        break;
    }
  }

  setShadowQuality(size) {
    if (this.sceneManager.dayNight && this.sceneManager.dayNight.sunLight) {
      const sun = this.sceneManager.dayNight.sunLight;
      sun.shadow.mapSize.width = size;
      sun.shadow.mapSize.height = size;
      // Need to update shadow map
      sun.shadow.map?.dispose();
      sun.shadow.map = null;
    }
  }

  setPostProcessing(ssao, bloom, toneMap, fxaa) {
    if (this.postProcess) {
      this.postProcess.setEffectEnabled('ssao', ssao);
      this.postProcess.setEffectEnabled('bloom', bloom);
      this.postProcess.setEffectEnabled('toneMapping', toneMap);
      this.postProcess.setEffectEnabled('fxaa', fxaa);
    }
  }

  setWaterQuality(high) {
    // Placeholder for water quality adjustments
    // e.g. disable reflections or reduce wave count
  }
}
