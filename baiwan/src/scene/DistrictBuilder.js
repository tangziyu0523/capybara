import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SpatialDistribution } from '../utils/SpatialDistribution.js';

export default class DistrictBuilder {
  constructor() {
    this.buildingTypes = {
      residential: 0xffffff, // White/Clean
      commercial: 0x88ccff,  // Glassy Blue
      industrial: 0xffaa55,  // Warm Orange
      agriculture: 0x66bb66, // Green
      energy: 0xffdd44,      // Yellow/Solar
      public: 0xdddddd,      // Concrete/White
      landmark: 0x00ffff,
      tree: 0x228822         // Forest Green
    };

    this.geometries = {};
    this.initGeometries();
  }

  initGeometries() {
    // Create templates per district type
    this.geometries.templates = {
      residential: [],
      commercial: [],
      energy: [],
      industrial: [],
      public: [],
      agriculture: [],
      tree: []
    };

    // Generate variants
    for (let i = 0; i < 4; i++) {
      this.geometries.templates.residential.push(this.createCurvedCabinGeometry()); // Forest Organic Cabin
      this.geometries.templates.commercial.push(this.createCommercialGeometry());
      this.geometries.templates.public.push(this.createTidalGeometricGeometry(i)); // Tidal Functional Geometry

      // Trees
      this.geometries.templates.tree.push(this.createTreeGeometry(i));

      // Others can use default or mix
      this.geometries.templates.energy.push(this.createEcoIndustrialGeometry());
      this.geometries.templates.industrial.push(this.createEcoIndustrialGeometry()); // Sun Valley Eco-Industry
      this.geometries.templates.agriculture.push(this.createCurvedCabinGeometry());
    }

    // Fallback for any other type
    this.geometries.templates.default = this.geometries.templates.commercial;
  }

  createTreeGeometry(variant) {
    // Simple Low-Poly Tree - GIANT SCALE (3x)
    const geometries = [];

    // Trunk
    // Prev: 8-12m -> New: 24-36m
    const trunkH = 24.0 + Math.random() * 12.0;
    const trunkR = 1.5 + Math.random() * 0.9; // 0.5 * 3
    const trunk = new THREE.CylinderGeometry(trunkR * 0.6, trunkR, trunkH, 6);
    trunk.translate(0, trunkH / 2, 0);
    geometries.push(trunk);

    // Canopy
    if (variant % 2 === 0) {
      // Conifer style
      const layers = 3;
      for (let i = 0; i < layers; i++) {
        const r = 12.0 - i * 3.0; // 4.0 * 3
        const h = 12.0; // 4.0 * 3
        const y = trunkH * 0.6 + i * 7.5; // 2.5 * 3
        const cone = new THREE.ConeGeometry(r, h, 8);
        cone.translate(0, y + h / 2, 0);
        geometries.push(cone);
      }
    } else {
      // Broadleaf style
      const foliageR = 12.0 + Math.random() * 6.0; // 4.0 * 3
      const foliage = new THREE.SphereGeometry(foliageR, 8, 8);
      foliage.scale(1, 0.8, 1);
      foliage.translate(0, trunkH, 0);
      geometries.push(foliage);
    }

    const nonIndexedGeometries = geometries.map(g => {
      return g.index ? g.toNonIndexed() : g;
    });

    const merged = BufferGeometryUtils.mergeGeometries(nonIndexedGeometries);
    merged.computeBoundingSphere();
    return merged;
  }

