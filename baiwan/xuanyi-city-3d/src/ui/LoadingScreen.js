import { eventBus } from '../core/EventBus.js'

/**
 * Loading screen with progress indicator
 */
export class LoadingScreen {
  constructor() {
    this.element = this.createDOM()
    this.progressBar = this.element.querySelector('.loading-progress-fill')
    this.statusText = this.element.querySelector('.loading-status')
    this.visible = true

    this.setupEventListeners()
  }

  createDOM() {
    const container = document.createElement('div')
    container.className = 'loading-screen'
    container.innerHTML = `
      <div class="loading-content">
        <h1 class="loading-title">寻意城市</h1>
        <p class="loading-subtitle">XuanYi City 3D Visualization</p>
        <div class="loading-progress">
          <div class="loading-progress-fill"></div>
        </div>
        <p class="loading-status">正在初始化...</p>
      </div>
    `

    // Add styles
    const style = document.createElement('style')
    style.textContent = `
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: opacity 0.5s ease-out;
      }

      .loading-screen.hidden {
        opacity: 0;
        pointer-events: none;
      }

      .loading-content {
        text-align: center;
        color: #fff;
      }

      .loading-title {
        font-size: 48px;
        margin: 0;
        font-weight: 300;
        letter-spacing: 8px;
        color: #00ffff;
        text-shadow: 0 0 20px rgba(0,255,255,0.5);
      }

      .loading-subtitle {
        font-size: 14px;
        margin: 10px 0 40px;
        opacity: 0.7;
        letter-spacing: 2px;
      }

      .loading-progress {
        width: 300px;
        height: 4px;
        background: rgba(255,255,255,0.1);
        border-radius: 2px;
        margin: 0 auto 20px;
        overflow: hidden;
      }

      .loading-progress-fill {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #00ffff, #1abc9c);
        border-radius: 2px;
        transition: width 0.3s ease;
      }

      .loading-status {
        font-size: 12px;
        opacity: 0.5;
        margin: 0;
      }
    `
    document.head.appendChild(style)

    document.body.appendChild(container)
    return container
  }

  setupEventListeners() {
    eventBus.on('assets:progress', ({ progress }) => {
      this.setProgress(progress)
    })

    eventBus.on('assets:loadComplete', () => {
      this.setStatus('加载完成')
      this.setProgress(1)
    })
  }

  /**
   * Set progress (0-1)
   * @param {number} progress
   */
  setProgress(progress) {
    const percent = Math.round(progress * 100)
    this.progressBar.style.width = `${percent}%`
  }

  /**
   * Set status text
   * @param {string} text
   */
  setStatus(text) {
    this.statusText.textContent = text
  }

  /**
   * Show loading screen
   */
  show() {
    this.visible = true
    this.element.classList.remove('hidden')
  }

  /**
   * Hide loading screen with fade
   */
  hide() {
    this.visible = false
    this.element.classList.add('hidden')

    // Remove from DOM after transition
    setTimeout(() => {
      if (!this.visible && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element)
      }
    }, 500)
  }

  /**
   * Dispose of resources
   */
  dispose() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }
}
