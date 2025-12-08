import * as THREE from 'three';

export default class TransportationSystem {
    constructor(scene, districtsManager) {
        this.scene = scene;
        this.districtsManager = districtsManager;
        this.tubes = [];
        this.material = null;

        this.init();
    }

    init() {
        // Animated shader material for "energy flow"
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(0xffaa44) } // Warm Gold
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float flow = mod(vUv.x * 10.0 - uTime * 2.0, 1.0);
          float glow = smoothstep(0.0, 0.2, flow) * smoothstep(0.4, 0.2, flow);
          
          // Base glow
          vec3 color = uColor * (0.2 + glow * 2.0);
          float alpha = 0.5 + glow;
          
          gl_FragColor = vec4(color, alpha);
        }
      `
        });

        // Wait for districts to be loaded? 
        // Actually we know positions from JSON, but getting from scene graph is safer.
        // For now, let's hardcode the logic based on known positions since we are in same tick.
        this.createPaths();
    }

    createPaths() {
        // Central Hub
        const center = new THREE.Vector3(0, 10, 0);

        // Define known zones manually or find them
        // Forest is West (-150), Tidal is East (200)
        const tidalPos = new THREE.Vector3(200, 10, 0);
        const forestPos = new THREE.Vector3(-150, 40, 0); // Higher elevation
        const sunValleyPos = new THREE.Vector3(0, 10, 150); // South

        // Path 1: Center -> Tidal (Curve towards South to avoid straight line)
        this.createTube([center, new THREE.Vector3(100, 20, 50), tidalPos]);

        // Path 2: Center -> Forest (Curve towards North)
        this.createTube([center, new THREE.Vector3(-80, 50, -50), forestPos]);

        // Path 3: Center -> Sun Valley (Threading through towers)
        // ALIGNMENT: Follow the new Canyon Spine (Z-axis)
        // Center (0,0) -> Canyon Mouth (0, 10, 50) -> Canyon End (0, 20, 200)
        const svEntry = new THREE.Vector3(0, 12, 40); // Enter canyon
        const svMid = new THREE.Vector3(0, 15, 120);  // Above Spine
        const svEnd = new THREE.Vector3(0, 20, 240);  // End of valley

        this.createTube([center, svEntry, svMid, svEnd]);

        // Path 4: Sun Valley -> Tidal (Industrial Transport)
        this.createTube([sunValleyPos, new THREE.Vector3(100, 15, 100), tidalPos]);
    }

    createTube(points) {
        let curve;
        if (points.length === 3) {
            curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
        } else {
            curve = new THREE.CatmullRomCurve3(points);
        }

        const geometry = new THREE.TubeGeometry(curve, 64, 2, 8, false);
        const mesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(mesh);
        this.tubes.push(mesh);
    }

    update(time) {
        if (this.material) {
            this.material.uniforms.uTime.value = time;
        }
    }
}
