# Project Structure

This document outlines the structure of the FlowBoard project, explaining the purpose of each directory and key files.

## Root Directory

- `public/` - Contains static files like index.html and assets
- `src/` - Main source code directory
  - `__tests__/` - Test files organized by feature
  - `assets/` - Static assets like images and icons
  - `components/` - Reusable UI components
    - `TaskCard/` - Task card component
    - `Column/` - Board column component
    - `FilterBar/` - Filtering controls
    - `common/` - Shared UI components (buttons, inputs, etc.)
  - `context/` - React context providers
    - `DragContext.tsx` - Drag and drop context
  - `features/` - Feature modules organized by domain
    - `board/` - Board-related logic
      - `boardSlice.ts` - Redux slice for board state
    - `filters/` - Filtering logic
      - `filterSlice.ts` - Redux slice for filter state
  - `store/` - Redux store configuration
    - `store.ts` - Store setup and configuration
  - `theme/` - Styling and theming
    - `theme.ts` - Theme configuration
    - `GlobalStyles.ts` - Global styles
    - `StyledThemeProvider.tsx` - Theme provider component
  - `types/` - TypeScript type definitions
    - `board.ts` - Board-related types
    - `index.ts` - Re-exported types
  - `utils/` - Utility functions and helpers
    - `test-utils.tsx` - Testing utilities
- `.eslintrc.cjs` - ESLint configuration
- `jest.config.js` - Jest test configuration
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration

## Key Files

- `src/main.tsx` - Application entry point
- `src/App.tsx` - Root component
- `src/App.test.tsx` - Main test file
- `src/setupTests.ts` - Test setup and configuration

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript type checking
