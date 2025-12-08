# Design: Forest Habitat Layout Algorithm

## 1. Spatial Layout Algorithm
We will use **Poisson Disk Sampling** (Bridson's Algorithm) adapted for multi-class object placement. This ensures a tightly packed but non-overlapping "organic" distribution.

### Core Concept
- **Minimum Distance ($r$)**: No two points can be closer than $r$.
- **Active List**: Points that can spawn new points.
- **Grid Optimization**: A background grid of cell size $r/\sqrt{2}$ ensures $O(N)$ performance for collision checks.

### Adaptation for Forest Habitat
We define two layers of distribution:
1. **Primary Layer (Buildings)**: Placed first with a larger exclusion radius to ensure livable space.
2. **Secondary Layer (Vegetation)**: Placed in remaining spaces, filling gaps around buildings.

## 2. Distribution Rules & Parameters

### Key Design Parameters

| Entity Type | Symbol | Footprint Radius ($R$) | Min Separation ($r$) | Growth Logic |
|:-----------:|:------:|:----------------------:|:--------------------:|:-------------|
| **Cabin** | `[C]` | 8m | 20m | Sparse, clustered groups |
| **Tree (Big)**| ` T ` | 6m | 12m | Canopy requires light |
| **Tree (Small)**| ` . ` | 2m | 4m | Understory filler |

### Constraint Matrix (Minimum Distance)
| | Cabin | Tree (Big) | Tree (Small) |
|---|---|---|---|
| **Cabin** | **25m** (Privacy) | **10m** (Shade) | **5m** (Decoration) |
| **Tree (Big)** | 10m | **15m** (Canopy) | **6m** (Growth) |
| **Tree (Small)**| 5m | 6m | **4m** (Density) |

### Implementation Method
1. **Initialize Grid**: Create a 2D spatial grid covering the district bounds.
2. **Place Cabins**:
   - Attempt to place $N$ cabins using Poisson Disk with $r=25m$.
   - Store positions in the spatial grid.
3. **Place Large Trees**:
   - Attempt to place trees in empty space.
   - Check distance against existing Cabins ($d > 10m$) and other Trees ($d > 15m$).
4. **Place Small Trees**:
   - Fill remaining gaps with smaller radius checks.

## 3. Visualization (Conceptual)

```text
[Layout Simulation 100x100m]

. . . T . . . . . T . .
. [C] . . . T . . . . .
. . . . . . . . [C] . .
T . . T . . . . . . . .
. . . . . [C] . . . T .
. . T . . . . . . . . .
. . . . . T . . T . . .
```

**Legend:**
- `[C]`: Forest Cabin (High value, needs space)
- ` T `: Large Canopy Tree (Ecological anchor)
- ` . `: Small vegetation (Filler)

## 4. Technical Implementation Points
- **File**: `src/scene/algorithms/PoissonSampler.js` (New) or internal method in `DistrictBuilder`.
- **Input**: `DistrictConfig` (bounds, density).
- **Output**: List of `{ position, type, rotation }`.
- **Terrain Adaptation**: After X/Z placement, sample `terrain.getHeightAt(x, z)` to set Y.
