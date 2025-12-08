import * as THREE from 'three'
import { eventBus } from '../core/EventBus.js'

/**
 * Utility for loading JSON, textures, and other assets
 */
export class AssetLoader {
  constructor() {
    this.textureLoader = new THREE.TextureLoader()
    this.cubeTextureLoader = new THREE.CubeTextureLoader()
    this.cache = new Map()
    this.loadingCount = 0
    this.totalCount = 0
  }

  /**
   * Load a JSON file
   * @param {string} url - URL to JSON file
   * @returns {Promise<Object>}
   */
  async loadJSON(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url)
    }

    this.startLoading()
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`)
      }
      const data = await response.json()
      this.cache.set(url, data)
      this.finishLoading()
      return data
    } catch (error) {
      this.finishLoading()
      console.error(`Error loading JSON: ${url}`, error)
      throw error
    }
  }

  /**
   * Load a texture
   * @param {string} url - URL to texture
   * @returns {Promise<THREE.Texture>}
   */
  loadTexture(url) {
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url))
    }

    this.startLoading()
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
          this.cache.set(url, texture)
          this.finishLoading()
          resolve(texture)
        },
        undefined,
        (error) => {
          this.finishLoading()
          console.error(`Error loading texture: ${url}`, error)
          reject(error)
        }
      )
    })
  }

  /**
   * Load a cube texture (environment map)
   * @param {string} path - Path to cube texture folder
   * @param {string[]} files - Array of 6 file names [px, nx, py, ny, pz, nz]
   * @returns {Promise<THREE.CubeTexture>}
   */
  loadCubeTexture(path, files = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']) {
    const key = `${path}/${files.join(',')}`
    if (this.cache.has(key)) {
      return Promise.resolve(this.cache.get(key))
    }

    this.startLoading()
    return new Promise((resolve, reject) => {
      this.cubeTextureLoader.setPath(path).load(
        files,
        (texture) => {
          this.cache.set(key, texture)
          this.finishLoading()
          resolve(texture)
        },
        undefined,
        (error) => {
          this.finishLoading()
          console.error(`Error loading cube texture: ${path}`, error)
          reject(error)
        }
      )
    })
  }

  startLoading() {
    if (this.loadingCount === 0) {
      eventBus.emit('assets:loadStart')
    }
    this.loadingCount++
    this.totalCount++
    this.emitProgress()
  }

  finishLoading() {
    this.loadingCount--
    this.emitProgress()
    if (this.loadingCount === 0) {
      eventBus.emit('assets:loadComplete')
      this.totalCount = 0
    }
  }

  emitProgress() {
    const progress = this.totalCount > 0
      ? (this.totalCount - this.loadingCount) / this.totalCount
      : 1
    eventBus.emit('assets:progress', { progress, remaining: this.loadingCount })
  }

  /**
   * Clear the asset cache
   */
  clearCache() {
    this.cache.forEach((value) => {
      if (value.dispose) {
        value.dispose()
      }
    })
    this.cache.clear()
  }
}

export const assetLoader = new AssetLoader()
