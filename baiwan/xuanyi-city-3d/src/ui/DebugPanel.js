import Stats from 'stats.js'
import { eventBus } from '../core/EventBus.js'

/**
 * Performance monitoring and debug panel
 */
export class DebugPanel {
  /**
   * @param {THREE.WebGLRenderer} renderer
   */
  constructor(renderer) {
    this.renderer = renderer
    this.visible = true

    this.setupStats()
    this.setupInfoPanel()
  }

  setupStats() {
    this.stats = new Stats()
    this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb
    this.stats.dom.style.position = 'absolute'
    this.stats.dom.style.left = '0px'
    this.stats.dom.style.top = '0px'
    document.body.appendChild(this.stats.dom)
  }

  setupInfoPanel() {
    this.infoPanel = document.createElement('div')
    this.infoPanel.style.cssText = `
      position: absolute;
      left: 0;
      top: 50px;
      background: rgba(0,0,0,0.7);
      color: #fff;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      pointer-events: none;
      z-index: 100;
      min-width: 150px;
    `
    document.body.appendChild(this.infoPanel)
  }

  /**
   * Begin frame timing
   */
  begin() {
    if (this.visible) {
      this.stats.begin()
    }
  }

  /**
   * End frame timing and update display
   */
  end() {
    if (this.visible) {
      this.stats.end()
      this.updateInfoPanel()
    }
  }

  updateInfoPanel() {
    const info = this.renderer.info
    const memory = info.memory
    const render = info.render

    this.infoPanel.innerHTML = `
      <div>Draw Calls: ${render.calls}</div>
      <div>Triangles: ${this.formatNumber(render.triangles)}</div>
      <div>Geometries: ${memory.geometries}</div>
      <div>Textures: ${memory.textures}</div>
    `
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  /**
   * Set visibility
   * @param {boolean} visible
   */
  setVisible(visible) {
    this.visible = visible
    this.stats.dom.style.display = visible ? '' : 'none'
    this.infoPanel.style.display = visible ? '' : 'none'
  }

  /**
   * Get current metrics
   * @returns {Object}
   */
  getMetrics() {
    const info = this.renderer.info
    return {
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      geometries: info.memory.geometries,
      textures: info.memory.textures
    }
  }

  /**
   * Log metrics to console
   */
  logMetrics() {
    const metrics = this.getMetrics()
    console.table(metrics)
  }

  /**
   * Dispose of resources
   */
  dispose() {
    document.body.removeChild(this.stats.dom)
    document.body.removeChild(this.infoPanel)
  }
}
