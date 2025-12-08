# Proposal: Tech Update and Media Upload Support

**Change ID**: `tech-update-and-media-upload`
**Status**: `Proposed`
**Type**: `Feature & Content`

## Summary
1.  **Tech Content Correction**: Move "Quantum Folding Space" (量子折叠空间技术) from "Core Technologies" (Existing) to "Future Development" (Development Stages).
2.  **Enhanced Media Upload**: Extend detail pages (Tech, Story, Energy, etc.) to support Video (MP4) and 3D Model (OBJ/GLTF/FBX) uploads alongside existing image support.

## Requirements

### 1. Tech Content Update
- **Move**: "Quantum Folding Space" should be categorized as a future technology, likely associated with the later development stages (2270-2300) or a specific "Future Tech" section if we re-introduce it.
- **Adjustment**: Since "Core Technologies" implied currently active tech, moving Quantum Folding out requires ensuring it's still visible but framed as "Future/R&D".
- **Core Tech List**: Remove Quantum Folding. Add a replacement or keep remaining 4 (Living, Smart, Transport, Energy).

### 2. Media Upload Support
- **Target**: All editable detail pages (`GenericSectionDetail`, `TechDetail`, `ArchiveDetail`).
- **Video Support**:
  - Allow uploading `.mp4`, `.webm`.
  - Display video player in the content area.
- **3D Model Support**:
  - Allow uploading `.obj`, `.gltf`, `.glb`, `.fbx`.
  - Integrate a 3D viewer (using `react-three-fiber` or similar, if already present, or basic model viewer) to display uploaded models.
- **UI**:
  - Update upload button/dropzone to accept these new MIME types.
  - Render appropriate previews (Video player for videos, 3D canvas for models).

## Implementation
- **Content**: Update `zh.json` and `en.json` to shift Quantum Folding text.
- **Code**:
  - Update `Tech.tsx` to reflect the content categorization change.
  - Update `EditableContent` or the detail page components (`TechDetail.tsx`, etc.) to handle `type="video"` and `type="model"` or generic file uploads.
  - Add 3D viewer component (e.g., `<ModelViewer />`) if not exists. *Note: We might use `<Upload />` component logic as reference.*

## Validation
- Verify Quantum Folding appears in the correct section.
- Test uploading an MP4 video and playing it back.
- Test uploading a GLTF model and rotating it.
