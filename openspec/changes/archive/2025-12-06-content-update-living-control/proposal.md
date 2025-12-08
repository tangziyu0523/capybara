# Proposal: Living and Control Center Content Update

**Change ID**: `content-update-living-control`
**Status**: `Proposed`
**Type**: `Content`

## Summary
Update the "Living & Lifestyle" and "Control Center" (Governance) details, and globally replace "Neo-City" (新未来城) with "City of Project Wuyi" (无衣计划之城).

## Requirements

### 1. Living & Lifestyle
- **Housing Types**:
  - Single: 224 units (150m³)
  - Double: 230 units (220m³)
  - Multi: 378 units (350m³)
- **Featured Scenes**:
  - **Ocean Symbiosis**: "Surge · Hidden Mansion" (Semi-submersible, Underwater view).
  - **Forest Healing**: "Forest Breath · Sanctuary Valley" (Vertical forest, Nature integration).
- **Smart Home Tech**:
  - Smart dimming glass, Holographic comms, mmWave health monitoring, Embedded cryo-capsules.

### 2. Control Center (Governance)
- **Departments**:
  1. **AI Service Unified Management**: Monitor & coordinate all public AI services.
  2. **Identity & Info Admin**: Maintain global identity & asset chain.
  3. **World Admin Coordination**: Handle global crises, macro strategy.
- **Personnel**: ~260 permanent + 1600 citizen rotation.
- **Total Energy**: 657,000 MWh/yr.

### 3. Global Text Replacement
- Replace "新未来城" with "无衣计划之城".
- Replace "Neo-City" with "City of Project Wuyi".

## Implementation
- Update `src/locales/zh.json` and `src/locales/en.json`.
- Search and replace text in codebase if hardcoded strings exist (though most should be in locales).
- Verify `Population.tsx` or `Environment.tsx` if they display housing info.
- Verify `Governance` or `Control` section if exists (might need to be added or mapped to existing structure). *Note: If no specific 'Control Center' section exists, we might add it to 'Environment' or 'Tech' or create a new text block.*
