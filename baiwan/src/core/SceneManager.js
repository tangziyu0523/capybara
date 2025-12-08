import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import OceanManager from '../scene/OceanManager.js';
import DistrictsManager from '../scene/DistrictsManager.js';
import DayNightSystem from '../scene/DayNightSystem.js';
import TerrainManager from '../scene/TerrainManager.js';
import TransportationSystem from '../scene/TransportationSystem.js';
import VegetationSystem from '../scene/VegetationSystem.js';

/**
 * Manages the Three.js scene and coordinates its sub-components (Ocean, Districts, Lighting).
 */
export default class SceneManager {
  constructor(renderer) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

    // Environment Map for PBR (High Quality)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    this.dayNight = new DayNightSystem(this.scene);
    this.ocean = new OceanManager(this.scene);
    this.terrain = new TerrainManager(this.scene);
    this.districts = new DistrictsManager(this.scene, this.terrain);
    this.transportation = new TransportationSystem(this.scene, this.districts);
    this.vegetation = new VegetationSystem(this.scene, this.terrain);
  }

  // setupLights() removed as DayNightSystem handles it

  /**
   * Updates all scene components.
   * @param {number} time - Elapsed time in seconds.
   * @param {number} delta - Time since last frame in seconds.
   */
  update(time, delta) {
    if (this.dayNight) {
      this.dayNight.update(delta);
    }
    if (this.ocean) {
      this.ocean.update(time);
    }
    if (this.transportation) {
      this.transportation.update(time);
    }
    // Update other sub-systems
  }

  getScene() {
    return this.scene;
  }
}
