import GUI from 'lil-gui'
import { eventBus } from '../core/EventBus.js'
import { LightingSystem } from '../scene/LightingSystem.js'

/**
 * Main control panel UI
 */
export class ControlsUI {
  /**
   * @param {Object} options
   */
  constructor(options = {}) {
    this.gui = new GUI({ title: '寻意城市 控制面板' })

    // State for controls
    this.state = {
      // Post-processing
      ssao: options.ssao ?? true,
      bloom: options.bloom ?? true,
      bloomIntensity: options.bloomIntensity ?? 0.5,
      smaa: options.smaa ?? true,

      // Time
      timeOfDay: options.timeOfDay ?? 0.35,
      autoCycle: false,

      // Ocean
      waveHeight: options.waveHeight ?? 2.0,
      waveFrequency: options.waveFrequency ?? 0.05,

      // Debug
      wireframe: false,
      showLOD: false,
      showStats: true
    }

    this.setupFolders()
  }

  setupFolders() {
    this.setupPostProcessFolder()
    this.setupTimeFolder()
    this.setupOceanFolder()
    this.setupDebugFolder()
  }

  setupPostProcessFolder() {
    const folder = this.gui.addFolder('后处理效果')

    folder.add(this.state, 'ssao').name('SSAO 环境光遮蔽').onChange((value) => {
      eventBus.emit('ui:ssaoChanged', value)
    })

    folder.add(this.state, 'bloom').name('Bloom 泛光').onChange((value) => {
      eventBus.emit('ui:bloomChanged', value)
    })

    folder.add(this.state, 'bloomIntensity', 0, 2, 0.1).name('泛光强度').onChange((value) => {
      eventBus.emit('ui:bloomIntensityChanged', value)
    })

    folder.add(this.state, 'smaa').name('SMAA 抗锯齿').onChange((value) => {
      eventBus.emit('ui:smaaChanged', value)
    })
  }

  setupTimeFolder() {
    const folder = this.gui.addFolder('时间控制')
    const presets = LightingSystem.getPresets()

    folder.add(this.state, 'timeOfDay', 0, 1, 0.01).name('时间').onChange((value) => {
      eventBus.emit('ui:timeChanged', value)
    })

    folder.add(this.state, 'autoCycle').name('自动循环').onChange((value) => {
      eventBus.emit('ui:autoCycleChanged', value)
    })

    // Preset buttons
    const presetFolder = folder.addFolder('预设时间')

    presetFolder.add({ action: () => this.setTime(presets.dawn) }, 'action').name('🌅 黎明')
    presetFolder.add({ action: () => this.setTime(presets.noon) }, 'action').name('☀️ 正午')
    presetFolder.add({ action: () => this.setTime(presets.dusk) }, 'action').name('🌇 黄昏')
    presetFolder.add({ action: () => this.setTime(presets.midnight) }, 'action').name('🌙 午夜')
  }

  setupOceanFolder() {
    const folder = this.gui.addFolder('海洋设置')

    folder.add(this.state, 'waveHeight', 0, 5, 0.1).name('波浪高度').onChange((value) => {
      eventBus.emit('ui:waveHeightChanged', value)
    })

    folder.add(this.state, 'waveFrequency', 0.01, 0.2, 0.01).name('波浪频率').onChange((value) => {
      eventBus.emit('ui:waveFrequencyChanged', value)
    })
  }

  setupDebugFolder() {
    const folder = this.gui.addFolder('调试选项')

    folder.add(this.state, 'wireframe').name('线框模式').onChange((value) => {
      eventBus.emit('ui:wireframeChanged', value)
    })

    folder.add(this.state, 'showLOD').name('显示LOD层级').onChange((value) => {
      eventBus.emit('ui:showLODChanged', value)
    })

    folder.add(this.state, 'showStats').name('显示性能统计').onChange((value) => {
      eventBus.emit('ui:showStatsChanged', value)
    })

    folder.close()
  }

  setTime(value) {
    this.state.timeOfDay = value
    this.gui.controllersRecursive().forEach((c) => c.updateDisplay())
    eventBus.emit('ui:timeChanged', value)
  }

  /**
   * Update time display from external source
   * @param {number} time
   */
  updateTimeDisplay(time) {
    this.state.timeOfDay = time
    this.gui.controllersRecursive().forEach((c) => {
      if (c.property === 'timeOfDay') {
        c.updateDisplay()
      }
    })
  }

  /**
   * Show/hide the UI
   * @param {boolean} visible
   */
  setVisible(visible) {
    this.gui.domElement.style.display = visible ? '' : 'none'
  }

  /**
   * Collapse/expand the UI
   * @param {boolean} collapsed
   */
  setCollapsed(collapsed) {
    if (collapsed) {
      this.gui.close()
    } else {
      this.gui.open()
    }
  }

  /**
   * Dispose of resources
   */
  dispose() {
    this.gui.destroy()
  }
}