  createTidalGeometricGeometry(variant) {
    // Tidal Lounge: Simplified Functional Geometry (Sphere/Cube)
    // "Function follows Form"
    const geometries = [];

    const width = 1.0; // Base unit
    const height = 1.0;

    let main;

    if (variant % 2 === 0) {
      // Form: Ellipsoid / Sphere ("The Pearl")
      // Scaled based on variant
      const sx = 1.0 + (variant === 0 ? 0.2 : -0.2);
      const sy = 0.8 + (variant === 0 ? 0.0 : 0.7); // Variant 2 is tall
      const sz = sx;

      // Use SphereGeometry
      main = new THREE.SphereGeometry(0.5, 32, 32); // radius 0.5 = width 1.0
      main.scale(sx, sy, sz);
      main.translate(0, sy * 0.5, 0); // Sit on ground

    } else {
      // Form: Cube / Prism ("The Hub")
      const sx = 1.0 + (variant === 1 ? 0.0 : 0.5);
      const sy = 1.0 + (variant === 1 ? 0.0 : -0.5); // Variant 3 is flat
      const sz = sx;

      // Use Box with slight chamfer (approximated by scaling or texture, here just Box)
      // To make it less boring, we can add a smaller box on top
      main = new THREE.BoxGeometry(sx, sy, sz);
      main.translate(0, sy * 0.5, 0);
    }

    geometries.push(main);

    // Add a simple "Dock" or "Base" ring for all
    const baseR = 0.8;
    const base = new THREE.CylinderGeometry(baseR, baseR, 0.1, 32);
    base.translate(0, 0.05, 0);
    geometries.push(base);

    // Ensure non-indexed for consistency if merging with other types later
    // (Though here we usually stay within same type)
    return BufferGeometryUtils.mergeGeometries(geometries);
  }

  createCurvedCabinGeometry() {
    // Organic Forest Cabin: GIANT SCALE (3x previous)
    const geometries = [];

    // 1. Stilts (Bamboo-like)
    // Prev: legH=2.0 -> New: 6.0
    const legH = 6.0;
    const legR = 0.75; // 0.25 * 3
    const legs = 4;
    for (let i = 0; i < legs; i++) {
      const angle = (i / legs) * Math.PI * 2 + (Math.PI / 4);
      const lx = Math.cos(angle) * 6.0; // 2.0 * 3
      const lz = Math.sin(angle) * 6.0;
      const leg = new THREE.CylinderGeometry(legR, legR, legH, 8);
      leg.translate(lx, legH / 2, lz);
      geometries.push(leg);
    }

    // 2. Main Living Pod
    // Prev: bodyR=3.0 -> New: 9.0
    // Prev: bodyH=4.0 -> New: 12.0
    const bodyR = 9.0;
    const bodyH = 12.0;
    const body = new THREE.CylinderGeometry(bodyR, bodyR * 0.9, bodyH, 16);
    body.translate(0, legH + bodyH / 2, 0);
    geometries.push(body);

    // 3. Leaf/Shell Roof
    const roofR = bodyR * 1.5;
    const roofH = 6.0; // 2.0 * 3
    const roof = new THREE.ConeGeometry(roofR, roofH, 32, 1, true);
    roof.scale(1, 0.6, 1);
    roof.translate(0, legH + bodyH + 1.5, 0); // Offset scaled
    geometries.push(roof);

    const merged = BufferGeometryUtils.mergeGeometries(geometries);
    merged.computeBoundingSphere();
    return merged;
  }

  createEcoIndustrialGeometry() {
    // Sun Valley: Modern Industrial Towers (No Chimneys, Sleek, 60m+)
    // Concept: "Energy Monoliths" - Stacked, chamfered modules
    const geometries = [];

    // 1. Main Body - Not a cylinder (avoids chimney look)
    // Use a tall Chamfered Box or Hexagon
    const baseW = 4.0; // Width
    const baseD = 4.0; // Depth
    const totalH = 15.0 + Math.random() * 5.0; // Base height, will be scaled 3x -> 45-60m

    // Create a stack of "modules"
    const modules = 4 + Math.floor(Math.random() * 3);
    const moduleH = totalH / modules;

    for (let i = 0; i < modules; i++) {
      // Vary width slightly for "tech" look
      const w = baseW * (0.9 + Math.random() * 0.2);
      const d = baseD * (0.9 + Math.random() * 0.2);

      const box = new THREE.BoxGeometry(w, moduleH * 0.95, d); // slight gap
      const y = i * moduleH + (moduleH / 2);
      box.translate(0, y, 0);
      geometries.push(box);

      // Add "cooling fins" or details on sides
      if (Math.random() > 0.5) {
        const finW = w + 0.4;
        const finH = moduleH * 0.2;
        const fin = new THREE.BoxGeometry(finW, finH, d + 0.4);
        fin.translate(0, y, 0);
        geometries.push(fin);
      }
    }

    // 2. Top Feature - No smoke/chimney
    // A "Collector Array" or "Antenna"
    const topY = modules * moduleH;

    // Sloped top
    const top = new THREE.ConeGeometry(baseW * 0.8, 3.0, 4); // Pyramid
    top.rotateY(Math.PI / 4);
    top.translate(0, topY + 1.5, 0);
    geometries.push(top);

    const merged = BufferGeometryUtils.mergeGeometries(geometries);
    merged.computeBoundingSphere();
    return merged;
  }

