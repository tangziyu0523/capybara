import * as THREE from 'three';

export default class VegetationSystem {
  constructor(scene, terrain) {
    this.scene = scene;
    this.terrain = terrain;
    this.mesh = null;

    this.init();
  }

  init() {
    // Simple low-poly trees: Cone foliage + Cylinder trunk
    // We'll just use cones for MVP to save draw calls (one geometry)
    const geometry = new THREE.ConeGeometry(2, 8, 6);
    geometry.translate(0, 4, 0); // Pivot at bottom

    const material = new THREE.MeshStandardMaterial({
      color: 0x228822,
      roughness: 0.8,
      flatShading: true
    });

    const count = 500;
    this.mesh = new THREE.InstancedMesh(geometry, material, count);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const spread = 350;

    let instanceIndex = 0;

    for (let i = 0; i < 2000; i++) { // Try more times
      if (instanceIndex >= count) break;

      const x = (Math.random() - 0.5) * spread * 2;
      const z = (Math.random() - 0.5) * spread * 2;

      const height = this.terrain.getHeightAt(x, z);

      // Vegetation logic for Multi-Zone:
      // 1. Forest Zone (West, x < -50): High density
      // 2. Central Zone (-50 < x < 50): Low density/Park
      // 3. Tidal Zone (x > 50): Very sparse
      // 4. Sun Valley (South, z > 50): Transition Belt

      let probability = 0;

      if (z > 50 && Math.abs(x) < 100) {
        // Sun Valley Industrial Transition (Sparse)
        probability = 0.1;
      } else if (x < -50) {
        // Inland Forest
        probability = 0.8;
      } else if (x < 50) {
        // Center Park
        probability = 0.3;
      } else {
        // Coast
        probability = 0.05;
      }

      // Transition Belt Logic: High density at zone borders
      // Border roughly at x = -50 (Forest/Center)
      if (Math.abs(x - (-50)) < 15) {
        probability = 0.9; // Dense belt
      }

      // Check height too (avoid underwater)
      if (height > 5 && Math.random() < probability) {
        dummy.position.set(x, height, z);

        // Random scale
        const s = 0.8 + Math.random() * 0.6;
        dummy.scale.set(s, s * (0.8 + Math.random() * 0.4), s);

        dummy.rotation.y = Math.random() * Math.PI * 2;

        dummy.updateMatrix();
        this.mesh.setMatrixAt(instanceIndex, dummy.matrix);
        instanceIndex++;
      }
    }

    // Resize if we didn't fill count? No, InstancedMesh is fixed size. 
    // Just set unused to 0 scale
    for (let j = instanceIndex; j < count; j++) {
      dummy.scale.set(0, 0, 0);
      dummy.updateMatrix();
      this.mesh.setMatrixAt(j, dummy.matrix);
    }

    this.scene.add(this.mesh);
  }

  update(time) {
    // Optional: wind animation
  }
}