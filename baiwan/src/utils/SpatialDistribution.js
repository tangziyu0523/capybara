/**
 * Spatial Distribution Utility
 * Handles organic object placement using a multi-layer constraint algorithm.
 */

export class SpatialDistribution {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.items = []; // { x, z, radius, type }
    this.gridSize = 10; // Cell size for optimization
    this.grid = {}; // Key: "x_z", Value: [items]
  }

  _addToGrid(item) {
    const gx = Math.floor(item.x / this.gridSize);
    const gz = Math.floor(item.z / this.gridSize);
    const key = `${gx}_${gz}`;
    if (!this.grid[key]) this.grid[key] = [];
    this.grid[key].push(item);
    this.items.push(item);
  }

  _getNearbyItems(x, z, searchRadius) {
    const minGx = Math.floor((x - searchRadius) / this.gridSize);
    const maxGx = Math.floor((x + searchRadius) / this.gridSize);
    const minGz = Math.floor((z - searchRadius) / this.gridSize);
    const maxGz = Math.floor((z + searchRadius) / this.gridSize);

    const nearby = [];
    for (let gx = minGx; gx <= maxGx; gx++) {
      for (let gz = minGz; gz <= maxGz; gz++) {
        const key = `${gx}_${gz}`;
        if (this.grid[key]) {
          nearby.push(...this.grid[key]);
        }
      }
    }
    return nearby;
  }

  /**
   * Attempt to place items of a specific type.
   * @param {string} type - Identifier for the item type
   * @param {number} count - Number of items to attempt to place
   * @param {number} radius - Self-radius (minimum spacing from same type)
   * @param {object} constraints - Map of { otherType: minDistance }
   * @param {function} positionValidator - Optional callback(x, z) -> boolean
   */
  distribute(type, count, radius, constraints = {}, positionValidator = null) {
    let placed = 0;
    const maxAttempts = count * 10; // Give up after too many tries

    for (let i = 0; i < maxAttempts && placed < count; i++) {
      const x = (Math.random() - 0.5) * this.width;
      const z = (Math.random() - 0.5) * this.depth;

      // 1. Custom validator (e.g., terrain height or bounds)
      if (positionValidator && !positionValidator(x, z)) continue;

      // 2. Distance Check
      // Max search radius needed is the max of (radius + other_radius) or constraints
      // Simplified: Just check a safe upper bound, e.g., 50m
      const nearby = this._getNearbyItems(x, z, 50);

      let valid = true;
      for (const other of nearby) {
        let minSep = radius + other.radius; // Default: sum of radii

        // Apply specific constraint if defined
        if (constraints[other.type] !== undefined) {
          minSep = constraints[other.type];
        }
        // Also check if the other type has a constraint against us
        // (Usually symmetric, but good to be safe)

        const dx = x - other.x;
        const dz = z - other.z;
        const distSq = dx * dx + dz * dz;

        if (distSq < minSep * minSep) {
          valid = false;
          break;
        }
      }

      if (valid) {
        this._addToGrid({ x, z, radius, type });
        placed++;
      }
    }

    return placed;
  }

  getItems() {
    return this.items;
  }
}
