# Proposal: Population and Design Content Update

**Change ID**: `content-update-population-design`
**Status**: `Proposed`
**Type**: `Content`

## Summary
Update the "Population" (Demographics) and "City Design" (Environment) sections to reflect the specific "Yunluji" narrative, including precise population stats, age structure, social values, and city zoning based on Liugong Island geography.

## Requirements

### 1. Population (Demographics)
- **Total Population**: Update to **2048**.
- **Gender Ratio**: 1:1.
- **Age Structure**:
  - Infants: 86 (4.2%)
  - Students: 462 (22.6%)
  - Young Workers: 301 (14.7%)
  - Middle-aged Workers: 698 (34.1%)
  - Retirees: 144 (7.0%)
- **Social Values**:
  - All are "Chosen Ones" (遴选之子).
  - Philosophy: "Symbiotic Homeland" (共生家园) and "Nurturer" (养生者) culture.
  - Goal: "Living Well" (好好生活) is the highest achievement.
- **Key Stats**:
  - Happiness: 9.2/10
  - Employment: 95%
  - Education: 100%

### 2. City Design (Environment)
- **Zoning** (Based on Liugong Island):
  1. **Coral Reef Street (珊瑚礁街)**: City Core, Commercial & Cultural Hub.
  2. **Forest Sanctuary (林语栖所)**: Northern Residential, Chinese Pastoral Style.
  3. **Tidal Living Room (潮汐客厅)**: SE Marine Living, Translucent Floating Architecture.
  4. **Sun Canyon (阳光峡谷)**: SW Industrial, Energy & Agriculture Base.
  5. **Serene Garden (静谧花园)**: Healing Green Belt connecting all zones.
- **Transportation**:
  - Maglev Trains connecting 5 zones.
  - Smart Walkways (Eco-integrated).
  - Undersea Tunnels & Aerial Pipelines.

## Implementation
- Update `src/locales/zh.json` and `src/locales/en.json`.
- Verify `Population.tsx` and `Environment.tsx` render updated data correctly.
- Ensure homepage summary stats match (Population: 2048).
