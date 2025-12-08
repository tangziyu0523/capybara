# Implementation Tasks

- [ ] **1. Update Chinese Content (`zh.json`)**
  - [ ] Replace all "新未来城" with "无衣计划之城".
  - [ ] Update/Add `living` section details (Housing types, Featured scenes, Smart tech).
  - [ ] Update/Add `control` section details (Departments, Personnel, Energy).

- [ ] **2. Update English Content (`en.json`)**
  - [ ] Replace all "Neo-City" with "City of Project Wuyi".
  - [ ] Translate and update `living` section.
  - [ ] Translate and update `control` section.

- [ ] **3. Codebase Text Replacement**
  - [ ] Global search for "Neo-City" or "新未来城" in `src/**/*.tsx` and replace if hardcoded.

- [ ] **4. UI Updates**
  - [ ] If `living` or `control` sections don't exist, integrate them into `Environment` or `Tech` as sub-sections, or update existing placeholders.
  - [ ] Ensure housing stats are displayed (e.g., in `Population` or `Environment`).

- [ ] **5. Verification**
  - [ ] Check Homepage title/text.
  - [ ] Check new Living/Control details.
