import * as THREE from 'three'
import { Application } from './core/Application.js'
import { eventBus } from './core/EventBus.js'
import { PostProcessPipeline } from './render/PostProcessPipeline.js'
import { LightingSystem } from './scene/LightingSystem.js'
import { DistrictsManager } from './scene/DistrictsManager.js'
import { OceanManager } from './scene/OceanManager.js'
import { ControlsUI } from './ui/ControlsUI.js'
import { DebugPanel } from './ui/DebugPanel.js'
import { LoadingScreen } from './ui/LoadingScreen.js'
import { assetLoader } from './utils/AssetLoader.js'
import { compatibilityManager } from './utils/CompatibilityManager.js'
import buildingsData from './data/buildings.json'
import configData from './data/config.json'

// Initialize loading screen
const loadingScreen = new LoadingScreen()
loadingScreen.setStatus('初始化渲染器...')

// Initialize application
const container = document.getElementById('app')
const app = new Application(container)
const scene = app.sceneManager.getScene()
const camera = app.cameraController.getCamera()

// Apply quality settings based on device
const qualityPreset = compatibilityManager.getQualityPreset()
console.log('Quality preset:', compatibilityManager.getQualityLevel(), qualityPreset)

// Initialize post-processing pipeline
loadingScreen.setStatus('初始化后处理管线...')
const postProcess = new PostProcessPipeline(app.renderer, scene, camera)
postProcess.applyPreset(compatibilityManager.getQualityLevel())

// Override render function to use post-processing
app.setRenderFunction(() => postProcess.render())

// Initialize lighting system
loadingScreen.setStatus('初始化光照系统...')
const lightingSystem = new LightingSystem(scene, {
  initialTime: configData.lighting.initialTimeOfDay
})
app.addSystem(lightingSystem)

// Initialize districts
loadingScreen.setStatus('生成城市建筑...')
const districtsManager = new DistrictsManager(scene)
districtsManager.loadFromData(buildingsData)
app.addSystem(districtsManager)

// Initialize ocean
loadingScreen.setStatus('初始化海洋系统...')
const oceanManager = new OceanManager(scene, {
  ...configData.ocean,
  subdivisions: qualityPreset.oceanSubdivisions
})
app.addSystem(oceanManager)

// Add ground plane
const groundGeo = new THREE.PlaneGeometry(2000, 2000)
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x3d5c3d,
  roughness: 0.9,
  metalness: 0.0
})
const ground = new THREE.Mesh(groundGeo, groundMat)
ground.rotation.x = -Math.PI / 2
ground.position.y = -1 // Slightly below sea level
ground.receiveShadow = true
app.sceneManager.add(ground)

// Initialize UI
loadingScreen.setStatus('初始化控制面板...')
const controlsUI = new ControlsUI({
  ssao: qualityPreset.ssao,
  bloom: qualityPreset.bloom,
  bloomIntensity: configData.postProcessing.bloomIntensity,
  smaa: qualityPreset.smaa,
  timeOfDay: configData.lighting.initialTimeOfDay,
  waveHeight: configData.ocean.waveHeight,
  waveFrequency: configData.ocean.waveFrequency
})

// Initialize debug panel
const debugPanel = new DebugPanel(app.renderer)
debugPanel.setVisible(true)

// Connect UI events to systems
eventBus.on('ui:ssaoChanged', (enabled) => {
  postProcess.setSSAOEnabled(enabled)
})

eventBus.on('ui:bloomChanged', (enabled) => {
  postProcess.setBloomEnabled(enabled)
})

eventBus.on('ui:bloomIntensityChanged', (intensity) => {
  postProcess.setBloomParams({ intensity })
})

eventBus.on('ui:smaaChanged', (enabled) => {
  postProcess.setSMAAEnabled(enabled)
})

eventBus.on('ui:timeChanged', (time) => {
  lightingSystem.setTime(time)
})

eventBus.on('ui:autoCycleChanged', (enabled) => {
  lightingSystem.setAutoCycle(enabled)
})

eventBus.on('ui:waveHeightChanged', (height) => {
  oceanManager.setWaveHeight(height)
})

eventBus.on('ui:waveFrequencyChanged', (frequency) => {
  oceanManager.setWaveFrequency(frequency)
})

eventBus.on('ui:wireframeChanged', (enabled) => {
  scene.traverse((object) => {
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((m) => (m.wireframe = enabled))
      } else {
        object.material.wireframe = enabled
      }
    }
  })
})

eventBus.on('ui:showStatsChanged', (visible) => {
  debugPanel.setVisible(visible)
})

// Update time display when auto-cycling
eventBus.on('lighting:timeChanged', (time) => {
  if (lightingSystem.autoCycle) {
    controlsUI.updateTimeDisplay(time)
  }
})

// Handle resize
eventBus.on('camera:resize', ({ width, height }) => {
  postProcess.setSize(width, height)
})

// Debug frame updates
eventBus.on('app:frame', () => {
  debugPanel.begin()
})

// Use requestAnimationFrame to end stats after render
const originalRender = postProcess.render.bind(postProcess)
postProcess.render = function () {
  originalRender()
  debugPanel.end()
}

// Finish loading
loadingScreen.setProgress(1)
loadingScreen.setStatus('加载完成!')

setTimeout(() => {
  loadingScreen.hide()
}, 500)

// Start the application
app.start()

console.log('寻意城市 3D - XuanYi City 3D Visualization')
console.log('Application started with', Object.keys(buildingsData.districts).length, 'districts')
