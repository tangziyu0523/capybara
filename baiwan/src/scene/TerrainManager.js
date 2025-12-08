import * as THREE from 'three';

export default class TerrainManager {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.params = {
      radius: 400,
      height: 50,
      segments: 128
    };

    this.init();
  }

  init() {
    const geometry = new THREE.PlaneGeometry(
      this.params.radius * 2,
      this.params.radius * 2,
      this.params.segments,
      this.params.segments
    );
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position;
    const colors = [];

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      const height = this.calculateHeight(x, z);
      positions.setY(i, height);

      // Vertex Colors for Biomes
      // 0: Sand (Low, near water)
      // 1: Canyon (Mid-Low, center)
      // 2: Green (High, plateaus)

      const dist = Math.sqrt(x * x + z * z);
      const normalizedDist = dist / this.params.radius;

      let color = new THREE.Color();

      if (height < 2) {
        // Water/Sand edge
        color.setHex(0xe6d8ad); // Sand
      } else if (this.isSunValley(x, z)) {
        // Industrial Floor (Concrete/Dirt)
        color.setHex(0x887766);
      } else if (this.isRidge(x, z)) {
        // Ridge Top (Green/High)
        color.setHex(0x5d9e45);
      } else {
        // Valleys (Darker/Shadowed)
        color.setHex(0x3a6b2e);
      }

      // Add some noise variation
      const noise = (Math.sin(x * 0.1) + Math.cos(z * 0.1)) * 0.05;
      color.offsetHSL(0, 0, noise);

      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    // Organic style material
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true
    });

    // Add a grid overlay for "cyber" look
    // Alternatively, use a shader. For MVP, just dark ground is fine, maybe grid helper on top.

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true; // Self shadowing

    this.scene.add(this.mesh);

    // Optional: Add grid helper slightly above
    // const grid = new THREE.GridHelper(this.params.radius * 2, 40, 0x00ffff, 0x333333);
    // grid.position.y = 0.5;
    // this.scene.add(grid);
  }

  isRidge(x, z) {
    const angle = Math.atan2(z, x);
    // 3 Arms at 0, 2pi/3, 4pi/3
    // Cos(3 * angle) will have peaks at these angles
    const ridgeFactor = Math.cos(3 * angle);
    return ridgeFactor > 0.5; // Broad ridges
  }

  isSunValley(x, z) {
    // South Zone: z > 50, x between -100 and 100
    return z > 50 && Math.abs(x) < 100;
  }

  calculateHeight(x, z) {
    // Slope from West (High) to East (Low)
    // x range approx -400 to 400

    // Global slope factor: (x * -0.1) -> -400 becomes +40, 400 becomes -40
    // Add base height to keep above water
    let h = 20 + (x * -0.15);

    // Radial dome falloff still needed for island shape
    const dist = Math.sqrt(x * x + z * z);
    const maxRadius = this.params.radius * 0.9;

    if (dist > maxRadius) return -10;

    const normalizedDist = dist / maxRadius;
    const dome = Math.cos(normalizedDist * Math.PI / 2);

    h *= dome; // Fade edges to water

    // Add terracing or noise
    h += Math.sin(x * 0.02) * 5 + Math.cos(z * 0.02) * 5;

    // Sun Valley Flattening (South)
    if (this.isSunValley(x, z)) {
      h = Math.max(5, h * 0.5); // Flatten for industry
    }

    // Ensure minimum land height above water until edge
    if (h < 2 && dist < maxRadius * 0.8) h = 2;

    return Math.max(-10, h);
  }

  getHeightAt(x, z) {
    return this.calculateHeight(x, z);
  }
}

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}
