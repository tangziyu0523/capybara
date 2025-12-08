# Design: Environment Design Module Optimization

## Architecture
The Environment Design Module will be implemented as a specialized page component (`EnvironmentDetail` or enhanced `GenericSectionDetail`). Given the specific layout requirements (4:6 split) and heavy 3D interaction, creating a dedicated `EnvironmentDesignView` component might be cleaner, but we can also adapt `GenericSectionDetail` if it's flexible enough.

However, since `GenericSectionDetail` is currently a standard detail page, we will likely introduce a new layout mode or a specific component for the "Environment" section that overrides the default layout.

### Components
1.  **Layout Container**: Manages the 40/60 split and responsive behavior.
2.  **CardList (Left Panel)**: Displays `EnvironmentCard` items.
    *   Props: `items`, `onSelect`, `selectedId`.
3.  **ModelViewer (Right Panel)**: Wrapper around `@react-three/fiber` Canvas.
    *   Props: `modelUrl`, `targetView` (camera position/lookAt), `highlightedZone`.
    *   Features: `OrbitControls`, `CameraRig` (for smooth transitions), `LOD` wrapper.

## State Management
*   **`selectedCardId`**: Tracks currently active card.
*   **`cameraState`**: Target position and lookAt vector.
*   **`loadingProgress`**: For the loading screen.

## 3D Interaction Strategy
*   **Camera Transitions**: Use `drei`'s `CameraControls` or custom `useFrame` interpolation for smooth 1-second flights.
*   **Highlighting**:
    *   **Blinking**: Shader material or simple opacity pulse on a "HighlightMesh" at the target location.
    *   **LOD**: Use `drei`'s `<Detailed>` component if multiple model resolutions exist.

## Performance
*   **Web Workers**: While requested, React Three Fiber runs on the main thread. We can use workers for geometry processing if we are generating terrain procedurally, but for static GLB loading, the main thread is usually sufficient with `useLoader` and `Suspense`. We will prioritize efficient asset loading first.
*   **Framerate**: `demand` framing could save battery, but `always` is needed for smooth 60FPS during interaction. We'll stick to default behavior but ensure lightweight shaders.

## Error Handling
*   **ErrorBoundary**: Wrap the Canvas in an ErrorBoundary to show a fallback image if WebGL crashes or models fail to load.
