# Implementation Tasks

- [ ] **1. Content Correction (Tech)**
  - [ ] Update `zh.json` and `en.json`:
    - [ ] Move "Quantum Folding Space" description to a new "Future/R&D" key or associate it with the final development stage.
    - [ ] Remove it from the "Core" list.
  - [ ] Update `Tech.tsx`:
    - [ ] Adjust `coreTechs` array to remove Quantum.
    - [ ] Ensure Quantum Folding is displayed in the "Development Stages" or a new "Future Tech" block.

- [ ] **2. Media Upload Logic**
  - [ ] Modify `TechDetail.tsx`, `ArchiveDetail.tsx`, `GenericSectionDetail.tsx`:
    - [ ] Update file input `accept` attribute to include `video/*, .obj, .gltf, .glb, .fbx`.
    - [ ] Update `handleImageUpload` (rename to `handleFileUpload`) to detect file type.
    - [ ] Store file type metadata (image/video/model) in state/localStorage.

- [ ] **3. UI Rendering for New Media**
  - [ ] Create/Update `MediaGallery` or similar component in detail pages:
    - [ ] **Images**: Keep existing `<img>` tag.
    - [ ] **Videos**: Render `<video controls>` tag.
    - [ ] **3D Models**: Implement a basic `<Canvas>` viewer using `@react-three/fiber` and `@react-three/drei` (e.g., `useGLTF`, `useFBX`). *Note: Need to ensure dependencies exist.*

- [ ] **4. Verification**
  - [ ] Check Tech section for correct categorization.
  - [ ] Test Video upload & playback.
  - [ ] Test 3D Model upload & rendering.
