# Proposal: Enhance Media Upload for All Cards

**Change ID**: `enhance-media-upload-all-cards`
**Status**: `Proposed`
**Type**: `Feature`

## Summary
Enhance the media upload functionality to support a wide range of file types (Photos, Files, 3D Models, Videos) across all card detail editing interfaces (Story, Energy, Environment/Design). This builds upon the recent Tech module update but extends it comprehensively to all editable sections.

## Requirements

### 1. Comprehensive Media Support
- **Supported Types**:
  - **Photos**: JPG, PNG, GIF (Max 10MB)
  - **Files**: PDF, DOC, XLS (Max 50MB)
  - **3D Models**: GLB, GLTF, OBJ (Max 100MB)
  - **Videos**: MP4, MOV, AVI (Max 500MB)
- **Scope**: All card detail pages:
  - `TechDetail` (Already partially done, need to align with new limits/types).
  - `ArchiveDetail` (Story).
  - `GenericSectionDetail` (Energy, Environment/Design, Population).

### 2. Technical Implementation
- **Unified Validation**: A single validation logic for file type and size.
- **UI Components**:
  - Drag-and-drop zone.
  - Progress indicator (mock or real if backend supports).
  - File Previews:
    - Image: Thumbnail.
    - Video: Player.
    - Model: 3D Viewer or Icon with name.
    - File: Icon with name/type.

### 3. UI/UX
- **Consistency**: Same upload widget across all pages.
- **Feedback**: Clear error messages for invalid type/size.
- **Responsiveness**: Mobile-friendly layout.

## Implementation
- **Refactor**: Create a reusable `MediaUpload` component to replace the ad-hoc logic in `TechDetail`.
- **Apply**: Integrate `MediaUpload` into `TechDetail`, `ArchiveDetail`, and `GenericSectionDetail`.
- **State Management**: Ensure media items are stored/retrieved correctly (localStorage for demo).

## Validation
- Test uploading all 4 types in Story detail.
- Test uploading all 4 types in Energy detail.
- Test uploading all 4 types in Environment detail.
- Verify size limits and error messages.
