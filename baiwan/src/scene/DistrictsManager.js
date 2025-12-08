import * as THREE from 'three';
import AssetLoader from '../utils/AssetLoader.js';
import DistrictBuilder from './DistrictBuilder.js';
import buildingsData from '../data/buildings.json';

/**
 * Manages the creation and lifecycle of city districts.
 */
export default class DistrictsManager {
  /**
   * @param {THREE.Scene} scene - The scene to add districts to.
   * @param {TerrainManager} terrain - The terrain manager for height sampling.
   */
  constructor(scene, terrain) {
    this.scene = scene;
    this.terrain = terrain;
    this.builder = new DistrictBuilder();
    this.districts = [];

    this.init();
  }

  init() {
    // In a real app, we might load this async via AssetLoader
    // But since we imported JSON directly (Vite feature), we can use it immediately
    this.loadDistricts(buildingsData);
  }

  /**
   * Loads district configuration and generates geometry.
   * @param {Object} data - The JSON data containing district definitions.
   */
  loadDistricts(data) {
    if (!data.districts) return;

    data.districts.forEach(config => {
      const districtGroup = this.builder.buildDistrict(config, this.terrain);
      this.scene.add(districtGroup);
      this.districts.push(districtGroup);
    });
  }
}