  createCommercialGeometry() {
    const geometries = [];
    // Commercial: Tall, sleek, chamfered or simple
    const width = 0.8;
    const height = 2.0 + Math.random() * 1.5;

    const tower = new THREE.BoxGeometry(width, height, width);
    tower.translate(0, height / 2, 0);
    geometries.push(tower);

    // Top Detail (Angled roof)
    const topH = 0.3;
    const top = new THREE.ConeGeometry(width * 0.6, topH, 4);
    top.translate(0, height + topH / 2, 0);
    geometries.push(top);

    return BufferGeometryUtils.mergeGeometries(geometries);
  }

  // Removed old createComplexBuildingGeometry logic in favor of specific ones

  generateForestLayout(config, spread) {
    const sampler = new SpatialDistribution(spread * 2, spread * 2);

    // GIANT SCALE PARAMETERS (3x spacing)
    // 1. Cabins
    // Count: 15 -> 5 (Very sparse)
    // Radius: 20 -> 60
    sampler.distribute('residential', 5, 60, {
      'residential': 120 // 120m from other cabins
    });

    // 2. Big Trees
    // Count: 40 -> 15
    // Radius: 15 -> 45
    sampler.distribute('tree_big', 15, 45, {
      'residential': 50, // 50m from cabins
      'tree_big': 80     // 80m from other big trees
    });

    // 3. Small Trees (Now relatively large)
    // Count: 100 -> 40
    // Radius: 6 -> 18
    sampler.distribute('tree_small', 40, 18, {
      'residential': 30,
      'tree_big': 30,
      'tree_small': 25
    });

    return sampler.getItems().map((item, i) => {
      const isTree = item.type.startsWith('tree');
      let scale = 1.0;
      // SCALING IS NOW BAKED INTO GEOMETRY
      if (item.type === 'tree_big') scale = 1.0 + Math.random() * 0.4;
      if (item.type === 'tree_small') scale = 0.6 + Math.random() * 0.3;
      if (item.type === 'residential') scale = 1.0 + Math.random() * 0.2;

      return {
        id: `forest_${i}`,
        type: isTree ? 'tree' : 'residential',
        volume: 8000, // Giant volume
        position: { x: item.x, y: 0, z: item.z },
        rotation: Math.random() * Math.PI * 2,
        scale: scale
      };
    });
  }


