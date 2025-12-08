# Design: Octopus Topology & Fluid Fusion

## 1. Structural Layout (The Octopus)
Instead of a grid or random scatter, we define a **Polar Coordinate System** with 3 primary axes at $0^\circ$, $120^\circ$, and $240^\circ$.

### Core & Arms
- **Core (Central Hub)**: The convergence point of the 3 axes. High density, mixed building types.
- **Arm 1 (Sun Valley)**: Extends at angle $0^\circ$ (East).
- **Arm 2 (Forest Home)**: Extends at angle $120^\circ$ (North-West).
- **Arm 3 (Tidal Lounge)**: Extends at angle $240^\circ$ (South-West).

## 2. Terrain Sculpting
The terrain will define the "Arms".
- **Height Function**: `BaseHill + ArmRidges`
- **ArmRidges**: `cos(3 * theta)` logic. High ground along the axes, valleys in between.
- **Result**: A starfish/octopus shaped island where buildings sit on the ridges.

## 3. Organic Transitions
- **Removal of Landmark**: The center is no longer a single tower but a cluster of high-rises.
- **Transportation Flow**: Tubes will act as the "neural network", running from the core down the spine of each arm, branching slightly.
- **Building Spread**: We will position the district centers closer to the origin (e.g., radius 80-100m) and increase their spread radius so they physically overlap at the core, creating a "fused" look.

## 4. Visual Style
- **Curves**: All paths and terrain features use smooth sine/cosine functions.
- **Colors**: Gradient blending between district colors where they meet.
