# Implementation Tasks

- [x] **1. Internationalization (i18n)**
  - [x] Update `src/locales/en.json` with "Environment Design" strings and card data.
  - [x] Update `src/locales/zh.json` with corresponding Chinese translations.
  - [x] Refactor `EnvironmentDesign.tsx` to use `useTranslation` hook and replace hardcoded text.
  - [x] Ensure `MOCK_CARDS` data is retrieved from translation resources.

- [x] **2. Theme Optimization**
  - [x] Verify `ThemeContext` implementation for CSS variable injection.
  - [x] Add global CSS transition rule (`transition: ... 0.3s`) in `index.css`.
  - [x] Ensure `CityModel` in `EnvironmentDesign` reacts to theme changes (prop or context) without unmounting.

- [x] **3. Navigation Logic**
  - [x] Update `EnvironmentDesign.tsx` "Back" button logic.
  - [x] Implement `handleBack` to check `location.state?.from` or default to hash navigation.
  - [x] Verify `Navigation.tsx` handles hash scrolling correctly on page load/return.

- [x] **4. Verification**
  - [x] Test language toggle on Environment page.
  - [x] Test theme toggle during 3D interaction.
  - [x] Test Back button flow from Home -> Environment -> Back.
  - [x] Test Back button flow from Direct Link -> Environment -> Back.
