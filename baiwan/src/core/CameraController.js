import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.controls = new OrbitControls(camera, domElement);

    // Default settings (can be tuned later)
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1; // Don't go below ground
  }

  update() {
    this.controls.update();
  }

  resize() {
    // OrbitControls handles resize automatically via camera update usually
  }
}