  generateSunValleyLayout(config, spread) {
    const items = [];
    // GRID PARAMETERS (Compact Layout)
    // Area: Z: 50->250 (L=200), X: -60->60 (W=120)
    // Cell: Z=20, X=Variable (Gathered)

    const startZ = 60;
    const rows = 10;
    const cols = 6;
    const cellZ = 20;

    // Define X positions for "Gathered Center" effect
    // MODIFIED: Compress layout towards center (Density increase)
    // Center Gap: +/- 12m (24m total) for transport
    // Inner/Mid/Outer layers compressed
    const colX = [
      -32, // Col 0 (Outer) - Was -42
      -22, // Col 1         - Was -28
      -12, // Col 2 (Inner) - Was -14
      12, // Col 3 (Inner) - Was 14
      22, // Col 4         - Was 28
      32  // Col 5 (Outer) - Was 42
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = colX[c];
        const z = startZ + r * cellZ;

        // Decide type based on "Zoning"
        // Outer columns (0, 5): Energy Towers
        // Inner columns (1-4): Industrial Factories
        let type = 'industrial';
        if (c === 0 || c === 5) type = 'energy';

        // Random skip lowered for "Dense" look (90% fill)
        if (Math.random() > 0.9) continue;

        // Height variation
        let scaleY = 1.0 + Math.random() * 0.5;
        if (type === 'energy') scaleY *= 1.5;

        // BASE SCALE ADJUSTMENT
        // MODIFIED: Reduced from 3.0 to 1.8 to match Average Height (~35-40m)
        const baseScale = 1.8;

        items.push({
          id: `sv_grid_${r}_${c}`,
          type: type,
          volume: 8000,
          position: { x, y: 0, z },
          rotation: (Math.floor(Math.random() * 4) * Math.PI) / 2,
          scale: baseScale * scaleY
        });
      }
    }

