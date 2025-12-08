# XuanYi City 3D Visualization MVP

A 3D visualization of the futuristic "XuanYi City" concept for the "100 Million Cubic Meters Challenge", built with Three.js and Vite.

## Features

- **Procedural City Generation**: 4 distinct districts with data-driven building generation.
- **Advanced Rendering**: InstancedMesh for high performance (1000+ buildings).
- **Day/Night Cycle**: Dynamic lighting, sky color interpolation, and shadow movement.
- **Ocean Simulation**: Gerstner wave shader with reflections and depth blending.
- **Post-Processing**: Bloom, SSAO, Tone Mapping, and FXAA.
- **Debug Tools**: Performance metrics, quality presets, and parameter tweaking via GUI.

## Tech Stack

- **Core**: Three.js (r169+)
- **Build**: Vite 5.x
- **Post-Processing**: postprocessing library
- **UI**: lil-gui, stats.js

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 to view.

3. **Build for Production**
   ```bash
   npm run build
   ```

## Controls

- **Orbit**: Left Click + Drag
- **Pan**: Right Click + Drag
- **Zoom**: Scroll
- **Interact**: Click on buildings to see info
- **Debug Panel**: Top-right corner controls for Time, Quality, and Effects.

## Project Structure

- `src/core`: Application entry, Scene management, Camera.
- `src/render`: Post-processing pipeline and shaders.
- `src/scene`: District generation, Ocean, Day/Night system.
- `src/ui`: Debug panel, Loading screen, Info panel.
- `src/utils`: Asset loading, Compatibility detection.
- `src/data`: Configuration files.

## Configuration

- `src/data/buildings.json`: Define districts, colors, and landmark buildings.
- `src/scene/DistrictBuilder.js`: Adjust procedural generation parameters.
- `src/scene/OceanManager.js`: Adjust water colors and wave settings.

## License

Private Project.
