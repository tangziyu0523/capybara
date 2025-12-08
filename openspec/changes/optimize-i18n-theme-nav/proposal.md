# Optimize I18n, Theme, and Navigation

## Summary
Enhance the "Environment Design" module and the overall application with full internationalization (i18n), optimized theme switching (day/night + others), and improved navigation logic. This ensures a consistent, localized, and smooth user experience across all devices.

## Requirements
1.  **Internationalization (i18n)**:
    *   Full translation (EN/ZH) for all pages, including "Environment Design".
    *   Sub-pages and dynamic content (cards) must be localized.
    *   Use `public/locales/${lang}.json` or `src/locales` structure.

2.  **Theme Optimization**:
    *   Fix page reload issues on theme switch.
    *   Implement smooth CSS variable transitions (300ms).
    *   Maintain scroll position during switch.

3.  **Navigation Logic**:
    *   Refactor "Back" button to use history/context.
    *   Return to the exact scroll position and module entry.
    *   Support deep linking and correct hierarchy traversal.

4.  **Technical Constraints**:
    *   React Context for global state.
    *   CSS Variables for theming.
    *   Unit/Integration testing for navigation scenarios.
