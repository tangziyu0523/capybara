# Design: Optimization Strategy

## Internationalization (i18n)
We will leverage `react-i18next` which is already installed.
*   **Structure**: Expand `src/locales/zh.json` and `en.json` to include `environment` namespace or keys.
*   **Dynamic Content**: For "Environment Design" cards, the data structure needs to support multiple languages. Instead of hardcoded `MOCK_CARDS`, we should either:
    *   Move mock data to translation files (if static).
    *   Or have the data object contain `{ title: { en: "...", zh: "..." } }` and use a helper to select based on current language.
    *   *Decision*: Since it's currently mock data in the component, we will move the text to the translation files for cleaner separation.

## Theme Engine
*   **Current State**: `ThemeContext` likely sets a class or state.
*   **Optimization**: Ensure `ThemeSwitcher` toggles a class on the `<html>` or `<body>` tag.
*   **Transitions**: Add a global CSS rule `* { transition: background-color 0.3s ease, color 0.3s ease; }` (carefully scoped to avoid layout thrashing) or specific token transitions.
*   **Persistence**: `localStorage` is likely used; ensure it doesn't trigger a full reload.

## Navigation Manager
*   **Problem**: `navigate('/', { state: { target: '#environment' } })` is a hard reset to Home.
*   **Solution**:
    *   Use `useLocation` state to pass "from" information.
    *   If `state.from` exists, navigate back to it.
    *   If deep linking (direct access), default to Home with hash.
    *   **Scroll Restoration**: Implement a `ScrollToTop` or `ScrollRestoration` component that handles hash scrolling effectively.

## Architecture Diagram
```mermaid
graph TD
    A[User] -->|Toggle Lang| B(LanguageContext)
    B -->|Update i18n| C[All Components Re-render]
    
    A -->|Toggle Theme| D(ThemeContext)
    D -->|Update Class| E[DOM Body]
    E -->|CSS Variables| F[Visual Update]
    
    A -->|Click Card| G[EnvironmentDesign]
    G -->|Back Button| H{Has History?}
    H -->|Yes| I[Go Back (-1)]
    H -->|No| J[Go Home with Hash]
```