    return items;
  }

  buildDistrict(districtConfig, terrain) {
    const { position, totalVolume, buildingType, buildings = [], floating } = districtConfig;
    const districtGroup = new THREE.Group();

    // We don't set districtGroup position here because buildings need absolute world coordinates 
    // for terrain height sampling, or we calculate relative to district center.
    // Let's stick to local coordinates being relative to district center, 
    // but when sampling height, we add district position.
    districtGroup.position.set(position.x, position.y, position.z);

    // 1. Separate explicit buildings from procedural volume
    let explicitVolume = 0;
    const explicitBuildings = buildings.map(b => {
      explicitVolume += b.volume || 0;
      return b;
    });

    let remainingVolume = totalVolume - explicitVolume;
    const proceduralBuildings = [];

    // 2. Generate procedural buildings to fill volume
    const avgBuildingVolume = 2000;
    let currentVolume = 0;
    let count = 0;

    // Adjust spread based on building type/district role
    let spread = 120;
    if (position.x === 0 && position.z === 0) {
      spread = 100; // Core is denser but spreads to meet arms
    }

    // OPTIMIZATION: Reduce Tidal Lounge density
    // Public = Tidal Lounge
    if (buildingType === 'public') {
      // Reduce remaining volume target to prevent overcrowding with new geometry
      remainingVolume *= 0.7;
    }

    // Special Layout for Forest Habitat (residential)
    if (buildingType === 'residential') {
      // SCALED UP: Reduce count to prevent crowding with larger models
      const forestItems = this.generateForestLayout({ count: 80 }, spread); // Was 300
      proceduralBuildings.push(...forestItems);
      // Skip the while loop
      currentVolume = remainingVolume + 1;
    }

    // Special Layout for Sun Valley (industrial/energy)
    if (buildingType === 'industrial' || buildingType === 'energy') {
      // Use Linear Canyon Layout
      // We only run this once for the district, assuming 'industrial' is the main type passed
      if (buildingType === 'industrial') {
        const svItems = this.generateSunValleyLayout({}, spread);
        proceduralBuildings.push(...svItems);
        currentVolume = remainingVolume + 1;
      } else {
        // Energy might be mixed in, skip standard generation to avoid clutter
        currentVolume = remainingVolume + 1;
      }
    }

    // Density falloff factor
    const maxRadius = spread * 1.5;

    while (currentVolume < remainingVolume && count < 2000) {
      const vol = 500 + Math.random() * 3000;
      currentVolume += vol;

      // Random position with bias towards center
      const angle = Math.random() * Math.PI * 2;
      // Use sqrt for uniform distribution, but we want center bias
      // So maybe simple random is better for "core" feel
      const r = Math.random() * spread;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      proceduralBuildings.push({
        id: `proc_${count}`,
        type: buildingType,
        volume: vol,
        position: { x, y: 0, z },
        rotation: Math.random() * Math.PI
      });
      count++;
    }

    const allBuildings = [...explicitBuildings, ...proceduralBuildings];

    // 3. Batch by type and variant
    const batches = {};

    allBuildings.forEach(b => {
      const type = b.type || buildingType;
      // Random variant 0-3
      const variantIndex = Math.floor(Math.random() * 4);
      const key = `${type}_${variantIndex}`;

      if (!batches[key]) {
        batches[key] = {
          type: type,
          variantIndex: variantIndex,
          items: []
        };
      }
      batches[key].items.push(b);
    });

    // 4. Create InstancedMeshes
    Object.values(batches).forEach(batch => {
      const { type, variantIndex, items } = batch;

      // Select correct template array
      const templates = this.geometries.templates[type] || this.geometries.templates.default;
      // Wrap variant index just in case
      const geometry = templates[variantIndex % templates.length];

      // Material
      const color = this.buildingTypes[type] || 0xffffff;
      // PBR Material Upgrade
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.5,
        envMapIntensity: 1.0,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0
      });

      // Specific Material Tweaks per Type
      if (type === 'commercial' || type === 'public') {
        // Glassy / High-Tech / Coral
        material.metalness = 0.1;
        material.roughness = 0.05;
        material.clearcoat = 1.0;
        material.transmission = 0.9; // High transparency for Coral Domes
        material.ior = 1.5;
        material.color = new THREE.Color(0xaaccff); // Light blue tint
      } else if (type === 'residential' || type === 'agriculture') {
        // Wood / Eco / Forest Cabin
        material.metalness = 0.0;
        material.roughness = 0.8;
        material.color = new THREE.Color(0x8B5A2B); // Wood brown
      } else if (type === 'industrial' || type === 'energy') {
        // Sun Valley: Metal + Green
        material.metalness = 0.6;
        material.roughness = 0.3;
        material.color = new THREE.Color(0xffffff); // Base white/metal
      }

      // Special case for landmark: Emissive

      // Special case for landmark: Emissive
      if (type === 'landmark') {
        material.emissive = new THREE.Color(0x00ffff);
        material.emissiveIntensity = 1.5; // Brighter
        material.color = new THREE.Color(0x0088ff);
        material.transparent = true;
        material.opacity = 0.9;
        material.toneMapped = false;
      }

      const mesh = new THREE.InstancedMesh(geometry, material, items.length);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const dummy = new THREE.Object3D();

      items.forEach((item, i) => {
        // Scale logic
        let sx, sy, sz;

        if (item.scale) {
          // Explicit scale (e.g. from Forest Layout)
          sx = item.scale;
          sy = item.scale;
          sz = item.scale;

          // Slight randomization for trees
          if (type === 'tree') {
            sy *= (0.9 + Math.random() * 0.2);
          }
        } else {
          // Volume-based scale
          const baseScale = Math.pow(item.volume, 0.35);
          sx = baseScale * (0.8 + Math.random() * 0.4);
          sz = baseScale * (0.8 + Math.random() * 0.4);
          sy = baseScale * (0.8 + Math.random() * 0.4);
        }

        dummy.scale.set(sx, sy, sz);

        const posX = item.position ? item.position.x : 0;
        const posZ = item.position ? item.position.z : 0;

        // Height Calculation
        let posY = 0;
        if (floating) {
          posY = 10 + Math.random() * 5; // Floating above water
        } else if (terrain) {
          // Calculate world position for terrain sampling
          const worldX = position.x + posX;
          const worldZ = position.z + posZ;
          posY = terrain.getHeightAt(worldX, worldZ);
        }

        // Add local offset if defined
        if (item.position && item.position.y) {
          posY += item.position.y;
        }

        dummy.position.set(posX, posY, posZ);
        dummy.rotation.y = item.rotation || 0;

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });

      mesh.instanceMatrix.needsUpdate = true;
      districtGroup.add(mesh);
    });

    return districtGroup;
  }
}
