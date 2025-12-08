# Implementation Tasks

- [x] **1. Dependencies & Setup**
  - [x] Verify `three`, `@react-three/fiber`, `@react-three/drei` installation (already present).
  - [x] Create `src/components/pages/EnvironmentDesign.tsx` (or refactor `GenericSectionDetail` to support custom layout).

- [x] **2. UI Layout Implementation**
  - [x] Implement the 40/60 Split Pane layout.
  - [x] Create the Left Panel (Card List) container.
  - [x] Create the Right Panel (3D Canvas) container.
  - [x] Ensure responsive behavior (stacking on mobile).

- [x] **3. 3D Viewer Implementation**
  - [x] Set up `<Canvas>` with proper lighting and environment.
  - [x] Add `OrbitControls` for Rotate/Zoom/Pan.
  - [x] Implement `Loader` component for progress indication.
  - [x] Implement "Reset View" button.

- [x] **4. Interaction & Linkage Logic**
  - [x] Define mock data for Cards (ID, Title, Description, CameraPosition, TargetMeshID).
  - [x] Create `CameraRig` component to handle smooth transitions (`useFrame` or `CameraControls`).
  - [x] Implement `handleCardClick` to trigger camera flight.
  - [x] Add "Blink" effect on target mesh selection.

- [x] **5. Verification & Optimization**
  - [x] Verify 60FPS performance.
  - [x] Verify LOD behavior (if applicable models available).
  - [x] Test Error Boundary (simulate load failure).
  - [x] Check Mobile responsiveness.
