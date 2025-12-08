# Implementation Tasks

- [ ] **1. Create Reusable `MediaUpload` Component**
  - [ ] Create `src/components/ui/MediaUpload.tsx`.
  - [ ] Implement drag-and-drop logic.
  - [ ] Implement file validation (Type & Size).
  - [ ] Implement preview logic for Image, Video, Model, File.
  - [ ] Add progress indicator UI.

- [ ] **2. Refactor `TechDetail.tsx`**
  - [ ] Replace existing upload logic with `<MediaUpload />`.
  - [ ] Ensure data persistence works with the new component.

- [ ] **3. Update `ArchiveDetail.tsx` (Story)**
  - [ ] Integrate `<MediaUpload />`.
  - [ ] Add state management for media items.

- [ ] **4. Update `GenericSectionDetail.tsx` (Energy/Environment)**
  - [ ] Integrate `<MediaUpload />`.
  - [ ] Add state management for media items.

- [ ] **5. Validation**
  - [ ] Verify uploads in Story detail.
  - [ ] Verify uploads in Energy detail.
  - [ ] Verify uploads in Environment detail.
  - [ ] Check mobile responsiveness.
