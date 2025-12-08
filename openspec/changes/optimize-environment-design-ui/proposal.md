# Optimize Environment Design UI

## Summary
Optimize the user interface and interactive features of the Environment Design Module to enhance user experience. This involves a split-pane layout (4:6), interactive 3D model viewer with camera controls, and bi-directional linkage between UI cards and the 3D scene.

## Requirements
1.  **UI Layout:**
    *   Split view: Left (40%) for Description Cards, Right (60%) for 3D Model.
    *   Responsive design adapting to different screen sizes.

2.  **3D Model Interaction:**
    *   Mouse drag to rotate.
    *   Scroll to zoom.
    *   Right-click to pan.
    *   Render at 60FPS+ with Anti-aliasing using WebGL (Three.js).

3.  **Card & Model Linkage:**
    *   Cards are bound to specific 3D coordinates/views.
    *   Clicking a card triggers a smooth camera flight (1s duration) to the target.
    *   Target area zoom (2-3x).
    *   Visual feedback: Card highlight + 3D target blink.

4.  **Technical & Performance:**
    *   Loading progress indicator.
    *   Reset view button.
    *   LOD (Level of Detail) control (where applicable/feasible).
    *   Error handling for model loading failures.
