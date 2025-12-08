import GUI from 'lil-gui';
import * as THREE from 'three';

export default class DebugPanel {
  constructor(app) {
    this.app = app;
    this.gui = new GUI({ title: 'Debug Panel' });
    this.folders = {};
    
    this.init();
  }

  init() {
    this.createMetricsFolder();
    this.createTimeFolder();
    this.createPostProcessFolder();
    this.createQualityFolder();
    this.createDebugFolder();
  }

  createMetricsFolder() {
    const folder = this.gui.addFolder('Metrics');
    this.folders.metrics = folder;
    
    const stats = {
      calls: 0,
      triangles: 0,
      points: 0,
      lines: 0,
      textures: 0
    };

    folder.add(stats, 'calls').listen().disable();
    folder.add(stats, 'triangles').listen().disable();
    folder.add(stats, 'points').listen().disable();
    folder.add(stats, 'lines').listen().disable();
    folder.add(stats, 'textures').listen().disable();

    // Update loop
    this.app.onLoop(() => {
      if (this.app.renderer.info) {
        stats.calls = this.app.renderer.info.render.calls;
        stats.triangles = this.app.renderer.info.render.triangles;
        stats.points = this.app.renderer.info.render.points;
        stats.lines = this.app.renderer.info.render.lines;
        stats.textures = this.app.renderer.info.memory.textures;
      }
    });
  }

  createTimeFolder() {
    if (!this.app.sceneManager.dayNight) return;
    
    const folder = this.gui.addFolder('Time');
    const dayNight = this.app.sceneManager.dayNight;
    
    folder.add(dayNight.params, 'time', 0, 1).name('Time of Day').listen();
    folder.add(dayNight.params, 'speed', 0, 0.1).name('Cycle Speed');
    folder.add(dayNight.params, 'autoCycle').name('Auto Cycle');
  }

  createPostProcessFolder() {
    if (!this.app.postProcess) return;

    const folder = this.gui.addFolder('Post Processing');
    const pp = this.app.postProcess;
    
    const params = {
      ssao: true,
      bloom: true,
      fxaa: true,
      toneMapping: true
    };

    folder.add(params, 'ssao').name('SSAO').onChange(v => pp.setEffectEnabled('ssao', v));
    folder.add(params, 'bloom').name('Bloom').onChange(v => pp.setEffectEnabled('bloom', v));
    folder.add(params, 'fxaa').name('FXAA').onChange(v => pp.setEffectEnabled('fxaa', v));
    folder.add(params, 'toneMapping').name('Tone Mapping').onChange(v => pp.setEffectEnabled('toneMapping', v));
  }

  createQualityFolder() {
    if (!this.app.compatibilityManager) return;
    
    const folder = this.gui.addFolder('Quality');
    const cm = this.app.compatibilityManager;
    
    const params = {
      preset: cm.currentPreset
    };
    
    folder.add(params, 'preset', Object.values(cm.presets))
      .name('Preset')
      .onChange(v => cm.applyPreset(v));
  }

  createDebugFolder() {
    const folder = this.gui.addFolder('Debug');
    
    const params = {
      wireframe: false,
      boundingBoxes: false
    };

    folder.add(params, 'wireframe').onChange(v => {
      this.app.sceneManager.getScene().traverse(child => {
        if (child.isMesh && child.material) {
          // Save original state if needed, but simple toggle for now
          if (Array.isArray(child.material)) {
             child.material.forEach(m => m.wireframe = v);
          } else {
             child.material.wireframe = v;
          }
        }
      });
    });
  }
}
