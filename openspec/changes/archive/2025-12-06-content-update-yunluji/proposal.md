# Proposal: Content Update - Yunluji

**Change ID**: `content-update-yunluji`
**Status**: `Proposed`
**Type**: `Content`

## Summary
Update the homepage title, subtitle, and the "City Story" / "Chronicle" sections to reflect the new narrative "Yunluji" (Cloud Cottage Era).

## Requirements

### 1. Homepage
- **Title**: Update to "云庐纪" (Yunluji).
- **Subtitle**: Update to "旧世界崩溃后，2048名遴选之子共建的共生家园" (After the collapse of the old world, 2048 chosen ones build a symbiotic homeland).

### 2. City Story (Background)
- Update the background story to:
  "2099年，地球生态崩溃，古教授在秦岭逝世。2100年1月1日，“无衣计划”启动，2048名“遴选之子”离开地球，执行文明存续使命。他们带着“共生家园”理念，在极限中重建人与自然和谐共存的社会。"

### 3. Chronicle (Timeline)
- **2015**: 首个居住模块建成 (First habitation module built)
- **2020**: 核聚变能源系统上线 (Nuclear fusion energy system online)
- **2030**: 磁悬浮交通系统启用 (Maglev transport system enabled)
- **2100**: 无衣计划正式启动 (Project 'Wuyi' officially launched)
- **2200**: 量子折叠技术开始研发 (Quantum folding tech R&D begins)
- **2300**: 空间折叠系统全面成熟 (Spatial folding system fully mature)

## Implementation
- Modify `src/locales/zh.json` to update Chinese content.
- Modify `src/locales/en.json` to update English content (translate accordingly).
- Verify `Story.tsx` renders the new timeline items correctly.
