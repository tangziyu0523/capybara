import * as THREE from 'three';
import SceneManager from './SceneManager.js';
import CameraController from './CameraController.js';
import Stats from 'stats.js';
import PostProcessPipeline from '../render/PostProcessPipeline.js';
import CompatibilityManager from '../utils/CompatibilityManager.js';
import DebugPanel from '../ui/DebugPanel.js';
import LoadingScreen from '../ui/LoadingScreen.js';
import InfoPanel from '../ui/InfoPanel.js';
import AssetLoader from '../utils/AssetLoader.js';

/**
 * Main Application class that orchestrates the 3D scene, rendering loop, and subsystems.
 */
export default class Application {
  /**
   * Initializes the application, renderer, camera, scene, and UI.
   */
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.loopCallbacks = [];

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false, // We will use FXAA later
      stencil: false,
      depth: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Append to DOM
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = ''; // Clear previous content
      app.appendChild(this.renderer.domElement);
    }

    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 2000);
    this.camera.position.set(0, 150, 300);

    this.sceneManager = new SceneManager(this.renderer);
    this.cameraController = new CameraController(this.camera, this.renderer.domElement);

    this.postProcess = new PostProcessPipeline(this.renderer, this.sceneManager.getScene(), this.camera);

    this.compatibilityManager = new CompatibilityManager(this);
    this.debugPanel = new DebugPanel(this);

    // UI
    this.loadingScreen = new LoadingScreen(AssetLoader);
    this.infoPanel = new InfoPanel(this);

    this.clock = new THREE.Clock();

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.setupEventListeners();
    this.start();
  }

  /**
   * Registers a callback to be executed every frame.
   * @param {Function} callback - The function to call.
   */
  onLoop(callback) {
    this.loopCallbacks.push(callback);
  }

  /**
   * Sets up global event listeners.
   */
  setupEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  /**
   * Handles window resize events to update camera and renderer.
   */
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (this.postProcess) {
      this.postProcess.setSize(this.width, this.height);
    }
  }

  /**
   * Main render loop.
   */
  update() {
    this.stats.begin();

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    this.cameraController.update();
    this.sceneManager.update(time, delta);

    // Use post-processing pipeline instead of direct render
    this.postProcess.render(delta);

    this.loopCallbacks.forEach(cb => cb());

    this.stats.end();
    requestAnimationFrame(this.update.bind(this));
  }

  start() {
    this.update();
  }
}
