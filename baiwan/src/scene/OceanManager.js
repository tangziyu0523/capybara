import * as THREE from 'three';
import oceanVert from '../render/shaders/ocean.vert?raw';
import oceanFrag from '../render/shaders/ocean.frag?raw';

export default class OceanManager {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.material = null;

    this.params = {
      waveHeight: 2.0,
      waveSpeed: 1.0,
      deepColor: new THREE.Color(0x001a33),
      shallowColor: new THREE.Color(0x006699)
    };

    this.init();
  }

  init() {
    const geometry = new THREE.PlaneGeometry(10000, 10000, 256, 256);
    geometry.rotateX(-Math.PI / 2);

    this.material = new THREE.ShaderMaterial({
      vertexShader: oceanVert,
      fragmentShader: oceanFrag,
      uniforms: {
        uTime: { value: 0 },
        uWaveHeight: { value: this.params.waveHeight },
        uWaveSpeed: { value: this.params.waveSpeed },
        uDeepColor: { value: this.params.deepColor },
        uShallowColor: { value: this.params.shallowColor }
      },
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.receiveShadow = true;
    // this.mesh.castShadow = true; // Usually water doesn't cast shadow on itself in simple setup

    this.scene.add(this.mesh);
  }

  update(time) {
    if (this.material) {
      this.material.uniforms.uTime.value = time;
    }
  }

  updateParams(params) {
    // Update uniforms from GUI or other sources
    if (params.waveHeight !== undefined) this.material.uniforms.uWaveHeight.value = params.waveHeight;
    if (params.waveSpeed !== undefined) this.material.uniforms.uWaveSpeed.value = params.waveSpeed;
    if (params.deepColor !== undefined) this.material.uniforms.uDeepColor.value.set(params.deepColor);
    if (params.shallowColor !== undefined) this.material.uniforms.uShallowColor.value.set(params.shallowColor);
  }
}
